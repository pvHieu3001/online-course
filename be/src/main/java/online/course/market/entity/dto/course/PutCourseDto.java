package online.course.market.entity.dto.course;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class PutCourseDto {
    MultipartFile imageFile;
    MultipartFile sourceFile;
    String imageUrl;
    String sourceUrl;
    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters")
    String name;
    String description;
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
