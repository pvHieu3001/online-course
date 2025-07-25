package online.course.market.entity.dto.course;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class GetAllCourseDto {
	private List<GetCourseDto> getCourseDto;
	private Integer size;

}
