package online.course.market.schedule;

import online.course.market.utils.Dates;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.lang3.time.DateUtils;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
@Log4j2
public class FullSymptomsSchedule {
    @Scheduled(cron = "${cron.symptoms.expression}")
    public void insertFullSymptomsDaily(){
        String date = Dates.format(DateUtils.addDays(Dates.now(), -1), Dates.ISO_ZONED_DATE_FORMAT);
        log.info("Start schedule insert full symptoms {} ...", date);

        // Check exist log
        if (true){
            log.info("Insert data for {} patient(s)");
        } else {
            log.info("History log is empty!");
        }

    }
}
