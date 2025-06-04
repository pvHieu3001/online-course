package jp.ominext.arthralgia.service;

import jp.ominext.arthralgia.config.LoggedUser;
import jp.ominext.arthralgia.constant.AffectedType;
import jp.ominext.arthralgia.constant.Area;
import jp.ominext.arthralgia.constant.Recorder;
import jp.ominext.arthralgia.domain.model.AffectedArea;
import jp.ominext.arthralgia.domain.repository.AffectedAreaRepository;
import jp.ominext.arthralgia.request.AffectedAreaRequest;
import jp.ominext.arthralgia.request.PatientAffectedAreasRequest;
import jp.ominext.arthralgia.response.AffectedAreaItem;
import jp.ominext.arthralgia.utils.Dates;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.lang3.math.NumberUtils;
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
public class AffectedAreaService {
    private final AffectedAreaRepository affectedAreaRepository;
    private final MemberService memberService;

    public AffectedAreaService(AffectedAreaRepository affectedAreaRepository,
                               MemberService memberService) {
        this.affectedAreaRepository = affectedAreaRepository;
        this.memberService = memberService;
    }

    @Transactional
    public List<AffectedAreaItem> newAffectedArea(PatientAffectedAreasRequest request){
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
            return Collections.emptyList();
        }

        Recorder recorder = Recorder.of(request.getRecorder());

        List<AffectedAreaRequest> areaRequestList = request.getAffectedAreaRequests();

        String finalUid = uid;
        Date parseDate = Dates.parseExact(date, Dates.ISO_ZONED_DATETIME_FORMAT);
        Date parseCreatedDate = Dates.parseExact(created, Dates.ISO_ZONED_DATETIME_FORMAT);

        AffectedArea lastAffectedOnDay = null;
        List<AffectedArea> top1AffectedOnDay = affectedAreaRepository.findByDateAndUIdAndRecorder(parseDate, finalUid, recorder.name(), NumberUtils.INTEGER_ONE);
        if (!top1AffectedOnDay.isEmpty()) {
            lastAffectedOnDay = top1AffectedOnDay.get(NumberUtils.INTEGER_ZERO);
        }

        if (lastAffectedOnDay == null) {
            saveListAffectedArea(recorder, areaRequestList, finalUid, parseDate, parseCreatedDate);
            log.info("*** Save new data");
        } else if (parseCreatedDate == null || lastAffectedOnDay.getCreated() == null || lastAffectedOnDay.getCreated().before(parseCreatedDate)) {

            if (areaRequestList.size() % Area.values().length == NumberUtils.INTEGER_ZERO) {
                // Clean current data before insert new
                affectedAreaRepository.deleteByUidAndDateAndRecorder(finalUid, parseDate, recorder.name());

                saveListAffectedArea(recorder, areaRequestList, finalUid, parseDate, parseCreatedDate);
                log.info("*** Remove exists and create new data");
            } else {
                // Save AffectArea sequentially
                saveAffectAreaSequentially(date, startDateStr, endDateStr, recorder, areaRequestList, finalUid);
                log.info("*** Save sequentially affected area success!");
            }

        } else {
            List<AffectedArea> lastAffectedsOnDay = affectedAreaRepository.findByDateAndUIdAndRecorder(parseDate, finalUid, recorder.name(), Area.values().length);

            if (!lastAffectedsOnDay.isEmpty()) {
                log.info("*** Return last affected on day data");
                Map<String, String> mapMemberByUId = memberService.getMapMemberByUId(uid);
                return lastAffectedsOnDay.stream()
                        .map(affectedArea -> new AffectedAreaItem(affectedArea, mapMemberByUId))
                        .collect(Collectors.toList());
            }
        }

        return Collections.emptyList();
    }

    private void saveAffectAreaSequentially(String date, String startDateStr, String endDateStr, Recorder recorder,
                                            List<AffectedAreaRequest> areaRequestList, String finalUid) {
        Date startDate = Dates.parseExact(startDateStr, Dates.ISO_ZONED_DATETIME_FORMAT);
        Date endDate = Dates.parseExact(endDateStr, Dates.ISO_ZONED_DATETIME_FORMAT);

        List<AffectedArea> affectedAreaList = new ArrayList<>();

        areaRequestList.forEach(affectedAreaRequest -> {
            AffectedArea checkExistLoggingArea = affectedAreaRepository.checkExistLoggingArea(
                    startDate, endDate, finalUid, Area.of(affectedAreaRequest.getArea()).getValue(), recorder.name());

            if (checkExistLoggingArea != null ){
                // Update current affected area
                checkExistLoggingArea.setType(AffectedType.of(affectedAreaRequest.getAffectedType()).name());
                checkExistLoggingArea.setDate(Dates.parseExact(date, Dates.ISO_ZONED_DATETIME_FORMAT));
                affectedAreaList.add(checkExistLoggingArea);
            } else {
                // New affected area
                AffectedArea affectedArea =
                        new AffectedArea(
                                affectedAreaRequest,
                                finalUid,
                                Dates.parseExact(date, Dates.ISO_ZONED_DATETIME_FORMAT),
                                recorder
                        );
                affectedAreaList.add(affectedArea);
            }
        });

        affectedAreaRepository.saveAll(affectedAreaList);
    }

    private void saveListAffectedArea(Recorder recorder, List<AffectedAreaRequest> areaRequestList,
                                      String finalUid, Date parseDate, Date parseCreatedDate) {
        areaRequestList.forEach(affectedAreaRequest -> {
            AffectedArea affectedArea =
                    new AffectedArea(
                            affectedAreaRequest,
                            finalUid,
                            parseDate,
                            recorder
                    );
            affectedArea.setCreated(parseCreatedDate);
            affectedAreaRepository.save(affectedArea);
        });
    }

    /**
     * List affected areas
     *
     * @param uid Patient Id
     * @param page Page number
     * @param size Record number per page
     * @return List<AffectedAreaItem>
     */
    @Transactional
    public List<AffectedAreaItem> listAffectedArea(String uid, int page, int size) {
        Map<String, String> uIdMemberMap = memberService.getMapMemberByUId(uid);
        ArrayList<String> uIds = new ArrayList<>(uIdMemberMap.keySet());
        uIds.add(uid);

        List<AffectedArea> affectedAreaList =
                affectedAreaRepository.findAllByUIdInWithPaging(uIds, size, page * size);

        if (CollectionUtils.isEmpty(affectedAreaList)){
            return Collections.emptyList();
        }

        return affectedAreaList.stream()
                .map(affectedArea -> new AffectedAreaItem(affectedArea, uIdMemberMap))
                .collect(Collectors.toList());
    }
}
