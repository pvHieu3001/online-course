package jp.ominext.arthralgia.service;

import jp.ominext.arthralgia.config.LoggedUser;
import jp.ominext.arthralgia.constant.ErrorMessage;
import jp.ominext.arthralgia.domain.model.Member;
import jp.ominext.arthralgia.domain.model.Patient;
import jp.ominext.arthralgia.domain.repository.AffectedAreaRepository;
import jp.ominext.arthralgia.domain.repository.BarometricPressureRepository;
import jp.ominext.arthralgia.domain.repository.DoctorInterviewRepository;
import jp.ominext.arthralgia.domain.repository.FootStepRepository;
import jp.ominext.arthralgia.domain.repository.HAQAnswerRepository;
import jp.ominext.arthralgia.domain.repository.MeasurementRepository;
import jp.ominext.arthralgia.domain.repository.MemberRepository;
import jp.ominext.arthralgia.domain.repository.PatientImageRepository;
import jp.ominext.arthralgia.domain.repository.PatientInterviewRepository;
import jp.ominext.arthralgia.domain.repository.PatientRepository;
import jp.ominext.arthralgia.exception.ServiceException;
import jp.ominext.arthralgia.request.PatientMemberRequest;
import jp.ominext.arthralgia.request.UpdateMemberRequest;
import jp.ominext.arthralgia.response.MemberResponse;
import jp.ominext.arthralgia.utils.Dates;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Log4j2
public class MemberService {
    private final AffectedAreaRepository affectedAreaRepository;
    private final DoctorInterviewRepository doctorInterviewRepository;
    private final PatientInterviewRepository patientInterviewRepository;
    private final BarometricPressureRepository barometricPressureRepository;
    private final FootStepRepository footStepRepository;
    private final MeasurementRepository measurementRepository;
    private final HAQAnswerRepository haqAnswerRepository;
    private final PatientImageRepository patientImageRepository;
    private final PatientRepository patientRepository;
    private final MemberRepository memberRepository;

    private static final String PERMISSION_DENIED = "Permission denied!";

    @Autowired
    public MemberService(AffectedAreaRepository affectedAreaRepository,
                         DoctorInterviewRepository doctorInterviewRepository,
                         PatientInterviewRepository patientInterviewRepository,
                         BarometricPressureRepository barometricPressureRepository,
                         FootStepRepository footStepRepository,
                         MeasurementRepository measurementRepository,
                         HAQAnswerRepository haqAnswerRepository,
                         PatientImageRepository patientImageRepository,
                         PatientRepository patientRepository,
                         MemberRepository memberRepository) {
        this.affectedAreaRepository = affectedAreaRepository;
        this.doctorInterviewRepository = doctorInterviewRepository;
        this.patientInterviewRepository = patientInterviewRepository;
        this.barometricPressureRepository = barometricPressureRepository;
        this.footStepRepository = footStepRepository;
        this.measurementRepository = measurementRepository;
        this.haqAnswerRepository = haqAnswerRepository;
        this.patientImageRepository = patientImageRepository;
        this.patientRepository = patientRepository;
        this.memberRepository = memberRepository;
    }

    /**
     * Get all member
     *
     * @return List MemberResponse
     */
    public List<MemberResponse> listMember() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        LoggedUser loggedUser = (LoggedUser) authentication.getPrincipal();

        List<Member> memberList = findAllByPatientUid(loggedUser.getId());

        if (CollectionUtils.isEmpty(memberList)) {
            return Collections.emptyList();
        }

