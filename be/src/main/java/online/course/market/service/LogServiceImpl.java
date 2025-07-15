package online.course.market.service;

import lombok.AllArgsConstructor;
import online.course.market.entity.model.Log;
import online.course.market.repository.LogRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class LogServiceImpl implements LogService {
    private final LogRepository logRepository;

    @Override
    public Log getById(Integer id) {
        return logRepository.findById(id).orElse(null);
    }

    @Override
    public List<Log> getAll() {
        return logRepository.findAll();
    }

    @Override
    public Log save(Log log) {
        return logRepository.save(log);
    }

    @Override
    public Log update(Log log, Integer id) {
        Optional<Log> optionalLog = logRepository.findById(id);
        if (optionalLog.isPresent()) {
            Log existing = optionalLog.get();
            existing.setUserId(log.getUserId());
            existing.setName(log.getName());
            existing.setAction(log.getAction());
            existing.setIpAddress(log.getIpAddress());
            existing.setUserAgent(log.getUserAgent());
            // Nếu có trường courseId thì set luôn
            try {
                java.lang.reflect.Method setCourseId = existing.getClass().getMethod("setCourseId", Integer.class);
                setCourseId.invoke(existing, log.getClass().getMethod("getCourseId").invoke(log));
            } catch (Exception ignore) {}
            return logRepository.save(existing);
        }
        return null;
    }

    @Override
    public void deleteById(Integer id) {
        logRepository.deleteById(id);
    }

    @Override
    public List<Log> getByCourseId(Integer courseId) {
        return logRepository.findByCourseId(courseId);
    }
} 