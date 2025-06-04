package jp.ominext.arthralgia.service;

import jp.ominext.arthralgia.config.LoggedUser;
import jp.ominext.arthralgia.domain.model.Footstep;
import jp.ominext.arthralgia.domain.model.BarometricPressure;
import jp.ominext.arthralgia.domain.model.Member;
import jp.ominext.arthralgia.domain.repository.FootStepRepository;
import jp.ominext.arthralgia.domain.repository.BarometricPressureRepository;
import jp.ominext.arthralgia.request.HealthInfoRequest;
import jp.ominext.arthralgia.response.BarometricPressureResponse;
import jp.ominext.arthralgia.response.FootStepResponse;
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
public class HealthInfoService {
    private final BarometricPressureRepository barometricPressureRepository;
    private final FootStepRepository footStepRepository;
    private final MemberService memberService;

    private static final int MAX_BAROMETRIC = 10;

    public HealthInfoService(BarometricPressureRepository barometricPressureRepository,
                             FootStepRepository footStepRepository,
                             MemberService memberService) {
        this.barometricPressureRepository = barometricPressureRepository;
        this.footStepRepository = footStepRepository;
        this.memberService = memberService;
    }

    @Transactional
    public FootStepResponse saveHealthInfo(HealthInfoRequest request){
        log.info("***Save health info");
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        LoggedUser loggedUser = (LoggedUser) authentication.getPrincipal();
        String date = request.getDate();
        String created = request.getCreated();
        Integer requestFootstep = request.getFootstep();

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

        // Save barometric pressure
        saveBarometricPressureInfo(request, uid, parseDate);

        // Save footstep info
        Footstep footstep = footStepRepository.findFirstByDateBetweenAndUId(startDate, endDate, uid);

        if (requestFootstep != null) {
            if (footstep != null
                    && (parseCreatedDate == null || footstep.getCreated() == null || footstep.getCreated().before(parseCreatedDate))) {
                footstep.setStep(requestFootstep);
                footstep.setDate(new Timestamp(parseDate.getTime()));
                footstep.setCreated(parseCreatedDate);
                footstep.setUpdated(Dates.now());
            } else {
                footstep = new Footstep();
                footstep.setStep(requestFootstep);
                footstep.setDate(parseDate);
                footstep.setUid(uid);
                footstep.setCreated(parseCreatedDate);
            }

            footStepRepository.save(footstep);
            log.info("***Save health info success!");

            Map<String, String> uIdMemberMap = memberService.getMapMemberByUId(uid);
            return new FootStepResponse(footstep, uIdMemberMap);
        } else {
            return null;
        }
    }

    /**
     * Save barometric pressure
     * @param request {@link HealthInfoRequest}
     * @param uid Login UserId
     * @param parseDate Log date
     */
    private void saveBarometricPressureInfo(HealthInfoRequest request, String uid, Date parseDate) {
        List<BarometricPressure> topBarometric = getTopBarometricByDateAndUid(request.getDate(), uid, MAX_BAROMETRIC);

        BarometricPressure barometricPressure = new BarometricPressure();
        barometricPressure.setUid(uid);
        barometricPressure.setDate(parseDate);
        barometricPressure.setBarometric(request.getBarometricPressure());

        barometricPressureRepository.save(barometricPressure);
        log.info("Created new barometric pressure id={}", barometricPressure.getId());

        // Check list barometric in day, if size = 10, => remove oldest item
        if (topBarometric.size() == MAX_BAROMETRIC) {
            barometricPressureRepository.delete(topBarometric.get(0));
        }
    }

    /**
     * List Barometric Pressure
     *
     * @param uid Patient Id
     * @param page Page number
     * @param size Record number per page
     * @return List<BarometricPressureResponse>
     */
    public List<BarometricPressureResponse> listBarometricPressure(String uid, int page, int size) {
        Map<String, String> uIdMemberMap = memberService.getMapMemberByUId(uid);
        ArrayList<String> uIds = new ArrayList<>(uIdMemberMap.keySet());
        uIds.add(uid);

        List<BarometricPressure> barometricPressureList =
                barometricPressureRepository.findAllByUIdInWithPaging(uIds, size, page * size);

        if (CollectionUtils.isEmpty(barometricPressureList)){
            return Collections.emptyList();
        }

        return barometricPressureList.stream()
                .map(barometricPressure -> new BarometricPressureResponse(barometricPressure, uIdMemberMap))
                .collect(Collectors.toList());
    }

    /**
     * List Foot Step
     *
     * * @param uid Patient Id
     *
     * @param page Page number
     * @param size Record number per page
     * @return List<FootStepResponse>
     */
    public List<FootStepResponse> listFootSteps(String uid, int page, int size) {
        List<Member> memberList = memberService.findAllByPatientUid(uid);

        Map<String, String> uIdMemberMap = memberList.stream().collect(Collectors.toMap(Member::getUid, Member::getId));
        ArrayList<String> uIds = new ArrayList<>(uIdMemberMap.keySet());
        uIds.add(uid);

        List<Footstep> footstepList = footStepRepository.findAllByUIdInWithPaging(uIds, size, page * size);

        if (CollectionUtils.isEmpty(footstepList)){
            return Collections.emptyList();
        }

        return footstepList.stream()
                .map(footstep -> new FootStepResponse(footstep, uIdMemberMap))
                .collect(Collectors.toList());
    }

    /**
     * Count barometric history log
     * @param date String date, format YYYY-MM-DD
     * @return Number history log
     */
    public int countLogBarometricByDate(String date){
        return barometricPressureRepository.countByDate(date);
    }

    /**
     * Get top barometric by uid and date
     * @param date Log date
     * @param uid Login Uid
     * @param size Size
     * @return List Barometric
     */
    public List<BarometricPressure> getTopBarometricByDateAndUid(String date, String uid, int size){
        return barometricPressureRepository.getTopByDateAndUid(date, uid, size);
    }
}