        return memberList.stream()
                .map(MemberResponse::new)
                .collect(Collectors.toList());
    }

    /**
     * Create new member
     *
     * @param request {@link PatientMemberRequest}
     * @return duplicated members
     */
    @Transactional
    public List<MemberResponse> newMember(PatientMemberRequest request) {
        log.info("Method newMember()[{}] Parameters: [{}]",
                Thread.currentThread().getStackTrace()[1].getLineNumber(), request);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        LoggedUser loggedUser = (LoggedUser) authentication.getPrincipal();

        String loggedUserId = loggedUser.getId();
        List<PatientMemberRequest.Member> requestMembers = request.getMembers();

        if (CollectionUtils.isEmpty(requestMembers)) return Collections.emptyList();

        // Filter duplicate member by name
        List<PatientMemberRequest.Member> requestMembersFiltered = requestMembers.stream()
                .filter(jp.ominext.arthralgia.utils.Collections.distinctByKey(PatientMemberRequest.Member::getName))
                .collect(Collectors.toList());

        List<Member> memberList = new ArrayList<>();
        List<MemberResponse> duplicatedMembers = new ArrayList<>();
        Date now = Dates.now();
        requestMembersFiltered.forEach(requestMember -> {
            String memberId = requestMember.getId();
            String memberName = requestMember.getName();

            Member existsMember = memberRepository.findFirstById(memberId);
            Member existsMemberByName = memberRepository.findFirstByParentUidAndName(loggedUserId, memberName);

            if (existsMember != null) {
                // Check exists member with memberId
                if (!existsMember.getParentUid().equals(loggedUserId)) {
                    throw new ServiceException(PERMISSION_DENIED, ErrorMessage.E_PERMISSION_DENIED,
                            HttpStatus.INTERNAL_SERVER_ERROR);
                }

                existsMember.setName(memberName);
                existsMember.setUpdateAt(now);
                memberList.add(existsMember);
            } else {
                String uid = memberId;
                // If member is login User, uid = memberId = loggedUserId
                if (!loggedUserId.equals(memberId) || existsMemberByName != null){
                    Patient newPatient = new Patient();
                    newPatient.setCreateAt(now);
                    newPatient.setCreator(loggedUserId);

                    patientRepository.save(newPatient);
                    uid = newPatient.getId();
                }

                // Generate duplicate member name
                if (existsMemberByName != null) {
                    int countMemberDuplicateName =
                            memberRepository.countAllByParentUidAndNameStartingWith(loggedUserId, memberName);
                    memberName = memberName + " (" +  countMemberDuplicateName + ")";

                    MemberResponse memberResponse = new MemberResponse(requestMember, uid, now);
                    memberResponse.setName(memberName);
                    duplicatedMembers.add(memberResponse);
                }

                Member member = new Member();
                member.setId(memberId);
                member.setName(memberName);
                member.setParentUid(loggedUserId);
                member.setUid(uid);
                member.setCreateAt(now);

                memberList.add(member);
            }
        });

        memberRepository.saveAll(memberList);

        return !duplicatedMembers.isEmpty() ? duplicatedMembers : Collections.emptyList();
    }

    /**
     * Update member
     *
     * @param request {@link PatientMemberRequest}
     * @return Member Id
     */
    @Transactional
    public String updateMember(UpdateMemberRequest request) {
        log.info("Method updateMember()[{}] Parameters: [{}]",
                Thread.currentThread().getStackTrace()[1].getLineNumber(), request);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        LoggedUser loggedUser = (LoggedUser) authentication.getPrincipal();

        String memberName = request.getName();
        String memberId = request.getId();

        if (StringUtils.isBlank(memberId)) {
            throw new ServiceException("Data invalid!", ErrorMessage.VALIDATION_WRONG_FORMAT, HttpStatus.BAD_REQUEST);
        }

        Member existedMember = memberRepository.findFirstById(memberId);
        if (existedMember == null) {
            throw new ServiceException("Member not exists!", ErrorMessage.E_NOT_FOUND, HttpStatus.BAD_REQUEST);
        }

        if (!existedMember.getParentUid().equals(loggedUser.getId())) {
            throw new ServiceException(PERMISSION_DENIED, ErrorMessage.E_PERMISSION_DENIED,
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }

        List<Member> existedNameMember = getMemberByPatientUidAndName(existedMember.getParentUid(), memberName);
        if (!existedNameMember.isEmpty()) {
            throw new ServiceException("Member Exists!", ErrorMessage.E_EXISTS, HttpStatus.BAD_REQUEST);
        }

        existedMember.setName(memberName);
        existedMember.setUpdateAt(Dates.now());
        memberRepository.save(existedMember);
        return existedMember.getId();
    }

    /**
     * Delete member
     *
     * @param id Member' Id
     */
    @Transactional
    public void deleteMember(String id) {
        log.info("Method deleteMember()[{}] Parameters: id=[{}]",
                Thread.currentThread().getStackTrace()[1].getLineNumber(), id);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        LoggedUser loggedUser = (LoggedUser) authentication.getPrincipal();

        Member existedMember = memberRepository.findFirstById(id);
        if (existedMember == null) {
            throw new ServiceException("Member not exists!", ErrorMessage.E_NOT_FOUND, HttpStatus.BAD_REQUEST);
        }

        if (!existedMember.getParentUid().equals(loggedUser.getId())) {
            throw new ServiceException(PERMISSION_DENIED, ErrorMessage.E_PERMISSION_DENIED,
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }

        memberRepository.delete(existedMember);

        // Delete related info
        String uid = existedMember.getUid();
        if (!uid.equals(loggedUser.getId())) {
            affectedAreaRepository.deleteByUid(uid);
            doctorInterviewRepository.deleteByUid(uid);
            patientInterviewRepository.deleteByUid(uid);
            barometricPressureRepository.deleteByUid(uid);
            footStepRepository.deleteByUid(uid);
            measurementRepository.deleteByUid(uid);
            haqAnswerRepository.deleteByUid(uid);
            patientImageRepository.deleteByUid(uid);
            patientRepository.deleteByUid(uid);
        }
    }

    /**
     * Get member's Uid
     *
     * @param memberId member's Id
     * @return Member Uid
     */
    public String getMemberUid(String memberId){
        if (StringUtils.isNotBlank(memberId)) {
            Member member = memberRepository.findFirstById(memberId);

            if (member == null) {
                throw new ServiceException("Member not found!", ErrorMessage.E_NOT_FOUND,
                        HttpStatus.INTERNAL_SERVER_ERROR);
            } else {
                Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
                LoggedUser loggedUser = (LoggedUser) authentication.getPrincipal();

                if (!member.getParentUid().equals(loggedUser.getId())) {
                    throw new ServiceException(PERMISSION_DENIED, ErrorMessage.E_PERMISSION_DENIED,
                            HttpStatus.INTERNAL_SERVER_ERROR);
                }

                String memberUid = member.getUid();
                Patient patient = patientRepository.findFirstById(memberUid);

                if (patient != null) {
                    return patient.getId();
                } else {
                    return null;
                }
            }
        }

        return null;
    }

    /**
     * Find all member by patientUid
     *
     * @param patientUid Patient's Id
     * @return List member
     */
    public List<Member> findAllByPatientUid(String patientUid) {
        return memberRepository.findAllByPatientUid(patientUid);
    }

    /**
     * Get member by uId
     *
     * @param uId User Id
     * @return List member
     */
    public Member findFirstByUid(String uId) {
        return memberRepository.findFirstByUid(uId);
    }

    /**
     * Get member by patient's uid and name
     *
     * @param patientUid Patient's Id
     * @param name member's name
     * @return {@link Member}
     */
    private List<Member> getMemberByPatientUidAndName(String patientUid, String name) {
        return memberRepository.getByPatientUidAndName(patientUid, name);
    }

    /**
     * Get map userId-MemberId by patient's uid
     * @param uid Patient uid
     * @return Map UserId-MemberId
     */
    public Map<String, String> getMapMemberByUId(String uid) {
        Member firstByUid = findFirstByUid(uid);

        if (firstByUid != null) {
            List<Member> memberList = findAllByPatientUid(firstByUid.getParentUid());

            return memberList.stream().collect(Collectors.toMap(Member::getUid, Member::getId));
        } else {
            return Collections.singletonMap(uid, uid);
        }
    }
}
