package online.course.market.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import online.course.market.entity.dto.affiliate.link.AffiliateLinkPostRequest;
import online.course.market.entity.dto.affiliate.link.AffiliateLinkPutRequest;
import online.course.market.entity.dto.amazon.AmazonPostRequest;
import online.course.market.entity.dto.amazon.AmazonPutRequest;
import online.course.market.entity.model.AffiliateLink;
import online.course.market.entity.model.MediaEntity;
import online.course.market.entity.model.PostEntity;
import online.course.market.entity.model.UserModel;
import online.course.market.framework.exception.CJNotFoundException;
import online.course.market.repository.MediaRepository;
import online.course.market.repository.PostRepository;
import online.course.market.utils.CustomCodeException;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.*;

@Service
@Slf4j
@AllArgsConstructor
public class ThreadsService {
    private final RestTemplate restTemplate;
    private final Cloudinary cloudinary;
    private final MediaRepository mediaRepository;
    private final PostRepository postRepository;
    private final GroqService groqService;
    private final UserService userService;


    public void publishPost(Long id, UserModel account) {
        Optional<PostEntity> postOpt = postRepository.findById(id);

        if (postOpt.isPresent()) {
            PostEntity post = postOpt.get();
            try {
                String videoUrl = post.getMedias().get(0).getCloudinaryUrl();
                String imageUrl = (post.getMedias().size() >= 2) ? post.getMedias().get(1).getCloudinaryUrl() : null;

                postToThreads(post.getCaption(), imageUrl, videoUrl, post.getAmzUrl(), post, account.getThreadToken(), account.getThreadId());
                log.info("Account {} đã đăng bài ID {} thành công sau thời gian chờ.", account.getId(), post.getId());

            } catch (Exception e) {
                log.error("Lỗi khi đăng bài cho Account {}: {}", account.getId(), e.getMessage());
            }
        }
    }

    public List<PostEntity> getPostsByUser(String currentUsername, String search) {
        UserModel userModel = userService.getByUserName(currentUsername);
        return postRepository.findAllByThreadIdAndCaption(userModel.getThreadId(), search);
    }

    public PostEntity getPostById(Long id) {
        return postRepository.findById(id)
                .orElseThrow(() -> new CJNotFoundException(CustomCodeException.CODE_400, "Bài viết không tồn tại"));
    }

    public PostEntity updatePost(Long id, AmazonPutRequest request) {
        PostEntity post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bài viết không tồn tại"));
        post.setCaption(request.getCaption());
        post.setAmzUrl(request.getAmzUrl());
        return postRepository.save(post);
    }

    public void deleteById(Long id) {
        PostEntity postEntity = postRepository.findById(id).orElseThrow(() -> new RuntimeException("Bài viết không tồn tại"));
        postRepository.delete(postEntity);
    }

    public void postToThreads(String text, String imageUrl, String videoUrl, String amzUrl, PostEntity post, String accessToken, String userId) {
        try {
            post.setStatus("PROCESSING");
            postRepository.save(post);

            String containerId;

            if (imageUrl != null && !imageUrl.isBlank()) {
                log.info("Bắt đầu tạo Carousel cho bài viết ID: {}", post.getId());

                String photoId = createMediaContainer(userId, "IMAGE", imageUrl, true, accessToken);
                String videoId = createMediaContainer(userId, "VIDEO", videoUrl, true, accessToken);

                if (!waitForMediaReady(photoId, accessToken) || !waitForMediaReady(videoId, accessToken)) {
                    throw new RuntimeException("Media (Image/Video) không sẵn sàng sau thời gian chờ.");
                }

                List<String> childrenIds = Arrays.asList(videoId, photoId);
                containerId = createCarouselWithRetry(userId, text, childrenIds, accessToken);
            } else {
                log.info("Bắt đầu tạo Single Video Post cho bài viết ID: {}", post.getId());
                containerId = createMediaContainerWithText(userId, "VIDEO", videoUrl, text, accessToken);
                if (!waitForMediaReady(containerId, accessToken)) {
                    throw new RuntimeException("Video đơn lẻ không sẵn sàng sau thời gian chờ.");
                }
            }

            String postId = publishWithRetry(userId, containerId, accessToken);
            log.info("--- ĐÃ ĐĂNG BÀI THÀNH CÔNG! ID: {} ---", postId);

            if (amzUrl != null && !amzUrl.trim().isEmpty()) {
                String comment = generateRandomComment(amzUrl);
                publishComment(userId, postId, comment, accessToken);
            } else {
                log.warn("Bỏ qua đăng comment vì amzUrl bị null hoặc rỗng. PostId: {}", postId);
            }

            post.setStatus("SUCCESS");
            post.setIsPublished(true);
            post.setPublishedAt(LocalDateTime.now());
            postRepository.save(post);

        } catch (Exception e) {
            post.setStatus("FAILED");
            post.setLastError(e.getMessage());
            post.setRetryCount(post.getRetryCount() + 1);
            postRepository.save(post);
            log.error("Thất bại khi đăng bài ID {}: {}", post.getId(), e.getMessage());
        }
    }

