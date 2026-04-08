package online.course.market.controller;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import online.course.market.entity.dto.ApiResponse;
import online.course.market.entity.dto.amazon.AmazonPublishRequest;
import online.course.market.entity.dto.amazon.AmazonPutRequest;
import online.course.market.entity.dto.amazon.PostDto;
import online.course.market.entity.dto.amazon.AmazonPostRequest;
import online.course.market.entity.dto.thread.ThreadAccountResponse;
import online.course.market.entity.model.PostEntity;
import online.course.market.entity.model.ThreadAccount;
import online.course.market.entity.model.UserModel;
import online.course.market.service.ThreadService;
import online.course.market.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
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
    private final ThreadService service;
    private final UserService userService;
    private final ModelMapper modelMapper;
    private final ThreadService threadService;


    private PostDto toDto(PostEntity post) {
        return modelMapper.map(post, PostDto.class);
    }
    private ThreadAccountResponse toDto(ThreadAccount threadAccount) {
        return modelMapper.map(threadAccount, ThreadAccountResponse.class);
    }

    @Operation(description = "Get all posts for the logged-in user", summary = "Get user posts")
    @GetMapping
    public ResponseEntity<ApiResponse<Page<PostDto>>> getAll(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) Boolean isCaptionLink,
            @RequestParam(required = false, defaultValue = "0") Integer page,
            @RequestParam(required = false, defaultValue = "10") Integer size) {
        Page<PostDto> data = service.getPostsByUser(search, status, isCaptionLink, page, size)
                .map(this::toDto);
        return ResponseEntity.ok(ApiResponse.success(data));
    }

    @Operation(description = "Get all thread acc for the logged-in user", summary = "Get user posts")
    @GetMapping("/get-thread-account")
    public ResponseEntity<ApiResponse<List<ThreadAccountResponse>>> getAllThreadAccount(Authentication authentication) {
        List<ThreadAccountResponse> dtos = threadService.getAllThreadAccount()
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
    @PostMapping("/publish")
    public ResponseEntity<ApiResponse<?>> publishPost(@RequestBody AmazonPublishRequest request) {
        ThreadAccount threadAccount = threadService.getThreadAccountByThreadId(request.getThreadId());
        if (threadAccount == null || Objects.equals(threadAccount.getIsThreadPending(), true) || !StringUtils.hasText(threadAccount.getThreadId()) || !StringUtils.hasText(threadAccount.getThreadToken())) {
            throw new RuntimeException("Thiếu thông tin định danh, token hoặc pending.");
        }
        service.publishPost(request.getId(), threadAccount, request.getIsCaptionLink());
        return ResponseEntity.ok(ApiResponse.success());
    }

    @PostMapping
    public ResponseEntity<ApiResponse<?>> cloneThreadPost(@RequestBody AmazonPostRequest request, Authentication authentication) {
        try {
            UserModel userModel = userService.getByUserName(authentication.getName());
            service.downloadAndUpload(request, false);
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
