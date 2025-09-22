package online.course.market.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import online.course.market.entity.dto.ApiResponse;
import online.course.market.entity.dto.category.CategoryDto;
import online.course.market.entity.dto.course.CourseDto;
import online.course.market.entity.dto.course.CoursePutRequest;
import online.course.market.entity.dto.course.QuickViewCourseGetResponse;
import online.course.market.entity.dto.url.UrlDto;
import online.course.market.entity.model.Category;
import online.course.market.entity.model.Course;
import online.course.market.entity.model.Tag;
import online.course.market.entity.model.Url;
import online.course.market.exception.CJNotFoundException;
import online.course.market.repository.CategoryRepository;
import online.course.market.repository.CourseRepository;
import online.course.market.repository.TagRepository;
import online.course.market.repository.UrlRepository;
import online.course.market.utils.CustomCodeException;
import online.course.market.utils.DataUtils;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static online.course.market.utils.Constant.LOG_ACTION_UPDATE_COURSE;
import static online.course.market.utils.Constant.LOG_UPDATE_COURSE;

@Service
@AllArgsConstructor
public class CourseServiceImpl implements CourseService {

    private final CourseRepository courseRepository;
    private final CategoryRepository categoryRepository;
    private final TagRepository tagRepository;
    private final UrlRepository urlRepository;
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
    public Course update(CoursePutRequest dto, Integer id) {
        try {
            List<Tag> resolvedTags = new ArrayList<>();
            List<String> tagArray = List.of(dto.getTagStr().split(","));
            tagArray.forEach((tagValue)->{
                if (DataUtils.isNumeric(tagValue)) {
                    tagRepository.findById(Integer.parseInt(tagValue)).ifPresent(resolvedTags::add);
                } else if (tagValue != null) {
                    Tag tag = tagRepository.findByName(tagValue).orElseGet(() -> {
                        Tag newTag = new Tag();
                        newTag.setName(tagValue);
                        return tagRepository.save(newTag);
                    });
                    resolvedTags.add(tag);
                }
            });

            ObjectMapper mapper = new ObjectMapper();
            List<UrlDto> urlDtos = mapper.readValue(dto.getUrlsJson(), new TypeReference<>() {});
            List<Url> newUrls = new ArrayList<>();
            for (UrlDto urlDto : urlDtos) {
                Url url;
                if (urlDto.getId() != null && urlRepository.existsById(urlDto.getId())) {
                    url = urlRepository.findById(urlDto.getId()).orElseThrow();
                    url.setLink(urlDto.getLink());
                    url.setSeqNo(urlDto.getSeqNo());
                } else {
                    url = new Url();
                    url.setLink(urlDto.getLink());
                    url.setSeqNo(urlDto.getSeqNo());
                }
                newUrls.add(url);
            }

            List<Url> savedUrls = urlRepository.saveAll(newUrls);

            Course courseDB = courseRepository.findById(id).orElseThrow(() -> new RuntimeException("Khóa học không tồn tại"));;
            Category oldCat = courseDB.getCategory();
            List<Url> oldUrls = new ArrayList<>(courseDB.getUrls());

            Set<Long> newUrlIds = savedUrls.stream()
                    .map(Url::getId)
                    .filter(Objects::nonNull)
                    .collect(Collectors.toSet());

            List<Url> toRemove = oldUrls.stream()
                    .filter(url -> url.getId() != null && !newUrlIds.contains(url.getId()))
                    .toList();

            for (Url url : toRemove) {
                courseDB.getUrls().remove(url);
                url.getCourses().remove(courseDB);
                if (url.getCourses().isEmpty()) {
                    urlRepository.delete(url);
                }
            }

            Category category = categoryRepository.findById(dto.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Danh mục không tồn tại"));
            courseDB.setName(dto.getName());
            courseDB.setContent(dto.getContent());
            courseDB.setDescription(dto.getDescription());
            courseDB.setCourseBenefits(dto.getCourseBenefits());
            courseDB.setLanguage(dto.getLanguage());
            courseDB.setLevel(dto.getLevel());
            courseDB.setPrice(dto.getPrice());
            courseDB.setSlug(dto.getSlug());
            courseDB.setRating(dto.getRating());
            courseDB.setStatus(dto.getStatus());
            courseDB.setCategory(category);
            courseDB.setImageUrl(dto.getImageUrl() != null && !dto.getImageUrl().isEmpty() ? dto.getImageUrl() : courseDB.getImageUrl());
            courseDB.setIsDisplayHot(dto.getIsDisplayHot());
            courseDB.setTags(new HashSet<>(resolvedTags));
            courseDB.setUrls(savedUrls);
            Course newCourse = courseRepository.save(courseDB);


            categoryRepository.updateNumberCourseByIds(
                    Stream.of(oldCat !=null ? oldCat.getId() : null, dto.getCategoryId())
                            .filter(Objects::nonNull)
                            .collect(Collectors.toSet()));
            return newCourse;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
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
        return courseRepository.findById(id).orElseThrow();
    }

    @Override
    @Transactional(readOnly = true)
    public Course getBySlug(String slug) {
        return courseRepository.findBySlug(slug).orElse(null);
    }

    @Override
    @Transactional(readOnly = true)
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
