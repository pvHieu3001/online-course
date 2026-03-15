package online.course.market;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class OnlineCourseApplication {

	public static void main(String[] args) {
		SpringApplication.run(OnlineCourseApplication.class, args);
	}

}
