package online.course.market.framework.property;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class UploadProperties {
    
    @Value("${application.upload.url:/app/uploads}")
    private String uploadUrl;

    @Value("${application.env:dev}")
    private String env;
    
    @Bean
    public String uploadUrl() {
        return uploadUrl;
    }

    @Bean
    public String env() {
        return env;
    }
} 