package online.course.market.config;

import online.course.market.security.entity.SecurityUser;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

public class SpringSecurityAuditorAware implements AuditorAware<Long> {
    @Override
    public Optional<Long> getCurrentAuditor() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long userId = 0L;
        if (principal instanceof SecurityUser) {
            userId = ((SecurityUser)principal).getId();
        }
        return userId.describeConstable();
    }
}
