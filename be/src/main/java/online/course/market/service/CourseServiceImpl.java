package online.course.market.service;

import java.util.List;

import online.course.market.entity.model.Course;
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
        return courseRepository.findAll();
    }

    @Override
    @Transactional
    public Course save(Course course) {
        Assert.notNull(course, "course cannot be null");
        return courseRepository.save(course);
    }

    @Override
    @Transactional
    public Course update(Course course, Long id) {

        Assert.notNull(id, "id cannot be null");
        Assert.notNull(course, "course cannot be null");

        Course courseDb = courseRepository.findById(id)
                .orElseThrow(() -> new CJNotFoundException(CustomCodeException.CODE_400, "course not found"));

        courseDb.setName(course.getName());
        courseDb.setDescription(course.getDescription());
        courseDb.setLanguage(course.getLanguage());
        courseDb.setLevel(course.getLevel());
        courseDb.setPrice(course.getPrice());
        courseDb.setSlug(course.getSlug());
        courseDb.setRating(course.getRating());
        courseDb.setStatus(course.getStatus());
        courseDb.setCategoryId(course.getCategoryId());
        courseDb.setSourceUrl(course.getSourceUrl());
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

}
