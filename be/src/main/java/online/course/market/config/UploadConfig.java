package online.course.market.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class UploadConfig {
    
    @Value("${application.upload.url:/app/uploads}")
    private String uploadUrl;
    
    @Bean
    public String uploadUrl() {
        return uploadUrl;
    }
} 