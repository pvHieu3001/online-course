package online.course.market.service;

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
    public Course getByName(String name) {
        Assert.notNull(name, "name cannot be null");
        return courseRepository.findByName(name).orElseThrow(
                () -> new CJNotFoundException(CustomCodeException.CODE_400, "course not found with name "+name));
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
    public Course update(Course course, Long id, Integer catId) {

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
        return courseRepository.save(courseDb);
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
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
    public Course getById(Long id) {
        return courseRepository.findById(id).orElse(null);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Course> getByCategoryId(Integer categoryId) {
        Assert.notNull(categoryId, "categoryId cannot be null");
        return courseRepository.findByCategoryIdOrderByIdDesc(categoryId);
    }
}
