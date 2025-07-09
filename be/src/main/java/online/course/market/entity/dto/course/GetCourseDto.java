package online.course.market.entity.dto.course;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class GetCourseDto {
		Long id;		
		String firstname;		
		String username;		
		String password;		
		String lastname;	
		String email;
		Date createAt;

}
