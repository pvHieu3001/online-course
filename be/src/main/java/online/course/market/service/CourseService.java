package online.course.market.service;

import online.course.market.entity.dto.course.CoursePutRequest;
import online.course.market.entity.dto.course.QuickViewCourseGetResponse;
import online.course.market.entity.model.Course;
import online.course.market.entity.model.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CourseService {
	List<Course> getRecommendCourse();
	List<Course> getAll();
	Course save(final Course course);
	Course update(CoursePutRequest dto, Integer id);
	void deleteById(final Integer id);
	Page<Course> finadAll(Pageable pageable);
	Course getById(Integer id);
	List<Course> getByCategoryId(Integer categoryId);
    Course getBySlug(String slug);
	Page<Course> filterCourse(String status, String search, Boolean isDisplayHot, Pageable pageable);
	List<QuickViewCourseGetResponse> getQuickViewCourse();
}
