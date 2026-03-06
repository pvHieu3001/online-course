package online.course.market.service;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class GroqService {
    @Value("${groq.api.key}")
    private String apiKey;

    @Value("${groq.api.url}")
    private String apiUrl;

    @Value("${groq.api.model}")
    private String model;

    private final RestTemplate restTemplate = new RestTemplate();

    public String generateThreadsContent(String prompt) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(apiKey);

            // Cấu trúc body y hệt OpenAI
            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("model", model);
            requestBody.put("messages", List.of(
                    Map.of("role", "system", "content", "You are a content-writing bot. You ONLY return caption text, no explanations, and no quotation marks."),
                    Map.of("role", "user", "content", prompt)
            ));
            requestBody.put("temperature", 0.8); // Độ sáng tạo cao để tránh spam

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

            JsonNode response = restTemplate.postForObject(apiUrl, entity, JsonNode.class);

            return response.path("choices").get(0).path("message").path("content").asText();

        } catch (Exception e) {
            return "Lỗi gọi Groq: " + e.getMessage();
        }
    }
}
