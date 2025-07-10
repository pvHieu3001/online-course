package online.course.market.config;

import online.course.market.security.entity.SecurityUser;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;

import online.course.market.utils.Constant;

import java.util.Optional;

@Configuration
@EnableJpaAuditing
public class WebConfig {
	@Bean
	MessageSource messageSource() {
		ReloadableResourceBundleMessageSource messageSource = new ReloadableResourceBundleMessageSource();

		messageSource.setBasename("classpath:messages/messages_es");
		messageSource.setDefaultEncoding(Constant.UTF_8);
		return messageSource;
	}

	@Bean
	LocalValidatorFactoryBean getValidator() {
		LocalValidatorFactoryBean bean = new LocalValidatorFactoryBean();
		bean.setValidationMessageSource(messageSource());
		return bean;
	}
	@Bean
	public Optional<Long> auditorProvider() {
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		Long userId = 0L;
		if (principal instanceof SecurityUser) {
			userId = ((SecurityUser)principal).getId();
		}
		return userId.describeConstable();
	}
}
