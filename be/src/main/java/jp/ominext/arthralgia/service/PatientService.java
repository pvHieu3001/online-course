package jp.ominext.arthralgia.service;

import jp.ominext.arthralgia.config.JwtTokenUtil;
import jp.ominext.arthralgia.config.LoggedUser;
import jp.ominext.arthralgia.constant.ErrorMessage;
import jp.ominext.arthralgia.domain.model.Patient;
import jp.ominext.arthralgia.domain.model.VerificationToken;
import jp.ominext.arthralgia.domain.repository.PatientRepository;
import jp.ominext.arthralgia.exception.ServiceException;
import jp.ominext.arthralgia.listener.event.BaseEvent;
import jp.ominext.arthralgia.listener.event.NewPasswordEvent;
import jp.ominext.arthralgia.request.LoginUserRequest;
import jp.ominext.arthralgia.request.NewPasswordRequest;
import jp.ominext.arthralgia.request.RegistrationUserRequest;
import jp.ominext.arthralgia.utils.Dates;
import jp.ominext.arthralgia.utils.EmailUtils;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import java.util.UUID;

@Service
@Log4j2
public class PatientService {
    private final PatientRepository patientRepository;

    private final VerificationTokenService verificationTokenService;

    private final AuthenticationManager authenticationManager;

    private final PasswordEncoder passwordEncoder;

    private final ApplicationEventPublisher eventPublisher;

    private final JwtTokenUtil jwtTokenUtil;


    @Value("${base.ip}")
    private String baseIp;

    @Value("${base.url}")
    private String baseUrl;

    private final String BLACK_DOMAIN_ERROR = "下記のドメインのメールアドレスは使用できません。\n"
                                                + "@mac.com、@me.com、@icloud.com";

    @Autowired
    public PatientService(ApplicationEventPublisher eventPublisher,
                          PasswordEncoder passwordEncoder,
                          PatientRepository patientRepository,
                          VerificationTokenService verificationTokenService,
                          JwtTokenUtil jwtTokenUtil,
                          AuthenticationManager authenticationManager) {
        this.passwordEncoder = passwordEncoder;
        this.patientRepository = patientRepository;
        this.verificationTokenService = verificationTokenService;
        this.eventPublisher = eventPublisher;
        this.jwtTokenUtil = jwtTokenUtil;
        this.authenticationManager = authenticationManager;
    }

