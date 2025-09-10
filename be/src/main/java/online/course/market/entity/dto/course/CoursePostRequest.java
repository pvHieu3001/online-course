package online.course.market.entity.dto.course;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class CoursePostRequest {
    private MultipartFile imageFile;
    private MultipartFile sourceFile;
    private String imageUrl;
    private String sourceUrl;
    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters")
    private String name;
    private String content;
    private String description;
    private String courseBenefits;
    private String slug;
    private Integer price;
    private String level;
    private String language;
    private String status;
    private Boolean isDisplayHot;
    private Integer categoryId;
    private Double rating;
    private Integer totalStudents;
    private Integer totalRating;
    private String tagStr;
}
