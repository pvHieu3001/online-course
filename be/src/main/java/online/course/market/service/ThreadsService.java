package online.course.market.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import online.course.market.entity.dto.thread.ThreadsDownloadResult;
import online.course.market.entity.model.ThreadEntity;
import online.course.market.repository.ThreadRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriUtils;

import java.io.IOException;
import java.nio.file.Paths;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@Slf4j
@AllArgsConstructor
public class ThreadsService {
    private final RestTemplate restTemplate;
    private final Cloudinary cloudinary;
    private final ThreadRepository repository;

    private final String ACCESS_TOKEN = "THAAU0ibZCp5lBBUVRLMnlGVGI2b1ZARMjktMXJYOFV2UXNGU0RrVlVQSFNUUWlnTHNlRDVoaUloN3AxVnhuTm9NeU9oQnBGMEJWOGFqM3VxYXZAhWDdpMWRsc0JvSFB1X2EyWkpEU0ktcjRmMko3ZAElCODhhR2dxNmFGVFpqdkFScm9kcjcwZA2NnOTUzYk9IcDgZD";
    private final String BASE_URL = "https://graph.threads.net/";


    public ThreadEntity create(String urlPost, String urlAmz, String cap) {
        ThreadEntity entity = new ThreadEntity();
        entity.setUrlPost(urlPost);
        entity.setUrlAmz(urlAmz);
        entity.setCap(cap);
        entity.setIsPublished(false);
        return repository.save(entity);
    }

    public void postToThreads(String text, String imageUrl, String videoUrl, String linkComment) {
        try {
            String photoItemUrl = String.format("%s/threads?media_type=IMAGE&image_url=%s&is_carousel_item=true&access_token=%s",
                    BASE_URL, imageUrl, ACCESS_TOKEN);
            String photoId = restTemplate.postForObject(photoItemUrl, null, JsonNode.class).get("id").asText();

            String videoItemUrl = String.format("%s/threads?media_type=VIDEO&video_url=%s&is_carousel_item=true&access_token=%s",
                    BASE_URL, videoUrl, ACCESS_TOKEN);
            String videoId = restTemplate.postForObject(videoItemUrl, null, JsonNode.class).get("id").asText();

            String children = photoId + "," + videoId;
            String carouselUrl = String.format("%s/threads?media_type=CAROUSEL&children=%s&text=%s&access_token=%s",
                    BASE_URL, children, UriUtils.encode(text, "UTF-8"), ACCESS_TOKEN);
            String carouselContainerId = restTemplate.postForObject(carouselUrl, null, JsonNode.class).get("id").asText();

            String publishUrl = String.format("https://graph.threads.net/threads_publish?creation_id=%s&access_token=%s",
                    carouselContainerId, ACCESS_TOKEN);
            String postId = restTemplate.postForObject(publishUrl, null, JsonNode.class).get("id").asText();
            log.info("Bài viết đã lên sóng! ID: {}", postId);

            Thread.sleep(5000);
            String commentText = generateRandomComment(linkComment);
            String commentUrl = String.format("%s/threads?media_type=TEXT&text=%s&reply_to_id=%s&access_token=%s",
                    BASE_URL, UriUtils.encode(commentText, "UTF-8"), postId, ACCESS_TOKEN);
            String commentContainerId = restTemplate.postForObject(commentUrl, null, JsonNode.class).get("id").asText();

            restTemplate.postForObject("https://graph.threads.net/threads_publish?creation_id=" + commentContainerId + "&access_token=" + ACCESS_TOKEN, null, String.class);
            log.info("Đã gắn link dưới comment!");

        } catch (Exception e) {
            log.error("Lỗi đăng bài phức hợp: {}", e.getMessage());
        }
    }

    public String generateRandomComment(String amzLink) {
        String[] templates = {
                "Check it out here: %s 🚀",
                "Found this on Amazon, highly recommend! %s ✨",
                "Grab yours here before it's gone: %s 📌",
                "Full details and price here: %s 💡",
                "Best deal I've found today: %s 🔥"
        };

        int randomIndex = new Random().nextInt(templates.length);
        return String.format(templates[randomIndex], amzLink);
    }

    private final OkHttpClient client = new OkHttpClient();
    private final ObjectMapper mapper = new ObjectMapper();

    // Header quan trọng để Threads không chặn bạn
    private static final String USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";
    private static final String THREADS_APP_ID = "2382805111822166";

