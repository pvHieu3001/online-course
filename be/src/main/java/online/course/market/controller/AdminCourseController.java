package online.course.market.controller;

import java.io.IOException;
import java.nio.file.*;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import jakarta.servlet.http.HttpServletRequest;
import online.course.market.entity.dto.ApiResponse;
import online.course.market.entity.dto.category.GetCategoryDto;
import online.course.market.entity.dto.course.GetCourseDto;
import online.course.market.entity.dto.course.PostCourseDto;
import online.course.market.entity.dto.course.PutCourseDto;
import online.course.market.entity.model.Category;
import online.course.market.entity.model.Course;
import online.course.market.service.CategoryService;
import online.course.market.service.LogService;
import online.course.market.utils.SlugUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import online.course.market.service.CourseService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.annotation.PostConstruct;

import static online.course.market.utils.Constant.*;

@RestController
@RequestMapping("api/v1/admin/course")
@Tag(name = "Course", description = "Course controller")
public class AdminCourseController {

    private final LogService logService;
    private final CourseService courseService;
    private final CategoryService categoryService;
    private final ModelMapper modelMapper;
    private final String resourceFolder;
    private final String env;

    private Path uploadDir;

    public AdminCourseController(LogService logService, CourseService courseService, CategoryService categoryService, ModelMapper modelMapper,
                            @Qualifier("uploadUrl") String resourceFolder, @Qualifier("env") String environment) {
        this.logService = logService;
        this.courseService = courseService;
        this.categoryService = categoryService;
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

    @Operation(description = "Save endpoint for Course", summary = "This is a summary for Course save endpoint")
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<GetCourseDto>> saveCourse(@Valid @ModelAttribute PostCourseDto dto, HttpServletRequest request) {
        try {
            if(!Files.exists(uploadDir)){
                Files.createDirectories(uploadDir);
            }

            String imageFilename="";
            if(dto.getImageFile() != null){
                imageFilename = UUID.randomUUID()+"_"+dto.getImageFile().getOriginalFilename();
                Path imagePath = uploadDir.resolve(imageFilename);
                Files.copy(dto.getImageFile().getInputStream(), imagePath, StandardCopyOption.REPLACE_EXISTING);
            }

            String sourceFilename="";
            if(dto.getSourceFile() != null){
                sourceFilename = UUID.randomUUID()+"_"+dto.getSourceFile().getOriginalFilename();
                Path sourcePath = uploadDir.resolve(sourceFilename);
                Files.copy(dto.getSourceFile().getInputStream(), sourcePath, StandardCopyOption.REPLACE_EXISTING);
            }

            dto.setSlug(SlugUtils.toSlug(dto.getName()));
            dto.setImageUrl(imageFilename);
            dto.setSourceUrl(sourceFilename);
            Course course = modelMapper.map(dto, Course.class);
            Category category = categoryService.getById(dto.getCategoryId());
            course.setCategory(category);
            Course courseDb = courseService.save(course);
            logService.save(env, request, 1, courseDb.getId(), LOG_CREATE_COURSE, LOG_ACTION_CREATE_NEW_COURSE);
            return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success("Created", toDto(courseDb)));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Operation(description = "Update endpoint for Course", summary = "This is a summary for Course update endpoint")
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<GetCourseDto>> updateCourse(@Valid @ModelAttribute PutCourseDto dto,
                                                                  @PathVariable Integer id, HttpServletRequest request) {
        try {
            if(!Files.exists(uploadDir)){
                Files.createDirectories(uploadDir);
            }

            String imageFilename="";
            if(dto.getImageFile() != null){
                imageFilename = UUID.randomUUID()+"_"+dto.getImageFile().getOriginalFilename();
                Path imagePath = uploadDir.resolve(imageFilename);
                Files.copy(dto.getImageFile().getInputStream(), imagePath, StandardCopyOption.REPLACE_EXISTING);
            }

            String sourceFilename = dto.getSourceUrl();
            if(dto.getSourceFile() != null){
                sourceFilename = UUID.randomUUID()+"_"+dto.getSourceFile().getOriginalFilename();
                Path sourcePath = uploadDir.resolve(sourceFilename);
                Files.copy(dto.getSourceFile().getInputStream(), sourcePath, StandardCopyOption.REPLACE_EXISTING);
            }

            dto.setSlug(SlugUtils.toSlug(dto.getName()));
            dto.setImageUrl(imageFilename);
            dto.setSourceUrl(sourceFilename);

            Course course = modelMapper.map(dto, Course.class);
            Course courseDb = courseService.update(course, id, dto.getCategoryId());
            logService.save(env, request, 1, courseDb.getId(), LOG_UPDATE_COURSE, LOG_ACTION_UPDATE_COURSE);
            return ResponseEntity.ok(ApiResponse.success("Updated", toDto(courseDb)));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Operation(description = "Delete endpoint for Course", summary = "This is a summary for Course delete endpoint")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteCourse(@PathVariable Integer id, HttpServletRequest request) {
        courseService.deleteById(id);
        logService.save(env, request, 1, id, LOG_DELETE_COURSE, LOG_ACTION_DELETE_COURSE);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(ApiResponse.success("Deleted", null));
    }
}
