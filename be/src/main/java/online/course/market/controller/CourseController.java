package online.course.market.controller;

import java.io.IOException;
import java.nio.file.*;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import jakarta.servlet.http.HttpServletRequest;
import online.course.market.entity.dto.ApiResponse;
import online.course.market.entity.dto.category.CategoryDto;
import online.course.market.entity.dto.course.CourseDto;
import online.course.market.entity.dto.course.QuickViewCourseGetResponse;
import online.course.market.entity.model.Course;
import online.course.market.service.LogService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import online.course.market.service.CourseService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.PostConstruct;

import static online.course.market.utils.Constant.*;

@RestController
@RequestMapping("api/v1/user/course")
@Tag(name = "Course", description = "Course controller")
public class CourseController {

    private final LogService logService;
    private final CourseService courseService;
    private final ModelMapper modelMapper;
    private final String resourceFolder;
    private final String env;

    public CourseController(LogService logService, CourseService courseService, ModelMapper modelMapper,
                            @Qualifier("uploadUrl") String resourceFolder, @Qualifier("env") String environment) {
        this.logService = logService;
        this.courseService = courseService;
        this.modelMapper = modelMapper;
        this.resourceFolder = resourceFolder;
        this.env = environment;
    }

    @PostConstruct
    public void init() {
        try {
            Path uploadDir = Paths.get(resourceFolder);
            // Create directory if it doesn't exist
            if (!Files.exists(uploadDir)) {
                Files.createDirectories(uploadDir);
            }
        } catch (IOException e) {
            throw new RuntimeException("Failed to initialize upload directory: " + resourceFolder, e);
        }
    }

    // Helper: map Course sang GetCourseDto
    private CourseDto toDto(Course course) {
        return modelMapper.map(course, CourseDto.class);
    }

    @Operation(description = "Get pageable endpoint for Course", summary = "This is a summary for Course get pageable endpoint")
    @GetMapping("/pageable")
    public ResponseEntity<ApiResponse<Page<CourseDto>>> getPageable(Pageable pageable) {
        Page<Course> coursePage = courseService.finadAll(pageable);
        Page<CourseDto> coursePageDto = coursePage.map(this::toDto);
        return ResponseEntity.ok(ApiResponse.success(coursePageDto));
    }

    @Operation(description = "Get all endpoint for Course", summary = "This is a summary for Course get all endpoint")
    @GetMapping
    public ResponseEntity<ApiResponse<Page<CourseDto>>> getAll(
            @PageableDefault(size = 15, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String isDisplayHot,
            HttpServletRequest request) {
        logService.save(env, request, LOG_VIEW_COURSE, LOG_ACTION_GET_ALL_COURSE, HttpMethod.GET.name());
        Boolean displayHot =
                isDisplayHot == null || isDisplayHot.isBlank() ? null :
                        "1".equals(isDisplayHot) ? Boolean.TRUE :
                                "0".equals(isDisplayHot) ? Boolean.FALSE : null;
        Page<CourseDto> courseDtos = courseService.filterCourse(
                (status != null && !status.toString().isBlank()) ? status : null,
                (search != null && !search.toString().isBlank()) ? search : null,
                displayHot,
                pageable
        ).map(course -> {
            CourseDto courseDto = toDto(course);
            Optional.ofNullable(course.getCategory())
                    .ifPresent(category -> courseDto.setCategory(modelMapper.map(category, CategoryDto.class)));
            return courseDto;
        });

        return ResponseEntity.ok(ApiResponse.success(courseDtos));
    }

    @Operation(description = "Get by name endpoint for Course", summary = "This is a summary for Course get by name endpoint")
    @GetMapping("/quick_view")
    public ResponseEntity<ApiResponse<List<QuickViewCourseGetResponse>>> GetQuickViewCourse() {
        List<QuickViewCourseGetResponse> quickViewCourse = courseService.getQuickViewCourse();
        return ResponseEntity.ok(ApiResponse.success(quickViewCourse));
    }

    @Operation(description = "Get by name endpoint for Course", summary = "This is a summary for Course get by name endpoint")
    @GetMapping("/recommend")
    public ResponseEntity<ApiResponse<List<CourseDto>>> getRecommendCourse() {
        List<CourseDto> recommendCourse = courseService.getRecommendCourse().stream().map(this::toDto).toList();
        return ResponseEntity.ok(ApiResponse.success(recommendCourse));
    }

    @Operation(description = "Get by slug endpoint for Course", summary = "This is a summary for Course get by id endpoint")
    @GetMapping("/slug/{slug}")
    public ResponseEntity<ApiResponse<CourseDto>> getById(@PathVariable String slug, HttpServletRequest request) {
        Course course = courseService.getBySlug(slug);
        logService.save(env, request, LOG_DETAIL_COURSE, LOG_ACTION_GET_DETAIL_COURSE, HttpMethod.GET.name());
        return ResponseEntity.ok(ApiResponse.success(toDto(course)));
    }

    @Operation(description = "Get courses by category endpoint", summary = "This is a summary for Course get by category endpoint")
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<ApiResponse<List<CourseDto>>> getByCategoryId(@PathVariable Integer categoryId) {
        List<CourseDto> getCourseDtos = courseService.getByCategoryId(categoryId).stream()
                .map(this::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(ApiResponse.success(getCourseDtos));
    }
}
