package online.course.market.entity.dto.category;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PutCategoryDto {
    private Integer parentId;
    @NotBlank(message = "Name is required")
    private String name;
    private String slug;
    private boolean status;
    private String image;
} 