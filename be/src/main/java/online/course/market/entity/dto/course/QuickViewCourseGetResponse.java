package online.course.market.entity.dto.course;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import online.course.market.entity.dto.category.CategoryDto;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class QuickViewCourseGetResponse {
    private List<CourseDto> listCourse;
    private CategoryDto category;
}
