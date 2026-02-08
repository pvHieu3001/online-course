package online.course.market.controller;

import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import online.course.market.entity.dto.nice.NiceRequest;
import online.course.market.entity.model.UserModel;
import online.course.market.service.NiceService;
import online.course.market.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Slf4j
@RestController
@RequestMapping("/api/v1/nice") // Xóa gạch chéo thừa ở cuối
public class NiceController {

    @Value("${app.frontend-url}")
    private String frontendUrl;

    @Value("${nice.find-id-callback-url}")
    private String findIdCallback;

    @Value("${nice.find-pwd-callback-url}")
    private String findPwdCallback;

    @Autowired
    private NiceService niceService;

    @Autowired
    private UserService userService;

    // --- FIND ID ---

    @GetMapping("/find-id")
    public ResponseEntity<NiceRequest> findId() {
        try {
            // Service sẽ tạo EncData dựa trên callback URL cho Find ID
            NiceRequest niceParams = niceService.generateRequestData(findIdCallback);
            return ResponseEntity.ok(niceParams);
        } catch (Exception e) {
            log.error("Error generating Find ID request: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/find-id-callback")
    public void handleFindIdCallback(
            @RequestParam(value = "encData", required = false) String encData,
            @RequestParam(value = "errorCode", required = false) String errorCode,
            HttpServletResponse response
    ) throws IOException {

        if (errorCode != null && !errorCode.isEmpty()) {
            response.sendRedirect(frontendUrl + "/nice/result?status=fail&error=" + errorCode);
            return;
        }

        try {
            if (encData != null) {
                String phoneNumber = niceService.verifyData(encData);
                UserModel userModel = userService.getByPhoneNumber(phoneNumber);

                if (userModel != null) {
                    String encodedName = URLEncoder.encode(userModel.getUsername(), StandardCharsets.UTF_8);
                    response.sendRedirect(frontendUrl + "/nice/result?status=success&username=" + encodedName);
                    return;
                }
            }
        } catch (Exception e) {
            log.error("Error in Find ID callback: ", e);
        }

        response.sendRedirect(frontendUrl + "/nice/result?status=fail");
    }

    // --- FIND PASSWORD ---

    @GetMapping("/find-pwd")
    public ResponseEntity<NiceRequest> findPwd() {
        try {
            NiceRequest niceParams = niceService.generateRequestData(findPwdCallback);
            return ResponseEntity.ok(niceParams);
        } catch (Exception e) {
            log.error("Error generating Find PWD request: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/find-pwd-callback")
    public void handleFindPwdCallback(
            @RequestParam(value = "EncodeData", required = false) String encData,
            @RequestParam(value = "errorCode", required = false) String errorCode,
            HttpServletResponse response
    ) throws IOException {

        if (errorCode != null && !errorCode.isEmpty()) {
            response.sendRedirect(frontendUrl + "/nice/result?status=fail&error=" + errorCode);
            return;
        }

        try {
            if (encData != null) {
                String phoneNumber = niceService.verifyData(encData);
                // Gửi SMS mật khẩu tạm sau khi xác thực danh tính thành công
                Boolean isSent = niceService.sendTempPwd(phoneNumber);

                if (Boolean.TRUE.equals(isSent)) {
                    response.sendRedirect(frontendUrl + "/nice/result?status=success");
                    return;
                }
            }
        } catch (Exception e) {
            log.error("Error in Find PWD callback: ", e);
        }

        response.sendRedirect(frontendUrl + "/nice/result?status=fail");
    }
}