    private String createCarouselWithRetry(String userId, String text, List<String> children, String accessToken) throws InterruptedException {
        for (int i = 0; i < 5; i++) {
            try {
                return createCarouselContainer(userId, text, children, accessToken);
            } catch (HttpClientErrorException.BadRequest e) {
                if (e.getResponseBodyAsString().contains("4279009")) {
                    log.warn("Meta chưa đồng bộ ID con (Lần {}), đợi 5s...", i + 1);
                    Thread.sleep(5000);
                } else throw e;
            }
        }
        throw new RuntimeException("Lỗi 4279009 kéo dài quá lâu.");
    }

    private String publishWithRetry(String userId, String creationId, String accessToken) throws InterruptedException {
        int maxRetries = 3;
        for (int i = 0; i < maxRetries; i++) {
            try {
                return publishContainer(userId, creationId, accessToken);
            } catch (HttpClientErrorException.BadRequest e) {
                log.warn("Lệnh Publish chưa nhận được ID, thử lại sau 3s...");
                Thread.sleep(3000);
            }
        }
        throw new RuntimeException("Không thể Publish bài viết.");
    }

    private String createCarouselContainer(String userId, String text, List<String> children, String accessToken) {
        String url = String.format("https://graph.threads.net/v1.0/%s/threads", userId);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("media_type", "CAROUSEL");
        params.add("children", String.join(",", children));
        params.add("text", text);
        params.add("access_token", accessToken);
        try {
            JsonNode response = restTemplate.postForObject(url, params, JsonNode.class);
            return response.get("id").asText();
        } catch (Exception e) {
            log.error("Lỗi gọi API Threads tạo Multi Media Container: {}", e.getMessage());
            throw e;
        }
    }

