package online.course.market.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.PostConstruct;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import online.course.market.entity.dto.ApiResponse;
import online.course.market.entity.dto.blog.GetBlogDto;
import online.course.market.entity.dto.blog.PostBlogDto;
import online.course.market.entity.dto.blog.PutBlogDto;
import online.course.market.entity.model.Blog;
import online.course.market.service.BlogService;
import online.course.market.utils.SlugUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("api/v1/admin/blog")
@Tag(name = "Blog", description = "Blog controller")
public class AdminBlogController {
    private final BlogService blogService;
    private final ModelMapper modelMapper;

    private Path uploadDir;

    // Constructor injection with qualifier for the upload URL bean
    public AdminBlogController(BlogService blogService, ModelMapper modelMapper) {
        this.blogService = blogService;
        this.modelMapper = modelMapper;
    }


    private GetBlogDto toDto(Blog blog) {
        return modelMapper.map(blog, GetBlogDto.class);
    }

    @Operation(description = "Get all endpoint for Blog", summary = "Get all Blog")
    @GetMapping
    public ResponseEntity<ApiResponse<List<GetBlogDto>>> getAll(@RequestParam(required = false) String search) {
        List<GetBlogDto> dtos = blogService.getAll().stream()
                .filter(blog -> search == null || search.isEmpty() || blog.getTitle().toLowerCase().contains(search.toLowerCase()))
                .map(this::toDto).collect(Collectors.toList());
        return ResponseEntity.ok(ApiResponse.success(dtos));
    }

    @Operation(description = "Get by id endpoint for Blog", summary = "Get Blog by id")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<GetBlogDto>> getById(@PathVariable Integer id) {
        Blog Blog = blogService.getById(id);
        return ResponseEntity.ok(ApiResponse.success(toDto(Blog)));
    }

    @Operation(description = "Create Blog", summary = "Create Blog")
    @PostMapping
    public ResponseEntity<ApiResponse<GetBlogDto>> create(@ModelAttribute PostBlogDto dto) {
        try {
            log.info("Creating Blog with title: {}", dto.getTitle());
            
            // Validate required fields
            if (dto.getTitle() == null || dto.getTitle().trim().isEmpty()) {
                log.error("Blog title is null or empty");
                return ResponseEntity.badRequest()
                    .body(ApiResponse.error(400, "Blog title is required"));
            }


            dto.setSlug(SlugUtils.toSlug(dto.getTitle()));
            Blog Blog = modelMapper.map(dto, Blog.class);
            Blog saved = blogService.save(Blog);
            
            log.info("Blog created successfully with ID: {}", saved.getId());
            return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success("Created", toDto(saved)));
        } catch (Exception e) {
            log.error("Failed to create Blog", e);
            throw new RuntimeException("Failed to create Blog: " + e.getMessage(), e);
        }
    }

    @Operation(description = "Update Blog", summary = "Update Blog")
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<GetBlogDto>> update(@Valid @ModelAttribute PutBlogDto dto, @PathVariable Integer id) {
        try {
            log.info("Updating Blog with ID: {}, title: {}", id, dto.getTitle());
            
            // Validate required fields
            if (dto.getTitle() == null || dto.getTitle().trim().isEmpty()) {
                log.error("Blog title is null or empty");
                return ResponseEntity.badRequest()
                    .body(ApiResponse.error(400, "Blog title is required"));
            }

            dto.setSlug(SlugUtils.toSlug(dto.getTitle()));
            Blog Blog = modelMapper.map(dto, Blog.class);
            Blog updated = blogService.update(Blog, id);
            
            log.info("Blog updated successfully with ID: {}", updated.getId());
            return ResponseEntity.ok(ApiResponse.success("Updated", toDto(updated)));
        }catch (Exception e) {
            log.error("Failed to update Blog", e);
            throw new RuntimeException("Failed to update Blog: " + e.getMessage(), e);
        }
    }

    @Operation(description = "Delete Blog", summary = "Delete Blog")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Integer id) {
        try {
            log.info("Deleting Blog with ID: {}", id);
            blogService.deleteById(id);
            log.info("Blog deleted successfully with ID: {}", id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(ApiResponse.success("Deleted", null));
        } catch (Exception e) {
            log.error("Failed to delete Blog with ID: {}", id, e);
            throw new RuntimeException("Failed to delete Blog: " + e.getMessage(), e);
        }
    }
} 