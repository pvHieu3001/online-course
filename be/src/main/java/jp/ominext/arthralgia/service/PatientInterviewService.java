package jp.ominext.arthralgia.service;

import jp.ominext.arthralgia.config.LoggedUser;
import jp.ominext.arthralgia.domain.model.PatientInterview;
import jp.ominext.arthralgia.domain.repository.PatientInterviewRepository;
import jp.ominext.arthralgia.request.PatientInterviewRequest;
import jp.ominext.arthralgia.response.PatientInterviewResponse;
import jp.ominext.arthralgia.utils.Dates;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Log4j2
public class PatientInterviewService {
    private final PatientInterviewRepository patientInterviewRepository;
    private final MemberService memberService;

    public PatientInterviewService(PatientInterviewRepository patientInterviewRepository,
                                   MemberService memberService) {
        this.patientInterviewRepository = patientInterviewRepository;
        this.memberService = memberService;
    }

    @Transactional
    public PatientInterviewResponse newInterview(PatientInterviewRequest request){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        LoggedUser loggedUser = (LoggedUser) authentication.getPrincipal();

        String uid = loggedUser.getId();
        String memberUid = memberService.getMemberUid(request.getMemberId());
        if (memberUid != null) {
            uid = memberUid;
        }

        String date = request.getDate();
        String created = request.getCreated();
        String startDateStr = Dates.getStartOfDayDateString(date);
        String endDateStr = Dates.getEndOfDayDateString(date);

        if (startDateStr == null || endDateStr == null) {
            log.info("***Date time values invalid!");
            return null;
        }

        Date startDate = Dates.parseExact(startDateStr, Dates.ISO_ZONED_DATETIME_FORMAT);
        Date endDate = Dates.parseExact(endDateStr, Dates.ISO_ZONED_DATETIME_FORMAT);
        Date parseCreatedDate = Dates.parseExact(created, Dates.ISO_ZONED_DATETIME_FORMAT);

        PatientInterview checkInterview = patientInterviewRepository.findByDateBetweenAndUId(
                startDate, endDate, uid);

        if (checkInterview != null) {
            Date parseDate = Dates.parseExact(date, Dates.ISO_ZONED_DATETIME_FORMAT);

            if (parseCreatedDate == null || checkInterview.getCreated() == null || checkInterview.getCreated().before(parseCreatedDate)) {
                checkInterview.setGVas(request.getGVas());
                checkInterview.setPVas(request.getPVas());
                checkInterview.setStiffenedTimeSpan(request.getStiffenedTimeSpan());
                checkInterview.setDate(new Timestamp(parseDate.getTime()));
                checkInterview.setCreated(parseCreatedDate);
                checkInterview.setUpdated(Dates.now());
                log.info("*** Update exist interview date [{}]", date);
            } else {
                log.info("*** Return last interview [{}]", checkInterview);
                Map<String, String> mapMemberByUId = memberService.getMapMemberByUId(uid);
                return new PatientInterviewResponse(checkInterview, mapMemberByUId);
            }
        } else {
            checkInterview = new PatientInterview(request, uid);
            checkInterview.setCreated(parseCreatedDate);
            log.info("*** Create new interview date [{}]", date);
        }

        patientInterviewRepository.save(checkInterview);
        log.info("*** Save interview success!");

        return null;
    }

    /**
     * List patient interview
     *
     * @param uid  Patient Id
     * @param page Page number
     * @param size Record number per page
     * @return List PatientInterviewResponse
     */
    @Transactional
    public List<PatientInterviewResponse> listPatientInterview(String uid, int page, int size) {
        Map<String, String> uIdMemberMap = memberService.getMapMemberByUId(uid);
        ArrayList<String> uIds = new ArrayList<>(uIdMemberMap.keySet());
        uIds.add(uid);

        List<PatientInterview> patientInterviewList =
                patientInterviewRepository.findAllByUIdInWithPaging(uIds, size, page * size);

        if (CollectionUtils.isEmpty(patientInterviewList)) {
            return Collections.emptyList();
        }

        return patientInterviewList.stream()
                .map(patientInterview -> new PatientInterviewResponse(patientInterview, uIdMemberMap))
                .collect(Collectors.toList());
    }
}
