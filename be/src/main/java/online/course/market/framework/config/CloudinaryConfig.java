package online.course.market.framework.config;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class CloudinaryConfig {
    @Bean
    public Cloudinary cloudinary() {
        Map<String, String> config = new HashMap<>();
        config.put("cloud_name", "bread-restaurant");
        config.put("api_key", "281773554515314");
        config.put("api_secret", "Y9hlU4WU_ImyZWkMYcD2NTyo0AA");
        return new Cloudinary(config);
    }
}
