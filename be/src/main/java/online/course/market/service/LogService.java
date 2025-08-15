package online.course.market.service;

import jakarta.servlet.http.HttpServletRequest;
import online.course.market.entity.model.Log;
import java.util.List;

public interface LogService {
    Log getById(Integer id);
    List<Log> getAll();
    void save(String env, HttpServletRequest request, Integer userId, Integer courseId, String name, String action);
    Log update(Log log, Integer id);
    void deleteById(Integer id);
    List<Log> getByCourseId(Integer courseId);
} 