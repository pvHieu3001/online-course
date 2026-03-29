package online.course.market.controller;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import online.course.market.entity.dto.ApiResponse;
import online.course.market.entity.dto.amazon.AmazonPutRequest;
import online.course.market.entity.dto.amazon.PostDto;
import online.course.market.entity.dto.amazon.AmazonPostRequest;
import online.course.market.entity.model.PostEntity;
import online.course.market.entity.model.UserModel;
import online.course.market.service.ThreadsService;
import online.course.market.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/admin/amazon")
public class AdminThreadController {
    private final ThreadsService service;
    private final UserService userService;
    private final ModelMapper modelMapper;


    private PostDto toDto(PostEntity post) {
        return modelMapper.map(post, PostDto.class);
    }

    @Operation(description = "Get all posts for the logged-in user", summary = "Get user posts")
    @GetMapping
    public ResponseEntity<ApiResponse<List<PostDto>>> getAll(
            @RequestParam(required = false) String search,
            Authentication authentication) {
        String currentUsername = authentication.getName();
        List<PostDto> dtos = service.getPostsByUser(currentUsername, search)
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(ApiResponse.success(dtos));
    }

    @Operation(description = "Get by id endpoint for Category", summary = "Get Category by id")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<PostDto>> getById(@PathVariable Long id) {
        PostEntity post = service.getPostById(id);
        return ResponseEntity.ok(ApiResponse.success(toDto(post)));
    }

    @Operation(description = "Get by id endpoint for Category", summary = "Get Category by id")
    @PostMapping("/publish/{id}")
    public ResponseEntity<ApiResponse<?>> publishPost(@PathVariable Long id, Authentication authentication) {
        UserModel userModel = userService.getByUserName(authentication.getName());
        if (userModel == null || Objects.equals(userModel.getIsThreadPending(), true) || !StringUtils.hasText(userModel.getThreadId()) || !StringUtils.hasText(userModel.getThreadToken())) {
            throw new RuntimeException("Thiếu thông tin định danh, token hoặc pending.");
        }
        service.publishPost(id, userModel);
        return ResponseEntity.ok(ApiResponse.success());
    }
    
    @PostMapping
    public ResponseEntity<ApiResponse<?>> cloneThreadPost(@RequestBody AmazonPostRequest request, Authentication authentication) {
        try {
            UserModel userModel = userService.getByUserName(authentication.getName());
            service.downloadAndUpload(request, userModel.getThreadId(), false);
            return ResponseEntity.ok(ApiResponse.success());
        } catch (Exception e) {
            throw new RuntimeException("Failed to create category: " + e.getMessage(), e);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<PostDto>> updateLink(@PathVariable Long id, @RequestBody AmazonPutRequest request) {
        try {
            PostEntity updated = service.updatePost(id, request);
            return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success("Created", toDto(updated)));
        }catch (Exception e) {
            throw new RuntimeException("Failed to create category: " + e.getMessage(), e);
        }
    }

    @Operation(description = "Delete Category", summary = "Delete Category")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        try {
            service.deleteById(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(ApiResponse.success("Deleted", null));
        } catch (Exception e) {
            throw new RuntimeException("Failed to delete category: " + e.getMessage(), e);
        }
    }
}
