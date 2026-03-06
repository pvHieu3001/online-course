package online.course.market.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import online.course.market.entity.dto.thread.ThreadsDownloadResult;
import online.course.market.entity.model.ThreadEntity;
import online.course.market.repository.ThreadRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriUtils;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Random;

@Service
@Slf4j
@AllArgsConstructor
public class ThreadsService {
    private final RestTemplate restTemplate;
    private final Cloudinary cloudinary;
    private final ThreadRepository repository;

    private final String ACCESS_TOKEN = "";
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
        try {
            String postId = extractPostId(threadUrl);
            log.info("Đang xử lý bài đăng ID: {}", postId);

            String detailUrl = String.format("%s%s?fields=id,media_type,text,username,timestamp,children{id,media_type,media_url}&access_token=%s",
                    BASE_URL, postId, ACCESS_TOKEN);

            JsonNode root = restTemplate.getForObject(detailUrl, JsonNode.class);
            String mediaType = root.path("media_type").asText();

            List<String> mediaUrls = new ArrayList<>();

            if ("CAROUSEL".equals(mediaType)) {
                JsonNode children = root.path("children").path("data");
                for (JsonNode child : children) {
                    mediaUrls.add(getMediaUrlFromNode(child));
                }
            } else {
                String singleMediaUrl = String.format("%s%s?fields=media_url&access_token=%s", BASE_URL, postId, ACCESS_TOKEN);
                JsonNode singleRes = restTemplate.getForObject(singleMediaUrl, JsonNode.class);
                mediaUrls.add(singleRes.path("media_url").asText());
            }

            List<String> urls = uploadFilesToCloudinary(postId, mediaUrls);

            return ThreadsDownloadResult.builder()
                    .postId(postId)
                    .text(root.path("text").asText())
                    .username(root.path("username").asText())
                    .createdAt(root.path("timestamp").asText())
                    .mediaUrls(urls)
                    .build();

        } catch (Exception e) {
            log.error("Lỗi khi tải nội dung Threads: {}", e.getMessage());
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
