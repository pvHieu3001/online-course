package online.course.market.controller;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import online.course.market.entity.dto.ApiResponse;
import online.course.market.entity.dto.amazon.PostDto;
import online.course.market.entity.dto.amazon.AmazonPostRequest;
import online.course.market.entity.model.PostEntity;
import online.course.market.service.AffiliateService;
import online.course.market.service.ThreadsService;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/admin/amazon")
public class ThreadController {
    private final ThreadsService service;
    private final ModelMapper modelMapper;


    private PostDto toDto(PostEntity post) {
        return modelMapper.map(post, PostDto.class);
    }

    @Operation(description = "Get all endpoint for Category", summary = "Get all Category")
    @GetMapping
    public ResponseEntity<ApiResponse<List<PostDto>>> getAll(@RequestParam(required = false) String search) {
        List<PostDto> dtos = service.getAllPosts().stream()
                .filter(affiliate -> search == null || search.isEmpty() || affiliate.getCaption().toLowerCase().contains(search.toLowerCase()))
                .map(this::toDto).collect(Collectors.toList());
        return ResponseEntity.ok(ApiResponse.success(dtos));
    }

    @Operation(description = "Get by id endpoint for Category", summary = "Get Category by id")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<PostDto>> getById(@PathVariable Long id) {
        PostEntity post = service.getPostById(id);
        return ResponseEntity.ok(ApiResponse.success(toDto(post)));
    }
    
    @PostMapping
    public ResponseEntity<ApiResponse<?>> cloneThreadPost(@RequestBody AmazonPostRequest request) {
        try {
            service.downloadAndUpload(request);
            return ResponseEntity.ok(ApiResponse.success());
        } catch (Exception e) {
            throw new RuntimeException("Failed to create category: " + e.getMessage(), e);
        }
    }

//    @PutMapping("/{id}")
//    public ResponseEntity<ApiResponse<PostDto>> updateLink(@PathVariable Long id, @RequestBody AmazonPutRequest request) {
//        try {
//            Amazon updated = affiliateService.updateAmazon(id, request);
//            return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success("Created", toDto(updated)));
//        }catch (Exception e) {
//            throw new RuntimeException("Failed to create category: " + e.getMessage(), e);
//        }
//    }
//
//    @Operation(description = "Delete Category", summary = "Delete Category")
//    @DeleteMapping("/{id}")
//    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
//        try {
//            affiliateService.deleteById(id);
//            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(ApiResponse.success("Deleted", null));
//        } catch (Exception e) {
//            throw new RuntimeException("Failed to delete category: " + e.getMessage(), e);
//        }
//    }
}
