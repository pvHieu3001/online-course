package online.course.market.entity.dto.course;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import online.course.market.entity.dto.category.CategoryDto;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class CourseDto {
    private Integer id;
    private String imageUrl;
    private String name;
    private String content;
    private String description;
    private String courseBenefits;
    private String sourceUrl;
    private String slug;
    private Integer price;
    private String level;
    private String language;
    private String status;
    private Boolean isDisplayHot;
    private Double rating;
    private Integer totalStudents;
    private Integer totalRating;
    protected LocalDateTime createdAt;
    protected LocalDateTime updatedAt;

    protected CategoryDto category;
    protected String userCreate;
    protected String userUpdate;
}
