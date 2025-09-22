package online.course.market.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import online.course.market.entity.dto.ApiResponse;
import online.course.market.entity.dto.category.CategoryDto;
import online.course.market.entity.dto.course.CourseDto;
import online.course.market.entity.dto.course.CoursePostRequest;
import online.course.market.entity.dto.course.CoursePutRequest;
import online.course.market.entity.dto.tag.TagDto;
import online.course.market.entity.dto.url.UrlDto;
import online.course.market.entity.model.Category;
import online.course.market.entity.model.Course;
import online.course.market.entity.model.Tag;
import online.course.market.entity.model.Url;
import online.course.market.repository.TagRepository;
import online.course.market.repository.UrlRepository;
import online.course.market.service.CategoryService;
import online.course.market.service.CourseService;
import online.course.market.service.LogService;
import online.course.market.service.TagService;
import online.course.market.utils.DataUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;
import java.util.stream.Collectors;
import static online.course.market.utils.Constant.*;

@RestController
@RequestMapping("api/v1/admin/course")
@io.swagger.v3.oas.annotations.tags.Tag(name = "Course", description = "Course controller")
public class AdminCourseController {

    private final LogService logService;
    private final CourseService courseService;
    private final CategoryService categoryService;
    private final TagService tagService;
    private final UrlRepository urlRepository;
    private final ModelMapper modelMapper;
    private final String resourceFolder;
    private final String env;

    private Path uploadDir;

    public AdminCourseController(LogService logService, CourseService courseService, CategoryService categoryService, TagService tagService, UrlRepository urlRepository, ModelMapper modelMapper,
                                 @Qualifier("uploadUrl") String resourceFolder, @Qualifier("env") String environment) {
        this.logService = logService;
        this.courseService = courseService;
        this.categoryService = categoryService;
        this.tagService = tagService;
        this.urlRepository = urlRepository;
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
    private CourseDto toDto(Course course) {
        CourseDto courseDto = modelMapper.map(course, CourseDto.class);
        Optional.ofNullable(course.getCategory())
                .ifPresent(category -> courseDto.setCategory(modelMapper.map(category, CategoryDto.class)));
        Optional.ofNullable(course.getTags())
                .ifPresent(tags -> {
                    List<TagDto> tagDtos = tags.stream()
                            .map(tag -> modelMapper.map(tag, TagDto.class))
                            .toList();
                    courseDto.setTags(new HashSet<>(tagDtos));
                });
        return courseDto;
    }

    @Operation(description = "Get all endpoint for Course", summary = "This is a summary for Course get all endpoint")
    @GetMapping
    public ResponseEntity<ApiResponse<List<CourseDto>>> getAll(
            @PageableDefault(size = 10, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String isDisplayHot,
            HttpServletRequest request) {
        logService.save(env, request, LOG_VIEW_COURSE, LOG_ACTION_GET_ALL_COURSE, HttpMethod.GET.name());
        Boolean displayHot =
                isDisplayHot == null || isDisplayHot.isBlank() ? null :
                        "1".equals(isDisplayHot) ? Boolean.TRUE :
                                "0".equals(isDisplayHot) ? Boolean.FALSE : null;
        List<CourseDto> getCourseDtos = courseService.filterCourse(
                        !String.valueOf(status).isEmpty() ? status : null,
                        !String.valueOf(search).isEmpty() ? search : null,
                        displayHot, pageable
                )
                .stream().map(this::toDto)
                .collect(Collectors.toList());


        return ResponseEntity.ok(ApiResponse.success(getCourseDtos));
    }

    @Operation(description = "Get by id endpoint for Course", summary = "This is a summary for Course get by id endpoint")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CourseDto>> getById(@PathVariable Integer id, HttpServletRequest request) {
        logService.save(env, request, LOG_DETAIL_COURSE, LOG_ACTION_GET_DETAIL_COURSE, HttpMethod.GET.name());

        Course course = courseService.getById(id);
        if (course == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ApiResponse.error(HttpStatus.NOT_FOUND.value(), "Course not found"));
        }
        return ResponseEntity.ok(ApiResponse.success(toDto(course)));
    }

    @Operation(description = "Save endpoint for Course", summary = "This is a summary for Course save endpoint")
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<CourseDto>> saveCourse(@Valid @ModelAttribute CoursePostRequest dto, HttpServletRequest request) {
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

            dto.setSlug(DataUtils.toSlug(dto.getName()));
            dto.setImageUrl(imageFilename);
            Course course = modelMapper.map(dto, Course.class);
            Category category = categoryService.getById(dto.getCategoryId());
            course.setCategory(category);

            if(dto.getTagStr()!=null && !dto.getTagStr().isEmpty()) {
                List<Tag> resolvedTags = new ArrayList<>();
                List<String> tagArray = List.of(dto.getTagStr().split(","));
                tagArray.forEach((tagValue) -> {
                    if (DataUtils.isNumeric(tagValue)) {
                        tagService.findById(Integer.parseInt(tagValue)).ifPresent(resolvedTags::add);
                    } else if (tagValue != null) {
                        Tag tag = tagService.findByName(tagValue).orElseGet(() -> {
                            Tag newTag = new Tag();
                            newTag.setName(tagValue);
                            return tagService.save(newTag);
                        });
                        resolvedTags.add(tag);
                    }
                });
                course.setTags(new HashSet<>(resolvedTags));
            }

            if(dto.getUrlsJson()!=null){
                ObjectMapper mapper = new ObjectMapper();
                List<Url> newUrls = new ArrayList<>();
                List<UrlDto> urls = mapper.readValue(dto.getUrlsJson(), new TypeReference<>() {});
                for (UrlDto urlDto : urls) {
                    Url url;
                    if (urlDto.getId() != null && urlRepository.existsById(urlDto.getId())) {
                        url = urlRepository.findById(urlDto.getId()).get();
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
                course.setUrls(savedUrls);
            }


            Course courseDb = courseService.save(course);
            logService.save(env, request, LOG_CREATE_COURSE, LOG_ACTION_CREATE_NEW_COURSE, HttpMethod.POST.name());
            return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success("Created", toDto(courseDb)));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Operation(description = "Update endpoint for Course", summary = "This is a summary for Course update endpoint")
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<CourseDto>> updateCourse(@Valid @ModelAttribute CoursePutRequest dto,
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

            dto.setSlug(DataUtils.toSlug(dto.getName()));
            dto.setImageUrl(imageFilename);

            Course courseDb = courseService.update(dto, id);
            logService.save(env, request, LOG_UPDATE_COURSE, LOG_ACTION_UPDATE_COURSE, HttpMethod.PUT.name());
            return ResponseEntity.ok(ApiResponse.success("Updated", toDto(courseDb)));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Operation(description = "Delete endpoint for Course", summary = "This is a summary for Course delete endpoint")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteCourse(@PathVariable Integer id, HttpServletRequest request) {
        courseService.deleteById(id);
        logService.save(env, request, LOG_DELETE_COURSE, LOG_ACTION_DELETE_COURSE, HttpMethod.DELETE.name());
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(ApiResponse.success("Deleted", null));
    }
}
