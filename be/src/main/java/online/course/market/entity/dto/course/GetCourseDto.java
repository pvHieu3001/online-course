package online.course.market.entity.dto.course;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class GetCourseDto {
		private Integer id;
    private String imageUrl;
    private String name;
    private String description;
    private String sourceUrl;
    private String slug;
    private Integer price;
    private String level;
    private String language;
    private String status;
    private Integer categoryId;
    private Double rating;
    private Integer totalStudents;
    private Integer totalRating;

}