    public void downloadContent(String url) {
        Request request = new Request.Builder()
                .url(url)
                .header("User-Agent", USER_AGENT)
                .header("x-ig-app-id", THREADS_APP_ID) // Trick: Giả lập app web Threads
                .header("Sec-Fetch-Dest", "document")
                .header("Sec-Fetch-Mode", "navigate")
                .build();

        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) throw new IOException("Lỗi kết nối: " + response);

            String html = response.body().string();

            // 1. Tìm đoạn JSON chứa dữ liệu bài viết (thường nằm trong script chứa "all_items")
            String jsonString = extractJsonFromHtml(html);

            if (jsonString != null) {
                parseAndPrintData(jsonString);
            } else {
                System.out.println("Không tìm thấy dữ liệu bài viết. Có thể bài đăng riêng tư hoặc link sai.");
            }

        } catch (Exception e) {
            System.err.println("Lỗi cào dữ liệu: " + e.getMessage());
        }
    }

    private String extractJsonFromHtml(String html) {
        // Regex tìm đoạn JSON nhúng trong HTML của Threads
        // Thường bắt đầu bằng {"require":[["ScheduledServerJS"...
        Pattern pattern = Pattern.compile("id=\"__eqmc\"[^>]*>\\s*(.*?)\\s*</script>");
        // Nếu không tìm thấy bằng ID trên, dùng regex rộng hơn cho các script JSON
        Matcher matcher = pattern.matcher(html);
        if (matcher.find()) {
            return matcher.group(1);
        }

        // Backup: Tìm đoạn chứa thông tin media trực tiếp
        if (html.contains("video_versions")) {
            // Kỹ thuật cắt chuỗi thủ công nếu Regex phức tạp
            int start = html.indexOf("{\"video_versions\"");
            if (start != -1) {
                int end = html.indexOf("}]}", start) + 3;
                return html.substring(start, end);
            }
        }
        return null;
    }

    private void parseAndPrintData(String jsonString) {
        try {
            JsonNode root = mapper.readTree(jsonString);

            // Tìm đến node chứa media (Cấu trúc Threads cực kỳ sâu và lồng nhau)
            // Lưu ý: Cấu trúc JSON của Meta thay đổi liên tục, đây là các field chính:

            // 1. Lấy Caption (Nội dung chữ)
            String caption = root.findPath("caption").findPath("text").asText();
            System.out.println("Nội dung: " + caption);

            // 2. Lấy Video (Nếu có)
            JsonNode videoVersions = root.findPath("video_versions");
            if (!videoVersions.isMissingNode() && videoVersions.isArray()) {
                // Phần tử đầu tiên luôn có chất lượng cao nhất
                String videoUrl = videoVersions.get(0).path("url").asText();
                System.out.println("Link Video HD: " + videoUrl);
            }

            // 3. Lấy Ảnh (Nếu có)
            JsonNode imageVersions = root.findPath("image_versions2").path("candidates");
            if (!imageVersions.isMissingNode() && imageVersions.isArray()) {
                String imageUrl = imageVersions.get(0).path("url").asText();
                System.out.println("Link Ảnh HD: " + imageUrl);
            }

            // 4. Lấy Username
            String username = root.findPath("user").path("username").asText();
            System.out.println("Người đăng: @" + username);

        } catch (Exception e) {
            System.err.println("Lỗi khi Parse JSON: " + e.getMessage());
        }
    }

    public static void main(String[] args) {
        ThreadsDownloader dl = new ThreadsDownloader();
        // Thay bằng link thực tế bạn muốn test
        dl.downloadContent("https://www.threads.net/@cristiano/post/C4X9_...");
    }



    private String getMediaUrlFromNode(JsonNode node) {
        return node.path("media_url").asText();
    }

    private String extractPostId(String url) {
        return url.split("/post/")[1].split("/")[0].split("\\?")[0];
    }


    private List<String> uploadFilesToCloudinary(String postId, List<String> urls) {
        List<String> uploadedUrls = new ArrayList<>();

        for (int i = 0; i < urls.size(); i++) {
            String fileUrl = urls.get(i);
            String resourceType = fileUrl.contains(".mp4") ? "video" : "image";

            try {
                Map uploadResult = cloudinary.uploader().upload(fileUrl, ObjectUtils.asMap(
                        "public_id", postId + "_media_" + (i + 1),
                        "resource_type", resourceType,
                        "folder", "threads_clone/" + postId
                ));

                String newUrl = uploadResult.get("secure_url").toString();
                uploadedUrls.add(newUrl);
                log.info("Đã upload lên Cloudinary: {}", newUrl);

            } catch (IOException e) {
                log.error("Lỗi upload file thứ {} lên Cloudinary: {}", i, e.getMessage());
            }
        }
        return uploadedUrls;
    }
}
