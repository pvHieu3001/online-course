package online.course.market.entity.dto.course;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import online.course.market.entity.dto.category.GetCategoryDto;

import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class GetQuickViewCourseDto {
    private List<GetCourseDto> listCourse;
    private GetCategoryDto category;
}
