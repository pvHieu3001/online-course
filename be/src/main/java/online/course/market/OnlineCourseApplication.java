package online.course.market;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
@EnableConfigurationProperties
@EnableScheduling

public class OnlineCourseApplication extends SpringBootServletInitializer {
    public static void main(String[] args) {
        SpringApplication.run(OnlineCourseApplication.class, args);
    }

}
