package online.course.market.controller;

import java.io.IOException;
import java.nio.file.*;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import jakarta.servlet.http.HttpServletRequest;
import online.course.market.entity.dto.ApiResponse;
import online.course.market.entity.dto.category.GetCategoryDto;
import online.course.market.entity.dto.course.GetCourseDto;
import online.course.market.entity.model.Course;
import online.course.market.service.LogService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
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

    private Path uploadDir;

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
            uploadDir = Paths.get(resourceFolder);
            // Create directory if it doesn't exist
            if (!Files.exists(uploadDir)) {
                Files.createDirectories(uploadDir);
            }
        } catch (IOException e) {
            throw new RuntimeException("Failed to initialize upload directory: " + resourceFolder, e);
        }
    }

    // Helper: map Course sang GetCourseDto
    private GetCourseDto toDto(Course course) {
        return modelMapper.map(course, GetCourseDto.class);
    }

    @Operation(description = "Get pageable endpoint for Course", summary = "This is a summary for Course get pageable endpoint")
    @GetMapping("/pageable")
    public ResponseEntity<ApiResponse<Page<GetCourseDto>>> getPageable(Pageable pageable) {
        Page<Course> coursePage = courseService.finadAll(pageable);
        Page<GetCourseDto> coursePageDto = coursePage.map(this::toDto);
        return ResponseEntity.ok(ApiResponse.success(coursePageDto));
    }

    @Operation(description = "Get all endpoint for Course", summary = "This is a summary for Course get all endpoint")
    @GetMapping
    public ResponseEntity<ApiResponse<List<GetCourseDto>>> getAll(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String isDisplayHot,
            HttpServletRequest request) {
        logService.save(env, request, 1, null, LOG_VIEW_COURSE, LOG_ACTION_GET_ALL_COURSE);
        Boolean displayHot =
                isDisplayHot == null || isDisplayHot.isBlank() ? null :
                        "1".equals(isDisplayHot) ? Boolean.TRUE :
                                "0".equals(isDisplayHot) ? Boolean.FALSE : null;
        List<GetCourseDto> getCourseDtos = courseService.filterCourse(
                !String.valueOf(status).isEmpty() ? status : null,
                !String.valueOf(search).isEmpty() ? search : null,
                        displayHot
            )
                .stream().map(course -> {
                GetCourseDto courseDto = toDto(course);
                Optional.ofNullable(course.getCategory())
                        .ifPresent(category -> courseDto.setCategory(modelMapper.map(category, GetCategoryDto.class)));
                return courseDto;
            })
            .collect(Collectors.toList());

        return ResponseEntity.ok(ApiResponse.success(getCourseDtos));
    }

    @Operation(description = "Get by name endpoint for Course", summary = "This is a summary for Course get by name endpoint")
    @GetMapping("/recommend")
    public ResponseEntity<ApiResponse<List<GetCourseDto>>> getRecommendCourse() {
        List<GetCourseDto> recommendCourse = courseService.getRecommendCourse().stream().map(this::toDto).toList();
        return ResponseEntity.ok(ApiResponse.success(recommendCourse));
    }

    @Operation(description = "Get by id endpoint for Course", summary = "This is a summary for Course get by id endpoint")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<GetCourseDto>> getById(@PathVariable Integer id, HttpServletRequest request) {
        logService.save(env, request, 1, null, LOG_DETAIL_COURSE, LOG_ACTION_GET_DETAIL_COURSE);

        Course course = courseService.getById(id);
        if (course == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ApiResponse.error(HttpStatus.NOT_FOUND.value(), "Course not found"));
        }
        return ResponseEntity.ok(ApiResponse.success(toDto(course)));
    }

    @Operation(description = "Get by slug endpoint for Course", summary = "This is a summary for Course get by id endpoint")
    @GetMapping("/slug/{slug}")
    public ResponseEntity<ApiResponse<GetCourseDto>> getById(@PathVariable String slug, HttpServletRequest request) {
        Course course = courseService.getBySlug(slug);
        logService.save(env, request, 1, course.getId(), LOG_DETAIL_COURSE, LOG_ACTION_GET_DETAIL_COURSE);
        return ResponseEntity.ok(ApiResponse.success(toDto(course)));
    }

    @Operation(description = "Get courses by category endpoint", summary = "This is a summary for Course get by category endpoint")
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<ApiResponse<List<GetCourseDto>>> getByCategoryId(@PathVariable Integer categoryId) {
        List<GetCourseDto> getCourseDtos = courseService.getByCategoryId(categoryId).stream()
                .map(this::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(ApiResponse.success(getCourseDtos));
    }
}
