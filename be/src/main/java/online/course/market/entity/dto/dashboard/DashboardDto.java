package online.course.market.entity.dto.dashboard;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import online.course.market.entity.dto.category.CategoryDto;
import online.course.market.entity.dto.tag.TagDto;
import online.course.market.entity.dto.url.UrlDto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class DashboardDto {
    private Long numberCourse;
    private Long numberPost;
    private Long numberUser;
    private Long numberDownload;
}
