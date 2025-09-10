package online.course.market.service;

import jakarta.servlet.http.HttpServletRequest;
import online.course.market.entity.model.Log;
import java.util.List;

public interface LogService {
    Log getById(Integer id);
    List<Log> getAll();
    void save(String env, HttpServletRequest request, String name, String action, String method);
    Log update(Log log, Integer id);
    void deleteById(Integer id);
    List<Log> getByCourseId(Integer courseId);
} 