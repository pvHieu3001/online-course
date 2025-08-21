package online.course.market.entity.dto.blog;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GetBlogDto {
    private Integer id;
    private String title;
    private String content;
    private String slug;
    private Boolean status;
    private String type;
} 