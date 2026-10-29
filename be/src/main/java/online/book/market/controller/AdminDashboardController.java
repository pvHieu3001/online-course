package online.book.market.controller;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletRequest;
import online.book.market.entity.dto.ApiResponse;
import online.book.market.entity.dto.dashboard.DashboardDto;
import online.book.market.service.BlogService;
import online.book.market.service.BookService;
import online.book.market.service.LogService;
import online.book.market.service.UserService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.nio.file.Path;

import static online.book.market.utils.Constant.LOG_ACTION_GET_ALL_DASHBOARD;
import static online.book.market.utils.Constant.LOG_VIEW_DASHBOARD;

@RestController
@RequestMapping("api/v1/admin/dashboard")
@io.swagger.v3.oas.annotations.tags.Tag(name = "Dashboard", description = "Dashboard controller")
public class AdminDashboardController {

    private final LogService logService;
    private final BookService bookService;
    private final UserService userService;
    private final BlogService blogService;
    private final String env;

    private Path uploadDir;

    public AdminDashboardController(LogService logService, BookService bookService, UserService userService, BlogService blogService
            , @Qualifier("env") String environment) {
        this.logService = logService;
        this.bookService = bookService;
        this.userService = userService;
        this.blogService = blogService;
        this.env = environment;
    }

    @Operation(description = "Get all endpoint for Book", summary = "This is a summary for Book get all endpoint")
    @GetMapping
    public ResponseEntity<ApiResponse<DashboardDto>> getInfoDashboard(HttpServletRequest request) {
        logService.save(env, request, LOG_VIEW_DASHBOARD, LOG_ACTION_GET_ALL_DASHBOARD, HttpMethod.GET.name());
        DashboardDto dashboardDto = new DashboardDto();
        dashboardDto.setNumberBook(bookService.count());
        dashboardDto.setNumberPost(blogService.count());
        dashboardDto.setNumberDownload(0L);
        dashboardDto.setNumberUser(userService.count());

        return ResponseEntity.ok(ApiResponse.success(dashboardDto));
    }
}
