package online.course.market.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import online.course.market.entity.dto.ApiResponse;
import online.course.market.entity.dto.category.GetCategoryDto;
import online.course.market.entity.dto.course.GetCourseDto;
import online.course.market.entity.dto.course.PostCourseDto;
import online.course.market.entity.dto.course.PutCourseDto;
import online.course.market.entity.dto.upload.FileUploadResponse;
import online.course.market.entity.model.Category;
import online.course.market.entity.model.Course;
import online.course.market.service.CategoryService;
import online.course.market.service.CourseService;
import online.course.market.service.LogService;
import online.course.market.utils.SlugUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import static online.course.market.utils.Constant.*;

@RestController
@RequestMapping("api/v1/admin/upload")
@Tag(name = "Upload", description = "Upload controller")
public class UploadController {

    private final String resourceFolder;

    private Path uploadDir;

    public UploadController(@Qualifier("uploadUrl") String resourceFolder) {
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

    @Operation(description = "Save endpoint for Upload", summary = "This is a summary for upload save endpoint")
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<FileUploadResponse>> upload(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ApiResponse.error(HttpStatus.BAD_REQUEST.value(),"File is empty"));
        }

        try {
            // Lấy tên file và đuôi
            String originalFilename = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
            String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            String uniqueFileName = UUID.randomUUID().toString() + extension;

            // Tạo đường dẫn lưu
            Path uploadPath = Paths.get(resourceFolder);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            Path filePath = uploadPath.resolve(uniqueFileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            return ResponseEntity.ok(ApiResponse.success(new FileUploadResponse(uniqueFileName)));
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ApiResponse.error(HttpStatus.BAD_REQUEST.value(),"Upload file error"));
        }
    }
}
