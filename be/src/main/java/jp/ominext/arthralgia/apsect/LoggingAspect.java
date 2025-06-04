package jp.ominext.arthralgia.apsect;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jp.ominext.arthralgia.config.JwtTokenUtil;
import jp.ominext.arthralgia.controller.LoginController;
import lombok.extern.log4j.Log4j2;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.StringUtils;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;

@Aspect
@Configuration
@Log4j2
public class LoggingAspect {
    private final JwtTokenUtil jwtTokenUtil;

    public LoggingAspect(JwtTokenUtil jwtTokenUtil) {
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @Around("execution(* jp.ominext.arthralgia.controller.*.*(..))")
    public Object profileAllMethods(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        MethodSignature methodSignature = (MethodSignature) proceedingJoinPoint.getSignature();

        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes())
                .getRequest();

        String className = methodSignature.getDeclaringType().getSimpleName();
        Object[] signatureArgs = proceedingJoinPoint.getArgs();

        String userId = getUserIdFromToken(request);

        if (log.isInfoEnabled() && !className.equals(LoginController.class.getSimpleName())) {
            log.info("Request of userId=[{}] url=[{}] with params={}",
                    userId, request.getRequestURL().toString(), formatParamsToString(signatureArgs));
        }

        return proceedingJoinPoint.proceed(signatureArgs);
    }

    private String getUserIdFromToken(HttpServletRequest request) {
        String userId = "";
        String jwtToken = jwtTokenUtil.getJwtFromRequest(request);
        if (StringUtils.hasText(jwtToken)) {
            userId = jwtTokenUtil.getUserIdFromToken(jwtToken, "id");
        }
        return userId;
    }

    private String formatParamsToString(Object[] params) {
        String result = "";
        try {
            result = new ObjectMapper().writeValueAsString(params);
        } catch (JsonProcessingException e) {
            log.error("Parser data error=[{}]", e.getMessage());
        }
        return result;
    }
}
