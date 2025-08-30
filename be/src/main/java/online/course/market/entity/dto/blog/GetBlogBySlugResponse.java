package online.course.market.entity.dto.blog;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GetBlogBySlugResponse {
    private GetBlogDto blog;
    private List<GetBlogDto> relatedBlogs;
} 