package online.course.market.entity.dto.blog;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BlogGetBySlugResponse {
    private BlogDto blog;
    private List<BlogDto> relatedBlogs;
    private List<BlogDto> blogRecommendList;
} 