package online.course.market.service;

import online.course.market.entity.model.Course;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CourseService {
	Course getByName(final String name);
	List<Course> getAll();
	Course save(final Course course);
	Course update(final Course course, final Long id, final Integer catId);
	void deleteById(final Long id);
	Page<Course> finadAll(Pageable pageable);
	Course getById(Long id);
	List<Course> getByCategoryId(Integer categoryId);
}
