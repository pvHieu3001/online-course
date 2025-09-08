package online.course.market.service;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import online.course.market.entity.dto.category.CategoryDto;
import online.course.market.entity.dto.course.CourseDto;
import online.course.market.entity.dto.course.QuickViewCourseGetResponse;
import online.course.market.entity.model.Category;
import online.course.market.entity.model.Course;
import online.course.market.repository.CategoryRepository;
import org.modelmapper.ModelMapper;
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
    private final ModelMapper modelMapper;

    private CourseDto toDto(Course course) {
        return modelMapper.map(course, CourseDto.class);
    }

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


        categoryRepository.updateNumberCourseByIds(
                Stream.of(course.getCategory() !=null ? course.getCategory().getId() : null, catId)
                .filter(Objects::nonNull)
                .collect(Collectors.toSet()));

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
    public Page<Course> filterCourse(String status, String search, Boolean isDisplayHot, Pageable pageable) {
        return courseRepository.filterCourse(status, search, isDisplayHot, pageable);
    }

    @Override
    public List<QuickViewCourseGetResponse> getQuickViewCourse() {
        List<QuickViewCourseGetResponse> quickViewCourseDtoList = new ArrayList<>();
        List<Category> categoryList =  categoryRepository.findByIsQuickViewTrueAndStatusTrue();
        categoryList.forEach((item)->{
            QuickViewCourseGetResponse quickViewCourseDto = new QuickViewCourseGetResponse();
            quickViewCourseDto.setCategory(modelMapper.map(item, CategoryDto.class));
            List<Course> courseList =  courseRepository.findByCategoryIdOrderByIdDesc(item.getId());
            quickViewCourseDto.setListCourse(courseList.stream().map(this::toDto).toList());
            quickViewCourseDtoList.add(quickViewCourseDto);
        });
        return quickViewCourseDtoList;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Course> getByCategoryId(Integer categoryId) {
        Assert.notNull(categoryId, "categoryId cannot be null");
        return courseRepository.findByCategoryIdOrderByIdDesc(categoryId);
    }
}
