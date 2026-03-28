package online.course.market.controller;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import online.course.market.entity.dto.ApiResponse;
import online.course.market.entity.dto.amazon.AmazonPostRequest;
import online.course.market.entity.dto.amazon.AmazonPutRequest;
import online.course.market.entity.dto.amazon.PostDto;
import online.course.market.entity.model.PostEntity;
import online.course.market.entity.model.UserModel;
import online.course.market.service.ThreadsService;
import online.course.market.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/amazon")
public class ThreadController {
    private final ThreadsService service;

    @PostMapping("/collect")
    @CrossOrigin(origins = "*")
    public ResponseEntity<String> collectData(
            @RequestBody List<AmazonPostRequest> posts,
            @RequestParam(name = "threadId", required = true) String threadId
    ) {
        try {
            for (AmazonPostRequest post : posts) {
                post.setCaption(service.reCreateCap(post.getCaption()));
                post.setAmzUrl(service.resolveAmazonLink(post.getAmzUrl()));
                service.downloadAndUpload(post, threadId);
            }
            return ResponseEntity.ok("Đã nhận " + posts.size() + " bài viết cho Thread: " + threadId);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Lỗi hệ thống: " + e.getMessage());
        }
    }
}
