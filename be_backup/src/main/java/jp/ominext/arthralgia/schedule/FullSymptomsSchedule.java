package jp.ominext.arthralgia.schedule;

import jp.ominext.arthralgia.service.FullSymptomsService;
import jp.ominext.arthralgia.service.HealthInfoService;
import jp.ominext.arthralgia.utils.Dates;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.lang3.time.DateUtils;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
@Log4j2
public class FullSymptomsSchedule {
    private FullSymptomsService fullSymptomsService;
    private HealthInfoService healthInfoService;

    public FullSymptomsSchedule(FullSymptomsService fullSymptomsService,
                                HealthInfoService healthInfoService) {
        this.fullSymptomsService = fullSymptomsService;
        this.healthInfoService = healthInfoService;
    }

    @Scheduled(cron = "${cron.symptoms.expression}")
    public void insertFullSymptomsDaily(){
        String date = Dates.format(DateUtils.addDays(Dates.now(), -1), Dates.ISO_ZONED_DATE_FORMAT);
        log.info("Start schedule insert full symptoms {} ...", date);

        // Check exist log
        if (healthInfoService.countLogBarometricByDate(date) > 0){
            int saveCount = fullSymptomsService.insertFullSymptomsByDate(date);
            log.info("Insert data for {} patient(s)", saveCount);
        } else {
            log.info("History log is empty!");
        }

    }
}
