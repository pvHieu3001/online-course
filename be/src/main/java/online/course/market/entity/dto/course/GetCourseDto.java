package online.course.market.entity.dto.course;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

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
    protected Long createdBy;
    protected Long updatedBy;
    protected LocalDateTime createdAt;
    protected LocalDateTime updatedAt;
}