    private String createMediaContainerWithText(String userId, String mediaType, String mediaUrl, String caption, String accessToken) {
        String url = "https://graph.threads.net/v1.0/" + userId + "/threads";

        String finalCaption = (caption == null || caption.trim().isEmpty()) ? "No caption" : caption;
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("media_type", mediaType);

        if ("VIDEO".equalsIgnoreCase(mediaType)) {
            body.add("video_url", mediaUrl);
        } else {
            body.add("image_url", mediaUrl);
        }
        body.add("text", finalCaption);
        body.add("caption", finalCaption);
        body.add("access_token", accessToken);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.setAcceptCharset(Collections.singletonList(StandardCharsets.UTF_8));

        HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(body, headers);

        try {
            log.info("Đang tạo container cho User ID: {} với caption: {}", userId, finalCaption);
            ResponseEntity<Map> response = restTemplate.postForEntity(url, entity, Map.class);

            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                return (String) response.getBody().get("id");
            } else {
                log.error("Threads API trả về lỗi: {}", response.getBody());
                throw new RuntimeException("Lỗi tạo container: " + response.getBody());
            }
        } catch (Exception e) {
            log.error("Lỗi gọi API Threads tạo Single Media Container: {}", e.getMessage());
            throw e;
        }
    }

    private String createMediaContainer(String userId, String type, String mediaUrl, boolean isCarouselItem, String accessToken) {
        String url = String.format("https://graph.threads.net/v1.0/%s/threads", userId);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("media_type", type);
        params.add(type.equals("VIDEO") ? "video_url" : "image_url", mediaUrl);
        params.add("access_token", accessToken);
        if (isCarouselItem) {
            params.add("is_carousel_item", "true");
        }

        JsonNode response = restTemplate.postForObject(url, params, JsonNode.class);
        String id = response.get("id").asText();
        log.info("Container {} tạo thành công: {}", type, id);
        return id;
    }

    private boolean waitForMediaReady(String containerId, String accessToken) {
        int attempts = 0;
        while (attempts < 12) {
            try {
                String statusUrl = String.format("https://graph.threads.net/v1.0/%s?fields=status,id&access_token=%s",
                        containerId, accessToken);

                ResponseEntity<JsonNode> response = restTemplate.getForEntity(statusUrl, JsonNode.class);

                if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                    String status = response.getBody().path("status").asText();
                    if ("FINISHED".equals(status)) {
                        Thread.sleep(2000);
                        return true;
                    }
                    if ("ERROR".equals(status)) return false;
                }
            } catch (Exception e) {
                log.warn("ID {} chưa sẵn sàng trên hệ thống, đang thử lại...", containerId);
            }

            try {
                Thread.sleep(10000 + new Random().nextInt(5000));
            } catch (InterruptedException ie) {
                Thread.currentThread().interrupt();
            }
            attempts++;
        }
        return false;
    }

    private String publishContainer(String userId, String creationId, String accessToken) {
        String url = String.format("https://graph.threads.net/v1.0/%s/threads_publish", userId);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("creation_id", creationId);
        params.add("access_token", accessToken);

        JsonNode response = restTemplate.postForObject(url, params, JsonNode.class);
        return response.get("id").asText();
    }



    private void publishComment(String userId, String postId, String commentText, String accessToken) {

        try {
            String url = String.format("https://graph.threads.net/v1.0/%s/threads", userId);

            MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
            params.add("media_type", "TEXT");
            params.add("text", commentText);
            params.add("reply_to_id", postId);
            params.add("access_token", accessToken);

            JsonNode response = restTemplate.postForObject(url, params, JsonNode.class);
            String commentContainerId = response.get("id").asText();
            log.info("Đã tạo container comment: {}", commentContainerId);

            boolean published = false;
            for (int i = 0; i < 5; i++) {
                try {
                    Thread.sleep(3000 + (i * 2000));

                    String publishUrl = String.format("https://graph.threads.net/v1.0/%s/threads_publish", userId);
                    MultiValueMap<String, String> publishParams = new LinkedMultiValueMap<>();
                    publishParams.add("creation_id", commentContainerId);
                    publishParams.add("access_token", accessToken);

                    restTemplate.postForObject(publishUrl, publishParams, String.class);
                    published = true;
                    log.info("Đã gắn link dưới comment thành công!");
                    break;
                } catch (HttpClientErrorException.BadRequest e) {
                    if (e.getResponseBodyAsString().contains("4279009")) {
                        log.warn("Comment ID chưa sẵn sàng, đang thử lại lần {}...", i + 1);
                    } else {
                        throw e;
                    }
                }
            }

            if (!published) {
                log.error("Không thể publish comment sau nhiều lần thử.");
            }

        } catch (Exception e) {
            log.error("Lỗi khi thực hiện comment: {}", e.getMessage());
        }

    }

    public String generateRandomComment(String amzLink) {
        String[] templates = {
                "Check out the product here:: %s 🚀 -- Affiliate link",
                "Found this on Amazon, highly recommend! %s ✨ -- Affiliate link",
                "Grab yours here before it's gone: %s 📌 -- Affiliate link",
                "Full details and price here: %s 💡 -- Affiliate link",
                "Best deal I've found today: %s 🔥 -- Affiliate link"
        };

        int randomIndex = new Random().nextInt(templates.length);
        return String.format(templates[randomIndex], amzLink);
    }

    @Transactional
    public void downloadAndUpload(AmazonPostRequest amazonPostRequest, String threadId) {
        String apiUrl = "https://savethr.com/process";

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
            headers.add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36");

            MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
            map.add("id", amazonPostRequest.getSourceUrl());
            map.add("locale", "en");

            HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);

            ResponseEntity<String> response = restTemplate.postForEntity(apiUrl, request, String.class);

            if (response.getStatusCode() == HttpStatus.OK) {
                parseAndUpload(response.getBody(), amazonPostRequest, threadId);
            }

        } catch (Exception e) {
            System.err.println("Lỗi khi call API savethr: " + e.getMessage());
        }
    }

    private void parseAndUpload(String html, AmazonPostRequest amazonPostRequest, String threadId) {

        Document doc = Jsoup.parse(html);
        Elements links = doc.select("a.download_link");

        String rawContent = (amazonPostRequest.getCaption() != null && !amazonPostRequest.getCaption().isEmpty())
                ? amazonPostRequest.getCaption()
                : doc.select("p.text-sm.text-gray-700.leading-relaxed").text();

        String finalThreadsCaption = "";
        if (!rawContent.isEmpty()) {
            String prompt = "Act as a Threads expert. Turn this into a relatable hot take or a question: \"" + rawContent + "\". " +
                    "Keep it friendly but provocative. Return ONLY the caption text. Language: English.";
            String aiResponse = groqService.generateThreadsContent(prompt);
            finalThreadsCaption = aiResponse.trim().replaceAll("^\"|\"$", "");
        }

        PostEntity post = new PostEntity();
        post.setCaption(finalThreadsCaption);
        post.setSourceUrl(amazonPostRequest.getSourceUrl());
        post.setAmzUrl(amazonPostRequest.getAmzUrl());
        post.setIsPublished(false);
        post.setThreadId(threadId);
        post = postRepository.save(post);

        List<MediaEntity> mediaList = new ArrayList<>();

        for (int i = 0; i < links.size(); i++) {
            Element link = links.get(i);
            String originalUrl = link.attr("href");

            // 1. Bỏ qua MP3
            if (originalUrl.contains(".mp3") || link.hasClass("download_mp3")) {
                continue;
            }

            String resourceType;
            if (i == 0) {
                resourceType = "video";
            } else {
                resourceType = originalUrl.contains(".mp4") ? "video" : "image";
            }

            try {
                String customPublicId = "thread_" + post.getId() + "_" + System.currentTimeMillis();
                Map uploadResult = cloudinary.uploader().upload(originalUrl,
                        ObjectUtils.asMap(
                                "resource_type", resourceType,
                                "folder", "threads_clones",
                                "public_id", customPublicId,
                                "overwrite", true
                        ));
                String secureUrl = (String) uploadResult.get("secure_url");

                MediaEntity media = MediaEntity.builder()
                        .post(post)
                        .cloudinaryUrl(secureUrl)
                        .mediaType(resourceType.toUpperCase())
                        .build();

                mediaList.add(media);

            } catch (Exception e) {
                log.error("Lỗi upload file thứ {}: {}", i, e.getMessage());
            }
        }
        mediaRepository.saveAll(mediaList);
    }
}
