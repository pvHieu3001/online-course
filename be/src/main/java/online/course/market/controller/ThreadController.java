package online.course.market.controller;

import lombok.RequiredArgsConstructor;
import online.course.market.entity.dto.ApiResponse;
import online.course.market.entity.dto.thread.ThreadsDownloadResult;
import online.course.market.service.ThreadsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/thread")
public class ThreadController {
    private final ThreadsService service;

    @PostMapping("/create")
    public ResponseEntity<ApiResponse<?>> createKyc(@RequestParam(value = "urlPost", required = true) String urlPost,
                                                    @RequestParam(value = "urlAmz", required = true) String urlAmz,
                                                    @RequestParam(value = "cap", required = false) String cap) {
        ThreadsDownloadResult result = service.downloadContent(urlPost);
        String originCap = result.getText();
        if(cap!=null){
            originCap = cap;
        }
        service.create(String.join(",", result.getMediaUrls()), urlAmz, originCap);
        return ResponseEntity.ok(ApiResponse.success());
    }
}
