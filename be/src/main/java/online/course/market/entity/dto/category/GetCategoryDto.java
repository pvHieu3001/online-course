package online.course.market.entity.dto.category;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GetCategoryDto {
    private Integer id;
    private Integer parentId;
    private String name;
    private String slug;
    private boolean status;
    private String image;
} 