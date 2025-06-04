package jp.ominext.arthralgia.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "sendgrid.api")
@Data
public class SendGridConfig {
    /**
     * API key
     */
    private String key;

    /**
     * From address
     */
    private String from;
}
