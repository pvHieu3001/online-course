package online.course.market.service;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;

import online.course.market.entity.model.Category;
import online.course.market.entity.model.Course;
import online.course.market.repository.CategoryRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

import online.course.market.exception.CJNotFoundException;
import online.course.market.repository.CourseRepository;
import online.course.market.utils.CustomCodeException;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class CourseServiceImpl implements CourseService {

    private final CourseRepository courseRepository;
    private final CategoryRepository categoryRepository;

    @Override
    @Transactional(readOnly = true)
    public List<Course> getRecommendCourse() {
        return courseRepository.getRecommendCourse();

    }

    @Override
    @Transactional(readOnly = true)
    public List<Course> getAll() {
        return courseRepository.findAllByOrderByIdDesc();
    }

    @Override
    @Transactional
    public Course save(Course course) {
        Assert.notNull(course, "course cannot be null");
        return courseRepository.save(course);
    }

    @Override
    @Transactional
    public Course update(Course course, Integer id, Integer catId) {

        Assert.notNull(id, "id cannot be null");
        Assert.notNull(course, "course cannot be null");

        Course courseDb = courseRepository.findById(id)
                .orElseThrow(() -> new CJNotFoundException(CustomCodeException.CODE_400, "course not found"));

        Category category = categoryRepository.findById(catId)
                .orElseThrow(() -> new RuntimeException("Danh mục không tồn tại"));
        courseDb.setName(course.getName());
        courseDb.setContent(course.getContent());
        courseDb.setDescription(course.getDescription());
        courseDb.setCourseBenefits(course.getCourseBenefits());
        courseDb.setLanguage(course.getLanguage());
        courseDb.setLevel(course.getLevel());
        courseDb.setPrice(course.getPrice());
        courseDb.setSlug(course.getSlug());
        courseDb.setRating(course.getRating());
        courseDb.setStatus(course.getStatus());
        courseDb.setCategory(category);
        courseDb.setSourceUrl(course.getSourceUrl());
        courseDb.setImageUrl(course.getImageUrl() != null && course.getImageUrl() != "" ? course.getImageUrl() : courseDb.getImageUrl());
        courseDb.setIsDisplayHot(course.getIsDisplayHot());
        Course newCourse = courseRepository.save(courseDb);

        if(course.getCategory().getId() != catId){
            categoryRepository.updateNumberCourseByIds(Arrays.asList(course.getCategory().getId(), catId));
        }

        return newCourse;
    }

    @Override
    @Transactional
    public void deleteById(Integer id) {
        Assert.notNull(id, "id cannot be null");
        Course courseDb = courseRepository.findById(id)
                .orElseThrow(() -> new CJNotFoundException(CustomCodeException.CODE_400, "course not found"));
        courseRepository.delete(courseDb);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Course> finadAll(Pageable pageable) {
        return courseRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Course getById(Integer id) {
        return courseRepository.findById(id).orElse(null);
    }

    @Override
    @Transactional(readOnly = true)
    public Course getBySlug(String slug) {
        return courseRepository.findBySlug(slug).orElse(null);
    }

    @Override
    public List<Course> filterCourse(String status, String search, Boolean isDisplayHot) {
        return courseRepository.filterCourse(status, search, isDisplayHot);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Course> getByCategoryId(Integer categoryId) {
        Assert.notNull(categoryId, "categoryId cannot be null");
        return courseRepository.findByCategoryIdOrderByIdDesc(categoryId);
    }
}
