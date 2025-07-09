package online.course.market.controller;

import java.util.List;
import java.util.stream.Collectors;

import online.course.market.entity.dto.course.GetAllCourseDto;
import online.course.market.entity.dto.course.GetCourseDto;
import online.course.market.entity.dto.course.PostCourseDto;
import online.course.market.entity.dto.course.PutCourseDto;
import online.course.market.entity.model.Course;
import org.apache.commons.lang3.ObjectUtils;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import online.course.market.exception.CJNotFoundException;
import online.course.market.service.CourseService;
import online.course.market.utils.CustomCodeException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("api/v1/Course")
@Tag(name = "Course",description = "Course controller")
public class CourseController {

    private final CourseService CourseService;
    private final ModelMapper modelMapper;

    @Operation(description = "Get pageable endpoint for Course", summary = "This is a summary for Course get pageable endpoint")
    @GetMapping(value = "/pageable")
    public ResponseEntity<Page<GetCourseDto>> getPageable(Pageable pageable) {
        Page<Course> CoursePage = CourseService.finadAll(pageable);
        Page<GetCourseDto> CoursePageDto = CoursePage.map(Course -> modelMapper.map(Course, GetCourseDto.class));
        return ResponseEntity.status(HttpStatus.OK).body(CoursePageDto);
    }

    @Operation(description = "Get all endpoint for Course", summary = "This is a summary for Course get all endpoint")
    @GetMapping
    public ResponseEntity<GetAllCourseDto> getAll() {
        // Get All Course for Course services
        List<Course> courses = CourseService.getAll();
        // Map Course model to DTO objects
        List<GetCourseDto> getCourseDtos = courses.stream().map(course -> modelMapper.map(course, GetCourseDto.class))
                .collect(Collectors.toList());
        // create DTO for all Course DTO and size
        GetAllCourseDto getAllCourseDto = new GetAllCourseDto(getCourseDtos, getCourseDtos.size());
        // return endpoint
        return ResponseEntity.status(HttpStatus.OK).body(getAllCourseDto);
    }

    @Operation(description = "Get by name endpoint for Course", summary = "This is a summary for Course get by name endpoint")
    @GetMapping("/{name}/name")
    public ResponseEntity<GetCourseDto> getCourseByName(@PathVariable String name) {
        Course CourseDb = CourseService.getByName(name);
        if(ObjectUtils.isEmpty(CourseDb))
            throw new CJNotFoundException(CustomCodeException.CODE_400, "Course not found with name "+name);
        GetCourseDto getCourseDto = modelMapper.map(CourseDb, GetCourseDto.class);
        return ResponseEntity.status(HttpStatus.OK).body(getCourseDto);
    }

    @Operation(description = "Save  endpoint for Course", summary = "This is a summary for Course save endpoint")
    @PostMapping
    public ResponseEntity<GetCourseDto> saveCourse(@Valid @RequestBody PostCourseDto dto) {
        Course course = modelMapper.map(dto, Course.class);
        Course courseDb = CourseService.save(course);
        GetCourseDto getCourseDto = modelMapper.map(courseDb, GetCourseDto.class);
        return ResponseEntity.status(HttpStatus.CREATED).body(getCourseDto);
    }

    @Operation(description = "Update  endpoint for Course", summary = "This is a summary for Course update endpoint")
    @PutMapping(value = "/{id}")
    public ResponseEntity<GetCourseDto> updateCourse(@Valid @RequestBody PutCourseDto dto,
                                                 @PathVariable(name = "id") Long id) {
        // Map DTO to Model object for service
        Course Course = modelMapper.map(dto, Course.class);
        // Send object to update service
        Course CourseDb = CourseService.update(Course, id);
        // Map Model to DTO object for return endpoint
        GetCourseDto getCourseDto = modelMapper.map(CourseDb, GetCourseDto.class);
        // Return endpoint
        return ResponseEntity.status(HttpStatus.OK).body(getCourseDto);
    }

    @Operation(description = "Delete  endpoint for Course", summary = "This is a summary for Course delete endpoint")
    @DeleteMapping(value = "{id}")
    public ResponseEntity<GetCourseDto> deleteCourse(@PathVariable(name = "id") Long id) {
        // Send id to delete service
        CourseService.deleteById(id);
        // return endpoint
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
