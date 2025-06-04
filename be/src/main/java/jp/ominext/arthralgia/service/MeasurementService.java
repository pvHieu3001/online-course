package jp.ominext.arthralgia.service;

import jp.ominext.arthralgia.config.LoggedUser;
import jp.ominext.arthralgia.domain.model.Measurement;
import jp.ominext.arthralgia.domain.model.Member;
import jp.ominext.arthralgia.domain.repository.MeasurementRepository;
import jp.ominext.arthralgia.request.MeasurementsRequest;
import jp.ominext.arthralgia.response.MeasurementsResponse;
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
public class MeasurementService {
    private final MeasurementRepository measurementRepository;
    private final MemberService memberService;

    public MeasurementService(MeasurementRepository measurementRepository,
                              MemberService memberService) {
        this.measurementRepository = measurementRepository;
        this.memberService = memberService;
    }

    @Transactional
    public MeasurementsResponse createMeasurement(MeasurementsRequest request){
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
        Date parseDate = Dates.parseExact(date, Dates.ISO_ZONED_DATETIME_FORMAT);
        Date parseCreatedDate = Dates.parseExact(created, Dates.ISO_ZONED_DATETIME_FORMAT);

        Measurement measurement = measurementRepository.findByDateBetweenAndUId(
                startDate, endDate, uid);

        if (measurement != null){
            if (parseCreatedDate == null || measurement.getCreated() == null || measurement.getCreated().before(parseCreatedDate)) {
                measurement.setEsr(request.getEsr());
                measurement.setCrp(request.getCrp());
                measurement.setMmp3(request.getMmp3());
                measurement.setDate(new Timestamp(parseDate.getTime()));
                measurement.setCreated(parseCreatedDate);
                measurement.setUpdated(Dates.now());
                log.info("*** Update exist measurement date [{}]", request.getDate());
            } else {
                Map<String, String> uIdMemberMap = memberService.getMapMemberByUId(uid);
                return new MeasurementsResponse(measurement, uIdMemberMap);
            }
        } else {
            measurement = new Measurement(request, uid);
            measurement.setCreated(parseCreatedDate);
            log.info("*** Create new measurement date [{}]", request.getDate());
        }

        measurementRepository.save(measurement);
        log.info("*** Save interview success!");

        return null;
    }

    /**
     * List measurement
     *
     * @param uid Patient Id
     * @param page Page number
     * @param size Record number per page
     * @return List<MeasurementsResponse>
     */
    @Transactional
    public List<MeasurementsResponse> listMeasurement(String uid, int page, int size) {
        Map<String, String> uIdMemberMap = memberService.getMapMemberByUId(uid);
        ArrayList<String> uIds = new ArrayList<>(uIdMemberMap.keySet());
        uIds.add(uid);

        List<Measurement> measurementList =
                measurementRepository.findAllByUIdInWithPaging(uIds, size, page * size);

        if (CollectionUtils.isEmpty(measurementList)){
            return Collections.emptyList();
        }

        return measurementList.stream()
                .map(measurement -> new MeasurementsResponse(measurement, uIdMemberMap))
                .collect(Collectors.toList());
    }
}
