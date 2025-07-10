package online.course.market.entity.dto.course;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class PutCourseDto {
		String imageUrl;
	String name;
	String description;
	String sourceUrl;
	String slug;
	Integer price;
	String level;
	String language;
	String status;
	Integer categoryId;
	Double rating;
	Integer totalStudents;
	Integer totalRating;	
}
