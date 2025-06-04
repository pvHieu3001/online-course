package jp.ominext.arthralgia.service;

import jp.ominext.arthralgia.domain.repository.BarometricPressureRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

@Service
@Log4j2
public class FullSymptomsService {
    private BarometricPressureRepository barometricPressureRepository;

    public FullSymptomsService(BarometricPressureRepository barometricPressureRepository) {
        this.barometricPressureRepository = barometricPressureRepository;
    }

    /**
     * Insert full symptoms by date
     * @param date Format YYYY-MM-DD
     * @return Number of insert recorded
     */
    public int insertFullSymptomsByDate(String date) {
        return barometricPressureRepository.insertFullSymptomsByDate(date);
    }
}
