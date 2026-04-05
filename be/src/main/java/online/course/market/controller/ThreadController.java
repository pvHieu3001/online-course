package online.course.market.controller;

import lombok.RequiredArgsConstructor;
import online.course.market.entity.dto.amazon.AmazonPostRequest;
import online.course.market.service.ThreadService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/amazon")
public class ThreadController {
    private final ThreadService service;

    @PostMapping("/collect")
    @CrossOrigin(origins = "*")
    public ResponseEntity<String> collectData(
            @RequestBody List<AmazonPostRequest> posts,
            @RequestParam(name = "threadId", required = true) String threadId
    ) {
        try {
            for (AmazonPostRequest post : posts) {
                service.downloadAndUpload(post, true);
            }
            return ResponseEntity.ok("Đã nhận " + posts.size() + " bài viết cho Thread: " + threadId);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Lỗi hệ thống: " + e.getMessage());
        }
    }
}
