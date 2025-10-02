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
import online.course.market.entity.dto.dashboard.DashboardDto;
import online.course.market.entity.dto.tag.TagDto;
import online.course.market.entity.dto.url.UrlDto;
import online.course.market.entity.model.Category;
import online.course.market.entity.model.Course;
import online.course.market.entity.model.Tag;
import online.course.market.entity.model.Url;
import online.course.market.repository.UrlRepository;
import online.course.market.service.*;
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
@RequestMapping("api/v1/admin/dashboard")
@io.swagger.v3.oas.annotations.tags.Tag(name = "Dashboard", description = "Dashboard controller")
public class AdminDashboardController {

    private final LogService logService;
    private final CourseService courseService;
    private final UserService userService;
    private final BlogService blogService;
    private final String env;

    private Path uploadDir;

    public AdminDashboardController(LogService logService, CourseService courseService, UserService userService, BlogService blogService
            , @Qualifier("env") String environment) {
        this.logService = logService;
        this.courseService = courseService;
        this.userService = userService;
        this.blogService = blogService;
        this.env = environment;
    }

    @Operation(description = "Get all endpoint for Course", summary = "This is a summary for Course get all endpoint")
    @GetMapping
    public ResponseEntity<ApiResponse<DashboardDto>> getInfoDashboard(HttpServletRequest request) {
        logService.save(env, request, LOG_VIEW_DASHBOARD, LOG_ACTION_GET_ALL_DASHBOARD, HttpMethod.GET.name());
        DashboardDto dashboardDto = new DashboardDto();
        dashboardDto.setNumberCourse(courseService.count());
        dashboardDto.setNumberPost(blogService.count());
        dashboardDto.setNumberDownload(0L);
        dashboardDto.setNumberUser(userService.count());

        return ResponseEntity.ok(ApiResponse.success(dashboardDto));
    }
}
