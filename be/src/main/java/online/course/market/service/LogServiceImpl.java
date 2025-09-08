package online.course.market.service;

import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import online.course.market.entity.dto.log.LogDto;
import online.course.market.entity.model.Log;
import online.course.market.repository.LogRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static online.course.market.utils.Constant.DEVICE_ATTRIBUTE;

@Service
@AllArgsConstructor
public class LogServiceImpl implements LogService {
    private final LogRepository logRepository;
    private final ModelMapper modelMapper;

    @Override
    public Log getById(Integer id) {
        return logRepository.findById(id).orElse(null);
    }

    @Override
    public List<Log> getAll() {
        return logRepository.findAll();
    }

    @Override
    public void save(String env, HttpServletRequest request, String name, String action) {
        if(!env.equals("dev")){
            String device = (String) request.getAttribute(DEVICE_ATTRIBUTE);
            String ipAddress = request.getHeader("X-Forwarded-For");
            if (ipAddress == null || ipAddress.isEmpty()) {
                ipAddress = request.getRemoteAddr();
            }
            String userAgent = request.getHeader("User-Agent");
            String referrer = request.getHeader("referrer");
            StringBuffer pageId = request.getRequestURL();
            String queryString = request.getQueryString();
            String url = queryString == null ? pageId.toString() : pageId.append('?').append(queryString).toString();

            LogDto dto = new LogDto(pageId.toString(), name, action, ipAddress, userAgent, referrer, device, url);
            Log log = modelMapper.map(dto, Log.class);
            logRepository.save(log);
        }
    }

    @Override
    public Log update(Log log, Integer id) {
        Optional<Log> optionalLog = logRepository.findById(id);
        if (optionalLog.isPresent()) {
            Log existing = optionalLog.get();
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
        return new ArrayList<>();
    }
} 