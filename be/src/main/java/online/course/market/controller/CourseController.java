package online.course.market.controller;

import java.io.IOException;
import java.nio.file.*;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import online.course.market.entity.dto.ApiResponse;
import online.course.market.entity.dto.category.GetCategoryDto;
import online.course.market.entity.dto.course.GetCourseDto;
import online.course.market.entity.dto.course.PostCourseDto;
import online.course.market.entity.dto.course.PutCourseDto;
import online.course.market.entity.model.Category;
import online.course.market.entity.model.Course;
import online.course.market.service.CategoryService;
import online.course.market.utils.SlugUtils;
import org.hibernate.annotations.Parameter;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import online.course.market.exception.CJNotFoundException;
import online.course.market.service.CourseService;
import online.course.market.utils.CustomCodeException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.annotation.PostConstruct;

@RestController
@RequestMapping("api/v1/course")
@Tag(name = "Course", description = "Course controller")
public class CourseController {

    private final CourseService courseService;
    private final CategoryService categoryService;
    private final ModelMapper modelMapper;
    private final String resourceFolder;

    private Path uploadDir;

    // Constructor injection with qualifier for the upload URL bean
    public CourseController(CourseService courseService, CategoryService categoryService, ModelMapper modelMapper,
                            @Qualifier("uploadUrl") String resourceFolder) {
        this.courseService = courseService;
        this.categoryService = categoryService;
        this.modelMapper = modelMapper;
        this.resourceFolder = resourceFolder;
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
            @RequestParam(required = false) Boolean isDisplayHot) {

        List<GetCourseDto> getCourseDtos = courseService.getAll().stream()
                .filter(course -> status == null || status.isEmpty() || course.getStatus().equalsIgnoreCase(status))
                .filter(course -> search == null || search.isEmpty() || course.getName().toLowerCase().contains(search.toLowerCase()))
                .filter(course -> !isDisplayHot  || course.getIsDisplayHot())
                .map(course -> {
                    GetCourseDto courseDto = toDto(course);
                    Optional.ofNullable(course.getCategory())
                            .ifPresent(category -> courseDto.setCategory(modelMapper.map(category, GetCategoryDto.class)));
                    return courseDto;
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(ApiResponse.success(getCourseDtos));
    }

    @Operation(description = "Get by name endpoint for Course", summary = "This is a summary for Course get by name endpoint")
    @GetMapping("/{name}/name")
    public ResponseEntity<ApiResponse<GetCourseDto>> getCourseByName(@PathVariable String name) {
        Course courseDb = courseService.getByName(name);
        if (courseDb == null)
            throw new CJNotFoundException(CustomCodeException.CODE_400, "Course not found with name " + name);
        return ResponseEntity.ok(ApiResponse.success(toDto(courseDb)));
    }

    @Operation(description = "Get by id endpoint for Course", summary = "This is a summary for Course get by id endpoint")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<GetCourseDto>> getById(@PathVariable Long id) {
        Course course = courseService.getById(id);
        if (course == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ApiResponse.error(HttpStatus.NOT_FOUND.value(), "Course not found"));
        }
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

    @Operation(description = "Save endpoint for Course", summary = "This is a summary for Course save endpoint")
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<GetCourseDto>> saveCourse(@Valid @ModelAttribute PostCourseDto dto) {
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
            return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success("Created", toDto(courseDb)));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Operation(description = "Update endpoint for Course", summary = "This is a summary for Course update endpoint")
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<GetCourseDto>> updateCourse(@Valid @ModelAttribute PutCourseDto dto,
                                                                 @PathVariable Long id) {
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
            Course courseDb = courseService.update(course, id, dto.getCategoryId());
            return ResponseEntity.ok(ApiResponse.success("Updated", toDto(courseDb)));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Operation(description = "Delete endpoint for Course", summary = "This is a summary for Course delete endpoint")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteCourse(@PathVariable Long id) {
        courseService.deleteById(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(ApiResponse.success("Deleted", null));
    }
}