    /**
     * Registration new patient
     * @param userRequest {@link RegistrationUserRequest}
     * @return new patient's Id
     */
    @Transactional
    public synchronized String registerUserAccount(RegistrationUserRequest userRequest,
                                                   HttpServletRequest httpRequest) {
        String email = userRequest.getEmail();

        if (EmailUtils.checkExistBlackDomain(email)) {
            log.info("***Black list domain contain [{}]", email);
            throw new ServiceException(BLACK_DOMAIN_ERROR, ErrorMessage.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        Patient patient = patientRepository.findFirstByEmail(email);

        if (patient != null) {
            log.info("***Email exist [{}]", email);
            throw new ServiceException("Email exist!", ErrorMessage.E_EXISTS, HttpStatus.INTERNAL_SERVER_ERROR);
        } else {
            Patient newPatient = new Patient();
            newPatient.setEmail(email);
            newPatient.setPassword(passwordEncoder.encode(userRequest.getPassword()));
            newPatient.setCreateAt(Dates.now());

            patientRepository.save(newPatient);
            String newPatientId = newPatient.getId();

            String token = UUID.randomUUID().toString();
            VerificationToken verificationToken = verificationTokenService.createVerificationToken(token, newPatientId);

            try {
                String appUrl = ServletUriComponentsBuilder.fromCurrentContextPath().toUriString();
                appUrl = replaceURL(appUrl);
                String subject = "【きょうのカンセツ】アカウントアクティベート";

                eventPublisher.publishEvent(new BaseEvent(verificationToken.getToken(), newPatient.getEmail(), subject,
                        httpRequest.getLocale(), appUrl));
            } catch (Exception e){
                log.error("Send mail error {}", e.getLocalizedMessage());
            }

            log.info("New patient registered {}!", newPatientId);
            return newPatientId;
        }
    }

    private String replaceURL(String appUrl) {
        return appUrl.replace(baseIp, baseUrl).replace("http", "https");
    }

    @Transactional
    public void registerConfirm(String token) {
        VerificationToken verificationToken = verificationTokenService.findFirstByToken(token);

        if (verificationToken == null) {
            throw new ServiceException("Token not exist!", ErrorMessage.E_EXISTS, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if (verificationToken.getExpiredDate().before(Dates.now())) {
            throw new ServiceException("Token expired!",
                    ErrorMessage.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        String uid = verificationToken.getUid();

        Patient patient = patientRepository.findFirstById(uid);

        if (patient!= null) {
            patient.setEnabled(true);
            patientRepository.save(patient);

            verificationTokenService.delete(verificationToken);
            log.info("Active {} success!", patient.getEmail());
        } else {
            throw new ServiceException("Patient not exist!", ErrorMessage.E_EXISTS, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Transactional
    public String authWithJWT(LoginUserRequest request){
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(),
                    request.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);

            LoggedUser loggedUser = (LoggedUser) authentication.getPrincipal();
            log.info("User {} authenticate success!", loggedUser.getUsername());

            // Update last login time (exclude first time = null)
            if (loggedUser.getLastLogin() != null) {
                updateLastLogin(loggedUser.getId());
            }

            return jwtTokenUtil.generateToken(loggedUser);
        } catch (Exception e) {
            log.error(e.getLocalizedMessage());
            throw new ServiceException("Authenticated failed!" + e.getLocalizedMessage(), ErrorMessage.E_UNAUTHORIZED,
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Transactional
    public void updateLastLogin(String id){
        patientRepository.updateLastLoginById(id);
    }

    @Transactional
    public void extendActiveTime(String token, HttpServletRequest request) {
        VerificationToken verificationToken = verificationTokenService.findFirstByToken(token);
        if (verificationToken == null) {
            throw new ServiceException("Token invalid!", ErrorMessage.E_NOT_FOUND, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        Patient patient = patientRepository.findFirstById(verificationToken.getUid());

        if (patient == null) {
            throw new ServiceException("Patient invalid!", ErrorMessage.E_NOT_FOUND, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        verificationTokenService.extendActiveTime(verificationToken);

        String appUrl = request.getContextPath();
        String subject = "Registration Confirmation";
        eventPublisher.publishEvent(new BaseEvent(verificationToken.getToken(), patient.getEmail(), subject,
                request.getLocale(), appUrl));
    }

    /**
     * Resend active email
     * @param email User's email
     * @param request {@link HttpServletRequest}
     */
    @Transactional
    public void resendActiveEmail(String email, HttpServletRequest request) {
        if (EmailUtils.checkExistBlackDomain(email)) {
            log.info("***Black list domain contain [{}]", email);
            throw new ServiceException(BLACK_DOMAIN_ERROR, ErrorMessage.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        Patient patient = patientRepository.findFirstByEmail(email);

        if (patient == null) {
            throw new ServiceException("Patient invalid!", ErrorMessage.E_NOT_FOUND, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        VerificationToken existToken = verificationTokenService.findFirstByToken(patient.getId());

        String token = UUID.randomUUID().toString();

        if (existToken == null) {
            verificationTokenService.createVerificationToken(token, patient.getId());
        } else {
            token = existToken.getToken();
            verificationTokenService.extendActiveTime(existToken);
        }

        String appUrl = ServletUriComponentsBuilder.fromCurrentContextPath().toUriString();
        appUrl = replaceURL(appUrl);

        String subject = "Active Confirmation";
        eventPublisher.publishEvent(new BaseEvent(token, patient.getEmail(), subject,
                request.getLocale(), appUrl));
    }

    /**
     * Generate new password for patient
     *
     * @param newPasswordRequest {@link NewPasswordRequest}
     * @param httpRequest {@link HttpServletRequest}
     */
    @Transactional
    public void newPassword(NewPasswordRequest newPasswordRequest, HttpServletRequest httpRequest) {
        String email = newPasswordRequest.getEmail();

        if (EmailUtils.checkExistBlackDomain(email)) {
            log.info("***Black list domain contain [{}]", email);
            throw new ServiceException(BLACK_DOMAIN_ERROR, ErrorMessage.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        Patient patient = patientRepository.findFirstByEmail(email);

        if (patient == null) {
            throw new ServiceException("Email not exist!", ErrorMessage.E_NOT_FOUND, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        patient.setTemporaryPassword(passwordEncoder.encode(newPasswordRequest.getPassword()));

        patientRepository.save(patient);
        String patientId = patient.getId();

        String token = UUID.randomUUID().toString();

        VerificationToken existToken = verificationTokenService.findFirstByUid(patientId);

        if (existToken == null) {
            verificationTokenService.createVerificationToken(token, patientId);
        } else {
            verificationTokenService.extendActiveTime(existToken);
            token = existToken.getToken();
        }

        try {
            String appUrl = ServletUriComponentsBuilder.fromCurrentContextPath().toUriString();
            appUrl = replaceURL(appUrl);
            String subject = "【きょうのカンセツ】パスワード再設定";

            eventPublisher.publishEvent(new NewPasswordEvent(token, patient.getEmail(), subject,
                    httpRequest.getLocale(), appUrl));
        } catch (Exception e){
            log.error("Send mail error {}", e.getLocalizedMessage());
        }

        log.info("Generate new password for {} success!", patient.getEmail());
    }

    /**
     * Confirm new password
     * @param token Token
     */
    @Transactional
    public void newPasswordConfirm(String token) {
        VerificationToken verificationToken = verificationTokenService.findFirstByToken(token);

        if (verificationToken == null) {
            throw new ServiceException("Token not exist!", ErrorMessage.E_EXISTS, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if (verificationToken.getExpiredDate().before(Dates.now())) {
            throw new ServiceException("Token expired!",
                    ErrorMessage.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        String uid = verificationToken.getUid();

        Patient patient = patientRepository.findFirstById(uid);

        if (patient!= null) {
            patient.setPassword(patient.getTemporaryPassword());
            patientRepository.save(patient);

            verificationTokenService.delete(verificationToken);
            log.info("Change password{} success!", patient.getEmail());
        } else {
            throw new ServiceException("Patient not exist!", ErrorMessage.E_EXISTS, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
