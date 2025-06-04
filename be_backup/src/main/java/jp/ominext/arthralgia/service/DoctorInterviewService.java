package jp.ominext.arthralgia.service;

import jp.ominext.arthralgia.config.LoggedUser;
import jp.ominext.arthralgia.domain.model.DoctorInterview;
import jp.ominext.arthralgia.domain.repository.DoctorInterviewRepository;
import jp.ominext.arthralgia.request.DoctorInterviewRequest;
import jp.ominext.arthralgia.response.DoctorInterviewResponse;
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
public class DoctorInterviewService {
    private final DoctorInterviewRepository doctorInterviewRepository;
    private final MemberService memberService;

    public DoctorInterviewService(DoctorInterviewRepository doctorInterviewRepository,
                                  MemberService memberService) {
        this.doctorInterviewRepository = doctorInterviewRepository;
        this.memberService = memberService;
    }

    @Transactional
    public DoctorInterviewResponse newInterview(DoctorInterviewRequest request){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        LoggedUser loggedUser = (LoggedUser) authentication.getPrincipal();
        String date = request.getDate();
        String created = request.getCreated();

        String uid = loggedUser.getId();
        String memberUid = memberService.getMemberUid(request.getMemberId());
        if (memberUid != null) {
            uid = memberUid;
        }

        String startDateStr = Dates.getStartOfDayDateString(date);
        String endDateStr = Dates.getEndOfDayDateString(date);

        if (startDateStr == null || endDateStr == null) {
            log.info("***Date time values invalid!");
            return null;
        }

        Date startDate = Dates.parseExact(startDateStr, Dates.ISO_ZONED_DATETIME_FORMAT);
        Date endDate = Dates.parseExact(endDateStr, Dates.ISO_ZONED_DATETIME_FORMAT);
        Date parseDate = Dates.parseExact(date, Dates.ISO_ZONED_DATETIME_FORMAT);
        Date parseCreatedDate = Dates.parseExact(created, Dates.ISO_ZONED_DATETIME_FORMAT);

        DoctorInterview checkInterview = doctorInterviewRepository.findByDateBetweenAndUId(
                startDate, endDate, uid);

        if (checkInterview != null){
            if (parseCreatedDate == null || checkInterview.getCreated() == null || checkInterview.getCreated().before(parseCreatedDate)) {
                checkInterview.setGVas(request.getGVas());
                checkInterview.setDate(new Timestamp(parseDate.getTime()));
                checkInterview.setCreated(parseCreatedDate);
                checkInterview.setUpdated(Dates.now());
                log.info("*** Update exist interview date [{}]", request.getDate());
            } else {
                Map<String, String> uIdMemberMap = memberService.getMapMemberByUId(uid);
                return new DoctorInterviewResponse(checkInterview, uIdMemberMap);
            }
        } else {
            checkInterview = new DoctorInterview();
            checkInterview.setGVas(request.getGVas());
            checkInterview.setDate(parseDate);
            checkInterview.setUid(uid);
            checkInterview.setCreated(parseCreatedDate);
            log.info("*** Create new interview date [{}]", request.getDate());
        }

        doctorInterviewRepository.save(checkInterview);
        log.info("*** Save interview success!");

        return null;
    }

    /**
     * List doctor interview
     *
     * @param uid Patient Id
     * @param page Page number
     * @param size Record number per page
     * @return List DoctorInterviewResponse
     */
    @Transactional
    public List<DoctorInterviewResponse> listDoctorInterview(String uid, int page, int size) {
        Map<String, String> uIdMemberMap = memberService.getMapMemberByUId(uid);
        ArrayList<String> uIds = new ArrayList<>(uIdMemberMap.keySet());
        uIds.add(uid);

        List<DoctorInterview> doctorInterviewList =
                doctorInterviewRepository.findAllByUIdInWithPaging(uIds, size, page * size);

        if (CollectionUtils.isEmpty(doctorInterviewList)){
            return Collections.emptyList();
        }

        return doctorInterviewList.stream()
                .map(doctorInterview -> new DoctorInterviewResponse(doctorInterview, uIdMemberMap))
                .collect(Collectors.toList());
    }
}
