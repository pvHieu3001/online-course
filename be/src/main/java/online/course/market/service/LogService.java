package online.course.market.service;

import online.course.market.entity.model.Log;
import java.util.List;

public interface LogService {
    Log getById(Integer id);
    List<Log> getAll();
    Log save(Log log);
    Log update(Log log, Integer id);
    void deleteById(Integer id);
    List<Log> getByCourseId(Integer courseId);
} 