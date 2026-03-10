package online.course.market.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.fasterxml.jackson.databind.JsonNode;
import com.microsoft.playwright.*;
import com.microsoft.playwright.options.WaitForSelectorState;
import com.microsoft.playwright.options.WaitUntilState;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import online.course.market.entity.dto.thread.ThreadsDownloadResult;
import online.course.market.entity.model.ThreadEntity;
import online.course.market.repository.ThreadRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriUtils;

import java.io.IOException;
import java.nio.file.Paths;
import java.util.*;

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

    public ThreadsDownloadResult downloadContent(String threadUrl) {
        // 1. Dùng try-with-resources cho Playwright để tự đóng tài nguyên
        try (Playwright playwright = Playwright.create()) {

            BrowserType.LaunchPersistentContextOptions options = new BrowserType.LaunchPersistentContextOptions()
                    .setHeadless(false) // Để false để tránh bị detect và dễ debug
                    .setArgs(Arrays.asList(
                            "--disable-blink-features=AutomationControlled",
                            "--no-sandbox"
                    ))
                    .setViewportSize(null) // Để null nếu dùng --start-maximized
                    .setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36");

            // 2. Launch Context (Lưu ý: PersistentContext không cần gọi browser.launch nữa)
            try (BrowserContext context = playwright.chromium().launchPersistentContext(
                    Paths.get("threads_profile"), options)) {

                // Chèn script giả lập trình duyệt thật
                context.addInitScript("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})");

                Page page = context.newPage();
                page.navigate(threadUrl);

                // 3. Đợi bài viết xuất hiện (Tăng timeout lên vì Threads load khá nặng)
                Locator mainArticle = page.locator("article").first();
                try {
                    mainArticle.waitFor(new Locator.WaitForOptions()
                            .setState(WaitForSelectorState.VISIBLE)
                            .setTimeout(15000));
                } catch (PlaywrightException e) {
                    System.err.println("Không tìm thấy bài viết. Có thể bị chặn hoặc link sai.");
                    return null;
                }

                // 4. Lấy Username (Threads thường để username trong thẻ <a> đầu tiên có text)
                // Dùng selector an toàn hơn thay vì chỉ tìm trong header
                String username = mainArticle.locator("a").first().innerText().trim();

                // 5. Lấy Text nội dung
                // Threads dùng các thẻ span hoặc div với dir="auto" cho nội dung bài viết
                String text = "";
                Locator textLocator = mainArticle.locator("div[dir='auto']").first();
                if (textLocator.count() > 0) {
                    text = textLocator.innerText();
                }

                // 6. Lấy Media (Ảnh/Video)
                List<String> mediaUrls = new ArrayList<>();
                // Chỉ lấy các ảnh thuộc nội dung bài viết, tránh avatar (thường nhỏ)
                Locator images = mainArticle.locator("img");
                for (int i = 0; i < images.count(); i++) {
                    String src = images.nth(i).getAttribute("src");
                    // Loại bỏ avatar bằng cách kiểm tra alt hoặc kích thước nếu cần
                    String alt = images.nth(i).getAttribute("alt");
                    if (src != null && (alt == null || !alt.contains("profile picture"))) {
                        if (!mediaUrls.contains(src)) mediaUrls.add(src);
                    }
                }

                return ThreadsDownloadResult.builder()
                        .text(text)
                        .username(username)
                        .mediaUrls(mediaUrls)
                        .build();
            }
        } catch (Exception e) {
            System.err.println("Lỗi hệ thống: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
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
