package online.course.market.service;

import lombok.extern.log4j.Log4j2;
import online.course.market.config.JwtTokenUtil;
import online.course.market.config.LoggedUser;
import online.course.market.constant.ErrorMessage;
import online.course.market.domain.model.User;
import online.course.market.domain.model.VerificationToken;
import online.course.market.domain.repository.UserRepository;
import online.course.market.exception.ServiceException;
import online.course.market.listener.event.BaseEvent;
import online.course.market.listener.event.NewPasswordEvent;
import online.course.market.request.LoginUserRequest;
import online.course.market.request.NewPasswordRequest;
import online.course.market.request.RegistrationUserRequest;
import online.course.market.utils.Dates;
import online.course.market.utils.EmailUtils;
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

import jakarta.servlet.http.HttpServletRequest;
import java.util.UUID;

@Service
@Log4j2
public class UserService {
    private final UserRepository userRepository;

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
    public UserService(ApplicationEventPublisher eventPublisher,
                       PasswordEncoder passwordEncoder,
                       UserRepository userRepository,
                       VerificationTokenService verificationTokenService,
                       JwtTokenUtil jwtTokenUtil,
                       AuthenticationManager authenticationManager) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.verificationTokenService = verificationTokenService;
        this.eventPublisher = eventPublisher;
        this.jwtTokenUtil = jwtTokenUtil;
        this.authenticationManager = authenticationManager;
    }

    /**
     * Registration new User
     * @param userRequest {@link RegistrationUserRequest}
     * @return new User's Id
     */
    @Transactional
    public synchronized String registerUserAccount(RegistrationUserRequest userRequest,
                                                   HttpServletRequest httpRequest) {
        String email = userRequest.getEmail();

        if (EmailUtils.checkExistBlackDomain(email)) {
            log.info("***Black list domain contain [{}]", email);
            throw new ServiceException(BLACK_DOMAIN_ERROR, ErrorMessage.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        User User = userRepository.findFirstByEmail(email);

        if (User != null) {
            log.info("***Email exist [{}]", email);
            throw new ServiceException("Email exist!", ErrorMessage.E_EXISTS, HttpStatus.INTERNAL_SERVER_ERROR);
        } else {
            User newUser = new User();
            newUser.setEmail(email);
            newUser.setPassword(passwordEncoder.encode(userRequest.getPassword()));
            newUser.setCreatedAt(Dates.now());

            userRepository.save(newUser);
            String newUserId = newUser.getId();

            String token = UUID.randomUUID().toString();
            VerificationToken verificationToken = verificationTokenService.createVerificationToken(token, newUserId);

            try {
                String appUrl = ServletUriComponentsBuilder.fromCurrentContextPath().toUriString();
                appUrl = replaceURL(appUrl);
                String subject = "【きょうのカンセツ】アカウントアクティベート";

                eventPublisher.publishEvent(new BaseEvent(verificationToken.getToken(), newUser.getEmail(), subject,
                        httpRequest.getLocale(), appUrl));
            } catch (Exception e){
                log.error("Send mail error {}", e.getLocalizedMessage());
            }

            log.info("New User registered {}!", newUserId);
            return newUserId;
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

        User User = userRepository.findFirstById(uid);

        if (User!= null) {
            User.setEnabled(true);
            userRepository.save(User);

            verificationTokenService.delete(verificationToken);
            log.info("Active {} success!", User.getEmail());
        } else {
            throw new ServiceException("User not exist!", ErrorMessage.E_EXISTS, HttpStatus.INTERNAL_SERVER_ERROR);
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
        userRepository.updateLastLoginById(id);
    }

    @Transactional
    public void extendActiveTime(String token, HttpServletRequest request) {
        VerificationToken verificationToken = verificationTokenService.findFirstByToken(token);
        if (verificationToken == null) {
            throw new ServiceException("Token invalid!", ErrorMessage.E_NOT_FOUND, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        User User = userRepository.findFirstById(verificationToken.getUid());

        if (User == null) {
            throw new ServiceException("User invalid!", ErrorMessage.E_NOT_FOUND, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        verificationTokenService.extendActiveTime(verificationToken);

        String appUrl = request.getContextPath();
        String subject = "Registration Confirmation";
        eventPublisher.publishEvent(new BaseEvent(verificationToken.getToken(), User.getEmail(), subject,
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

        User User = userRepository.findFirstByEmail(email);

        if (User == null) {
            throw new ServiceException("User invalid!", ErrorMessage.E_NOT_FOUND, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        VerificationToken existToken = verificationTokenService.findFirstByToken(User.getId());

        String token = UUID.randomUUID().toString();

        if (existToken == null) {
            verificationTokenService.createVerificationToken(token, User.getId());
        } else {
            token = existToken.getToken();
            verificationTokenService.extendActiveTime(existToken);
        }

        String appUrl = ServletUriComponentsBuilder.fromCurrentContextPath().toUriString();
        appUrl = replaceURL(appUrl);

        String subject = "Active Confirmation";
        eventPublisher.publishEvent(new BaseEvent(token, User.getEmail(), subject,
                request.getLocale(), appUrl));
    }

    /**
     * Generate new password for User
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

        User User = userRepository.findFirstByEmail(email);

        if (User == null) {
            throw new ServiceException("Email not exist!", ErrorMessage.E_NOT_FOUND, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        User.setTemporaryPassword(passwordEncoder.encode(newPasswordRequest.getPassword()));

        userRepository.save(User);
        String UserId = User.getId();

        String token = UUID.randomUUID().toString();

        VerificationToken existToken = verificationTokenService.findFirstByUid(UserId);

        if (existToken == null) {
            verificationTokenService.createVerificationToken(token, UserId);
        } else {
            verificationTokenService.extendActiveTime(existToken);
            token = existToken.getToken();
        }

        try {
            String appUrl = ServletUriComponentsBuilder.fromCurrentContextPath().toUriString();
            appUrl = replaceURL(appUrl);
            String subject = "【きょうのカンセツ】パスワード再設定";

            eventPublisher.publishEvent(new NewPasswordEvent(token, User.getEmail(), subject,
                    httpRequest.getLocale(), appUrl));
        } catch (Exception e){
            log.error("Send mail error {}", e.getLocalizedMessage());
        }

        log.info("Generate new password for {} success!", User.getEmail());
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

        User User = userRepository.findFirstById(uid);

        if (User!= null) {
            User.setPassword(User.getTemporaryPassword());
            userRepository.save(User);

            verificationTokenService.delete(verificationToken);
            log.info("Change password{} success!", User.getEmail());
        } else {
            throw new ServiceException("User not exist!", ErrorMessage.E_EXISTS, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
