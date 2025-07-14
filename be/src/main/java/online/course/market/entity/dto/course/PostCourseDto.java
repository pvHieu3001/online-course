package online.course.market.entity.dto.course;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class PostCourseDto {
    @NotBlank(message = "Image URL is required")
    String imageUrl;
    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters")
    String name;
    @NotBlank(message = "Description is required")
    String description;
    @NotBlank(message = "Source URL is required")
    String sourceUrl;
    @NotBlank(message = "Slug is required")
    String slug;
    @NotNull(message = "Price is required")
    Integer price;
    @NotBlank(message = "Level is required")
    String level;
    @NotBlank(message = "Language is required")
    String language;
    @NotBlank(message = "Status is required")
    String status;
    @NotNull(message = "Category ID is required")
    Integer categoryId;
    @NotNull(message = "Rating is required")
    Double rating;
    @NotNull(message = "Total students is required")
    Integer totalStudents;
    @NotNull(message = "Total rating is required")
    Integer totalRating;
}
