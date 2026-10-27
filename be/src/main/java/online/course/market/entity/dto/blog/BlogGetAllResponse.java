package online.course.market.entity.dto.blog;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BlogGetAllResponse {
    private List<BlogDto> trendingBlogs;
    private List<BlogDto> newBlogs;

    private List<BlogDto> trendingTechnologyBlogs;
    private List<BlogDto> newsTechnologyBlogs;

    private List<BlogDto> trendingLifeStyleBlogs;
    private List<BlogDto> newLifeStyleBlogs;

    private List<BlogDto> trendingTravelBlogs;
    private List<BlogDto> newTravelBlogs;

    private List<BlogDto> trendingWorldBlogs;
    private List<BlogDto> newWorldBlogs;

    private List<BlogDto> trendingEducationBlogs;
    private List<BlogDto> newEducationBlogs;

    private List<BlogDto> trendingScienceBlogs;
    private List<BlogDto> newScienceBlogs;
}
