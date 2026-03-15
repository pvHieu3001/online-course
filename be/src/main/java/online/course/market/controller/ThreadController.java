package online.course.market.controller;

import lombok.RequiredArgsConstructor;
import online.course.market.entity.dto.ApiResponse;
import online.course.market.entity.dto.thread.ThreadsDownloadResult;
import online.course.market.service.ThreadsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/thread")
public class ThreadController {
    private final ThreadsService service;

    @GetMapping("/create")
    public ResponseEntity<ApiResponse<?>> createKyc(@RequestParam(value = "urlPost", required = true) String urlPost,
                                                    @RequestParam(value = "urlAmz", required = true) String urlAmz,
                                                    @RequestParam(value = "cap", required = false) String cap) {
        service.downloadAndUpload(urlPost, urlAmz, cap);
        return ResponseEntity.ok(ApiResponse.success());
    }
}
