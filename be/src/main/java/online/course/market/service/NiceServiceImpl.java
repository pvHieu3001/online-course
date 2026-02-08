package online.course.market.service;

import lombok.extern.slf4j.Slf4j;
import online.course.market.entity.dto.nice.NiceRequest;
import online.course.market.utils.CPClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.security.SecureRandom;
import java.util.*;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
public class NiceServiceImpl implements NiceService {

    @Value("${nice.site-code}")
    private String siteCode;
    @Value("${nice.site-password}")
    private String sitePassword;
    @Value("${nice.integrity-key}")
    private String intergrityKey;
    @Value("${nice.token-version-id}")
    private String tokenVersionId;
    @Value("${nice.url}")
    private String baseUrl; // Endpoint gửi otp
    @Value("${nice.sms.api-url}")
    private String apiUrl; // Endpoint gửi tin nhắn
    @Value("${nice.sms.auth-url}")
    private String authUrl; // Endpoint lấy Token OAuth2
    @Value("${nice.sms.client-id}")
    private String clientId;
    @Value("${nice.sms.client-secret}")
    private String clientSecret;
    @Value("${nice.sms.sender-phone}")
    private String senderPhone;
    @Value("${nice.popup}")
    private String popup;
    @Value("${nice.auth-type}")
    private String authType;
    @Value("${nice.redis-prefix}")
    private String REDIS_PREFIX;

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    private final RestTemplate restTemplate = new RestTemplate();
    private static final String TOKEN_CACHE_KEY = "NICE_API_TOKEN";

    /**
     * GIAI ĐOẠN 1: TẠO DỮ LIỆU ĐỂ MỞ WEBVIEW XÁC THỰC
     */
    @Override
    public NiceRequest generateRequestData(String callBackUrl) {
        CPClient niceClient = new CPClient();
        String reqSeq = niceClient.getRequestNO(siteCode);

        // Lưu REQ_SEQ vào Redis để đối chiếu khi callback
        redisTemplate.opsForValue().setIfAbsent(REDIS_PREFIX + reqSeq, "PENDING", 30, TimeUnit.MINUTES);

        // Chú ý: Độ dài tên trường phải chính xác (7:REQ_SEQ, 9:SITE_CODE, v.v.)
        String plainData = "7:REQ_SEQ" + reqSeq.length() + ":" + reqSeq +
                "9:SITE_CODE" + siteCode.length() + ":" + siteCode +
                "9:AUTH_TYPE" + authType.length() + ":" + authType +
                "7:RTN_URL" + callBackUrl.length() + ":" + callBackUrl +
                "7:ERR_URL" + callBackUrl.length() + ":" + callBackUrl +
                "11:POPUP_GUBUN" + popup.length() + ":" + popup;

        int result = niceClient.fnEncode(siteCode, sitePassword, plainData);

        if (result == 0) {
            return new NiceRequest(
                    niceClient.getCipherData(),
                    intergrityKey,
                    tokenVersionId,
                    baseUrl
            );
        } else {
            log.error("NICE Encode Error: {}", result);
            throw new RuntimeException("Mã hóa dữ liệu xác thực thất bại.");
        }
    }

    /**
     * GIAI ĐOẠN 2: GIẢI MÃ CALLBACK VÀ TRẢ VỀ SỐ ĐIỆN THOẠI
     */
    @Override
    public String verifyData(String encodeData) {
        CPClient niceClient = new CPClient();
        int res = niceClient.fnDecode(siteCode, sitePassword, encodeData);

        if (res == 0) {
            Map<String, String> userInfo = parsePlainData(niceClient.getPlainData());
            String requestID = userInfo.get("REQ_SEQ");

            if (isValidRequest(requestID)) {
                return userInfo.get("MOBILE_NO");
            } else {
                throw new RuntimeException("Giao dịch không hợp lệ hoặc đã hết hạn.");
            }
        }
        log.error("NICE Decode Error: {}", res);
        throw new RuntimeException("Xác thực danh tính thất bại.");
    }

    /**
     * GIAI ĐOẠN 3: TẠO PWD TẠM THỜI VÀ GỬI SMS
     */
    @Override
    public Boolean sendTempPwd(String phoneNumber) {
        String tempPass = generateTempPassword();
        String message = "[MyService] Mat khau tam thoi cua ban la: " + tempPass;

        Boolean isSent = sendSms(phoneNumber, message);

        if (Boolean.TRUE.equals(isSent)) {
            // Lưu PWD tạm vào Redis trong 5 phút để user login
            redisTemplate.opsForValue().set("TEMP_PWD:" + phoneNumber, tempPass, 5, TimeUnit.MINUTES);
            return true;
        }
        return false;
    }

    public Boolean sendSms(String receiverPhone, String message) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(getAccessToken());

        Map<String, Object> body = new HashMap<>();
        body.put("from", senderPhone);
        body.put("to", receiverPhone);
        body.put("text", message);
        body.put("type", "SMS");

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(apiUrl, request, Map.class);
            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                // NICE SMS thường trả về resultCode "0000"
                Object resultCode = response.getBody().get("resultCode");
                return "0000".equals(String.valueOf(resultCode));
            }
        } catch (Exception e) {
            log.error("SMS Sending Error: {}", e.getMessage());
        }
        return false;
    }

    private String getAccessToken() {
        String cachedToken = (String) redisTemplate.opsForValue().get(TOKEN_CACHE_KEY);
        return (cachedToken != null) ? cachedToken : fetchNewToken();
    }

    private String fetchNewToken() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "client_credentials");
        body.add("client_id", clientId);
        body.add("client_secret", clientSecret);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, headers);

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(authUrl, request, Map.class);

            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                String accessToken = (String) response.getBody().get("access_token");
                Number expiresIn = (Number) response.getBody().get("expires_in");

                redisTemplate.opsForValue().set(
                        TOKEN_CACHE_KEY,
                        accessToken,
                        expiresIn.longValue() - 60,
                        TimeUnit.SECONDS
                );

                return accessToken;
            }
        } catch (Exception e) {
            log.error("Token Fetch Error: {}", e.getMessage());
        }
        return "";
    }

    public String generateTempPassword() {
        String chars = "0123456789";
        SecureRandom random = new SecureRandom();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 6; i++) {
            sb.append(chars.charAt(random.nextInt(chars.length())));
        }
        return sb.toString();
    }

    // --- HELPER METHODS ---

    private Map<String, String> parsePlainData(String plainData) {
        Map<String, String> resultMap = new HashMap<>();
        if (plainData == null || plainData.isEmpty()) return resultMap;

        int i = 0;
        try {
            while (i < plainData.length()) {
                int colon1 = plainData.indexOf(":", i);
                if (colon1 == -1) break;
                int fNameLen = Integer.parseInt(plainData.substring(i, colon1));
                String fName = plainData.substring(colon1 + 1, colon1 + 1 + fNameLen);

                int nextI = colon1 + 1 + fNameLen;
                int colon2 = plainData.indexOf(":", nextI);
                if (colon2 == -1) break;
                int vLen = Integer.parseInt(plainData.substring(nextI, colon2));
                String vVal = plainData.substring(colon2 + 1, colon2 + 1 + vLen);

                resultMap.put(fName, vVal);
                i = colon2 + 1 + vLen;
            }
        } catch (Exception e) {
            log.error("Parse PlainData Error: {}", e.getMessage());
        }
        return resultMap;
    }

    private boolean isValidRequest(String requestID) {
        if (requestID == null || requestID.isEmpty()) return false;
        String key = REDIS_PREFIX + requestID;
        return Boolean.TRUE.equals(redisTemplate.delete(key));
    }
}