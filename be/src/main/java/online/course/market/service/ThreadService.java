package online.course.market.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import online.course.market.entity.dto.amazon.AmazonPostRequest;
import online.course.market.entity.dto.amazon.AmazonPutRequest;
import online.course.market.entity.model.MediaEntity;
import online.course.market.entity.model.PostEntity;
import online.course.market.entity.model.ThreadAccount;
import online.course.market.framework.exception.CJNotFoundException;
import online.course.market.repository.MediaRepository;
import online.course.market.repository.PostRepository;
import online.course.market.repository.ThreadAccountRepository;
import online.course.market.utils.CustomCodeException;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.*;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
@Slf4j
@AllArgsConstructor
public class ThreadService {
    private final RestTemplate restTemplate;
    private final Cloudinary cloudinary;
    private final MediaRepository mediaRepository;
    private final PostRepository postRepository;
    private final GroqService groqService;
    private final UserService userService;
    private final ThreadAccountRepository threadAccountRepository;

    @Async
    public void publishPost(Long id, ThreadAccount threadAccount, Boolean isCaptionLink) {
        Optional<PostEntity> postOpt = postRepository.findPostWithMediasById(id);

        if (postOpt.isPresent()) {
            PostEntity post = postOpt.get();
            try {
                List<String> videoUrls = List.of();
                List<String> imageUrls = List.of();

                if (post.getMedias() != null && !post.getMedias().isEmpty()) {
                    Map<String, List<String>> mediaMap = post.getMedias().stream()
                            .filter(m -> m.getCloudinaryUrl() != null)
                            .collect(Collectors.groupingBy(
                                    MediaEntity::getMediaType,
                                    Collectors.mapping(MediaEntity::getCloudinaryUrl, Collectors.toList())
                            ));

                    videoUrls = mediaMap.getOrDefault("VIDEO", List.of());
                    imageUrls = mediaMap.getOrDefault("IMAGE", List.of());
                }

                if (post.getCaption() == null || (imageUrls.isEmpty() && videoUrls.isEmpty())) {
                    handleFailedPost(post, "Post nội dung trống");
                    return;
                }


                String finalCaption = post.getCaption();
                String finalLink = post.getAmzUrl();

                if (!isCaptionLink && Boolean.TRUE.equals(post.getIsCaptionLink())) {
                    String extracted = extractLink(post.getCaption());
                    if (extracted != null && !extracted.isEmpty()) {
                        finalLink = extracted;
                    }
                    finalCaption = cleanCaption(post.getCaption());
                }

                postToThreads(
                        reCreateCap(finalCaption),
                        imageUrls,
                        videoUrls,
                        finalLink,
                        post,
                        threadAccount.getThreadToken(),
                        threadAccount.getThreadId(),
                        threadAccount.getAccountName()
                );


                log.info("Account {} đã xử lý bài bài ID {}.", threadAccount.getId(), post.getId());
            } catch (Exception e) {
                log.error("Lỗi hệ thống khi xử lý bài ID {} cho Account {}: {}", post.getId(), threadAccount.getId(), e.getMessage());
            }
        }
    }

    public Page<PostEntity> getPostsByUser(String search, String status, Boolean isCaptionLink, Boolean hasLink, Integer page, Integer size) {
        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by("published_at").descending().and(Sort.by("id").descending())
        );
        return postRepository.getPagePosts(search, status, isCaptionLink, hasLink, pageable);
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

    public void postToThreads(String text, List<String> imageUrls, List<String> videoUrls, String amzUrl, PostEntity post, String accessToken, String threadId, String accountName) {
        try {
            post.setStatus("PROCESSING");
            postRepository.save(post);

            String containerId;
            List<String> childrenIds = new ArrayList<>();

            if (videoUrls != null) {
                for (String url : videoUrls) {
                    childrenIds.add(createMediaContainer(threadId, "VIDEO", url, true, accessToken));
                }
            }
            if (imageUrls != null) {
                for (String url : imageUrls) {
                    childrenIds.add(createMediaContainer(threadId, "IMAGE", url, true, accessToken));
                }
            }

            if (childrenIds.size() > 1) {
                log.info("Bắt đầu tạo Carousel cho bài viết ID: {}", post.getId());
//                for (String childId : childrenIds) {
//                    boolean isReady = waitForMediaReady(childId, accessToken);
//                    if (!isReady) {
//                        throw new RuntimeException("Media con " + childId + " không sẵn sàng (ERROR hoặc Timeout)");
//                    }
//                }
                try {
                    log.info("Đang đợi 2p trước khi tạo Carousel");
                    Thread.sleep(120000);
                } catch (InterruptedException ie) {
                    Thread.currentThread().interrupt();
                    return;
                }
                containerId = createCarouselWithRetry(threadId, text, childrenIds, accessToken);
            } else if (childrenIds.size() == 1) {
                log.info("Bắt đầu tạo Single Post cho bài viết ID: {}", post.getId());
                String singleMediaUrl = (videoUrls != null && !videoUrls.isEmpty()) ? videoUrls.get(0) : imageUrls.get(0);
                String type = (videoUrls != null && !videoUrls.isEmpty()) ? "VIDEO" : "IMAGE";

                containerId = createMediaContainerWithText(threadId, type, singleMediaUrl, text, accessToken);
            } else {
                log.info("Bắt đầu tạo Text-only Post cho bài viết ID: {}", post.getId());
                containerId = createTextContainer(threadId, text, accessToken);
            }

//            if (!waitForMediaReady(containerId, accessToken)) {
//                throw new RuntimeException("Container chính không sẵn sàng để publish.");
//            }

            try {
                log.info("Đang đợi 2p trước khi tạo publish bài viết");
                Thread.sleep(120000);
            } catch (InterruptedException ie) {
                Thread.currentThread().interrupt();
                return;
            }

            String postId = publishWithRetry(threadId, containerId, accessToken);
            log.info("--- ĐÃ ĐĂNG BÀI THÀNH CÔNG! ID: {} ---", postId);

            if (amzUrl != null && !amzUrl.trim().isEmpty()) {
                log.info("Đợi 30s trước khi chèn link comment...");
                Thread.sleep(15000);
                String comment = generateRandomComment(amzUrl);
                publishComment(threadId, postId, comment, accessToken);
            }

            post.setStatus("SUCCESS");
            post.setIsPublished(true);
            post.setPublishedAt(LocalDateTime.now());
            post.setAccountThread(accountName);
            postRepository.save(post);

        } catch (Exception e) {
            DateTimeFormatter dtf = DateTimeFormatter.ofPattern("dd/MM HH:mm");
            String timestamp = dtf.format(LocalDateTime.now());
            post.setLastError(String.format("[%s] %s", timestamp, e.getMessage()));
            post.setStatus("FAILED");
            post.setRetryCount(post.getRetryCount() + 1);
            postRepository.save(post);
            log.error("Thất bại khi đăng bài ID {}: {}", post.getId(), e.getMessage());
        }
    }

    private String createCarouselWithRetry(String userId, String text, List<String> children, String accessToken) throws InterruptedException {
        int maxRetries = 5;
        long waitTime = 20000;

        for (int i = 0; i < maxRetries; i++) {
            try {
                return createCarouselContainer(userId, text, children, accessToken);
            } catch (HttpClientErrorException.BadRequest e) {
                String errorBody = e.getResponseBodyAsString();

                if (errorBody.contains("\"code\": 17") || errorBody.contains("\"code\": 32")) {
                    log.error("🛑 CHẠM RATE LIMIT! Ngừng gọi API để bảo vệ App. Body: {}", errorBody);
                    throw new RuntimeException("Rate limit reached");
                }
                if (errorBody.contains("4279009")) {
                    log.warn("⏳ ID con chưa đồng bộ (Lần {}/{}). Đợi {}s rồi thử lại...",
                            i + 1, maxRetries, waitTime / 1000);
                    Thread.sleep(waitTime);
                    waitTime = Math.min(waitTime + 10000, 40000);
                } else {
                    log.error("❌ Lỗi BadRequest không thể retry: {}", errorBody);
                    throw e;
                }
            }
        }
        throw new RuntimeException("Tạo Carousel thất bại: Lỗi đồng bộ ID con (4279009) kéo dài quá " + (waitTime * maxRetries / 1000) + "s");
    }

    private String publishWithRetry(String userId, String creationId, String accessToken) throws InterruptedException {
        int maxRetries = 3;
        long retryDelay = 20000;

        for (int i = 0; i < maxRetries; i++) {
            try {
                return publishContainer(userId, creationId, accessToken);
            } catch (HttpClientErrorException.BadRequest e) {
                String errorBody = e.getResponseBodyAsString();
                if (errorBody.contains("\"code\": 17") || errorBody.contains("\"code\": 32")) {
                    log.error("🛑 CHẠM RATE LIMIT META! Dừng toàn bộ tiến trình. Chi tiết: {}", errorBody);
                    throw new RuntimeException("Rate limit reached - Stop all activities");
                }

                if (errorBody.contains("\"code\": 368")) {
                    log.error("❌ Nội dung bị Meta đánh dấu SPAM/Vi phạm chính sách. Không retry bài này.");
                    throw new RuntimeException("Content blocked by Meta spam filter");
                }

                log.warn("⚠️ Lần {}: Container {} chưa sẵn sàng để Publish. Thử lại sau {}s...",
                        i + 1, creationId, retryDelay / 1000);

                Thread.sleep(retryDelay);
                retryDelay += 5000;
            } catch (Exception e) {
                log.error("💥 Lỗi không xác định khi Publish: {}", e.getMessage());
                throw e;
            }
        }
        throw new RuntimeException("Không thể Publish bài viết sau " + maxRetries + " lần thử.");
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

    private String createTextContainer(String userId, String text, String accessToken) {
        String url = "https://graph.threads.net/v1.0/" + userId + "/threads";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> body = new HashMap<>();
        body.put("text", text);
        body.put("media_type", "TEXT");
        body.put("access_token", accessToken);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(url, entity, Map.class);
            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                return (String) response.getBody().get("id");
            } else {
                throw new RuntimeException("Lỗi khi tạo Text Container: " + response.getBody());
            }
        } catch (Exception e) {
            log.error("Không thể kết nối đến Threads API để tạo Text Container: {}", e.getMessage());
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
        long waitTime = 60000;

        while (attempts < 5) {
            try {
                log.info("Đang đợi {} giây trước khi kiểm tra trạng thái ID: {} (Lần {})", waitTime / 1000, containerId, attempts + 1);
                Thread.sleep(waitTime);
            } catch (InterruptedException ie) {
                Thread.currentThread().interrupt();
                return false;
            }

            try {
                String statusUrl = String.format("https://graph.threads.net/v1.0/%s?fields=status,id&access_token=%s",
                        containerId, accessToken);

                ResponseEntity<JsonNode> response = restTemplate.getForEntity(statusUrl, JsonNode.class);

                if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                    String status = response.getBody().path("status").asText();

                    if ("FINISHED".equals(status)) {
                        log.info("✅ ID {} đã sẵn sàng (FINISHED).", containerId);
                        return true;
                    }

                    if ("ERROR".equals(status)) {
                        log.error("❌ ID {} bị lỗi xử lý trên Threads Server.", containerId);
                        return false;
                    }

                    log.info("⏳ ID {} vẫn đang xử lý (IN_PROGRESS)...", containerId);
                }
            } catch (Exception e) {
                log.warn("⚠️ Không thể kết nối API để check status ID {}. Có thể do nghẽn mạng.", containerId);
            }

            attempts++;
            waitTime = 20000;
        }

        log.error("Timeout: ID {} không hoàn thành sau nhiều lần đợi.", containerId);
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
                    Thread.sleep(20000 + (i * 2000));

                    String publishUrl = String.format("https://graph.threads.net/v1.0/%s/threads_publish", userId);
                    MultiValueMap<String, String> publishParams = new LinkedMultiValueMap<>();
                    publishParams.add("creation_id", commentContainerId);
                    publishParams.add("access_token", accessToken);

                    restTemplate.postForObject(publishUrl, publishParams, String.class);
                    published = true;
                    log.info("Đã gắn link dưới comment thành công!");
                    break;
                } catch (HttpClientErrorException.BadRequest e) {
                    String errorBody = e.getResponseBodyAsString();
                    if (errorBody.contains("\"code\": 17") || errorBody.contains("\"code\": 32")) {
                        log.error("CHẠM RATE LIMIT! Dừng đăng bài trong 1 giờ.");
                        throw new RuntimeException("Rate limit reached");
                    }
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
                "Found that viral item everyone’s talking about. Quality is actually 10/10: %s 🔥",
                "Just a little something to upgrade your daily routine. Link for those asking: %s 📌",
                "I don't usually post deals, but this price is too good to ignore right now: %s 🚀",
                "Lowest price I've seen. Don't miss out: %s 📉🔥",
                "Price drop! Grab it before it bounces back: %s 💸⚡",
                "Flash deal! These are selling fast: %s 🏃‍♂️💨",
                "Almost gone. Get yours while it's in stock: %s 🛒⏳",
                "Absolute steal at this price. Link here: %s 😱💎",
                "This deal is too good to pass up: %s 🛑✨",
                "Limited time offer. Check it out now: %s 🚀📌",
                "Final call for this discount! Link: %s 📣🔥",
                "Lowest price in 30 days. Buy it here: %s ⏳✨"
        };

        int randomIndex = new Random().nextInt(templates.length);
        return String.format(templates[randomIndex], amzLink);
    }

    public String resolveAmazonLink(String shortUrl) {
        try {
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = restTemplate.headForHeaders(shortUrl);
            String longUrl = Objects.requireNonNull(headers.getLocation()).toString();

            Pattern pattern = Pattern.compile("/(?:dp|gp/product)/([A-Z0-9]{10})");
            Matcher matcher = pattern.matcher(longUrl);
            if (matcher.find()) {
                return "https://www.amazon.com/dp/" + matcher.group(1) + "?tag=khairul280203-20";
            }
            return longUrl;
        } catch (Exception e) {
            return shortUrl;
        }
    }

    @Transactional
    public void downloadAndUpload(AmazonPostRequest amazonPostRequest, boolean isUsingGrok) {
        String apiUrl = "https://savethr.com/process";

        try {
            if(postRepository.existsBySourceUrl(amazonPostRequest.getSourceUrl())){
                log.error("Nội dung đã tồn tại: {}", amazonPostRequest.getSourceUrl());
                return;
            }
            if (isUsingGrok) {
                String rawUrl = amazonPostRequest.getAmzUrl();
                String affiliateUrl = null;

                if (rawUrl != null && !rawUrl.isEmpty()) {
                    affiliateUrl = resolveAmazonLink(rawUrl);
                    String regex = "^https://www\\.amazon\\.com/dp/[A-Z0-9]{10}\\?tag=[\\w-]+$";
                    if (affiliateUrl == null || !affiliateUrl.matches(regex)) {
                        affiliateUrl = null;
                    }
                }
                String newCaption = reCreateCap(amazonPostRequest.getCaption(), affiliateUrl, amazonPostRequest.getIsCaptionLink());
                amazonPostRequest.setCaption(newCaption);
                if (amazonPostRequest.getIsCaptionLink()) {
                    amazonPostRequest.setAmzUrl("");
                } else {
                    amazonPostRequest.setAmzUrl(affiliateUrl != null ? affiliateUrl : "");
                }
                if (affiliateUrl == null) {
                    amazonPostRequest.setHasLink(false);
                }
            }

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
            headers.add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36");

            MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
            map.add("id", amazonPostRequest.getSourceUrl());
            map.add("locale", "en");

            HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);

            ResponseEntity<String> response = restTemplate.postForEntity(apiUrl, request, String.class);

            if (response.getStatusCode() == HttpStatus.OK) {
                parseAndUpload(response.getBody(), amazonPostRequest);
            }

        } catch (Exception e) {
            System.err.println("Lỗi khi call API savethr: " + e.getMessage());
            throw new RuntimeException(e);
        }
    }

    public String reCreateCap(String rawContent, String amzUrl, Boolean isCaptionLink) {
        String prompt = "Act as a Threads user. Context: '" + rawContent + "'. " +
                "Task: Paraphrase the source context for Threads while preserving exactly 90% of its original essence. " +
                "Instruction: Replace as many words as possible with creative synonyms. Reorder the sentence structure to make it feel fresh while keeping the core message intact. " +
                "Style: Direct, concise, and almost identical to the source. " +
                "Tone: Personal, natural, and low-key. No marketing fluff. " +
                "Formatting: Use 1-2 line breaks between sentences to create vertical space and make it easy to read. " +
                "Rule: Do NOT add new information. Keep it to 2-3 short, punchy lines. " +
                "Constraint: Remove any affiliate-related calls to action, 'link in bio', or 'buy here' phrases. " +
                "Constraint: Do NOT include any links in your response. " +
                "Output: Return ONLY the rewritten text with line breaks. Language: English.";

        String aiResponse = groqService.generateThreadsContent(prompt);
        String cleanedContent = aiResponse.trim().replaceAll("^\"|\"$", "");
        if (amzUrl != null && !amzUrl.isEmpty() && Boolean.TRUE.equals(isCaptionLink)) {
            String hashtags = generateHashtags(rawContent);
            return cleanedContent +
                    "\nProduct link: " + amzUrl +
                    "\n" + hashtags;
        }
        return cleanedContent;
    }

    public String reCreateCap(String rawContent) {
        String prompt = "Act as a Threads user. Context: '" + rawContent + "'. " +
                "Task: Rewrite this for Threads. Keep the core meaning and include any links ONLY if they exist in the source. " +
                "Style: Direct, concise, and almost identical to the source. " +
                "Tone: Personal, natural, and low-key. No marketing fluff. " +
                "Formatting: Use double line breaks between short sentences. 2-3 lines max. " +
                "Rule: If there's a link, place it naturally at the end or in a new line. If no link, just focus on the message. " +
                "Constraint: Do NOT invent any links. Do NOT use phrases like 'Link in bio'. " +
                "Output: Return ONLY the rewritten text. Language: English.";

        String aiResponse = groqService.generateThreadsContent(prompt);
        return aiResponse.trim().replaceAll("^\"|\"$", "");
    }

    private String generateHashtags(String content) {
        String lowerContent = content.toLowerCase();
        StringBuilder tags = new StringBuilder("#viral #uniquefinds #amazon");

        if (lowerContent.contains("kitchen") || lowerContent.contains("cook")) tags.append(" #kitchenhacks");
        if (lowerContent.contains("decor") || lowerContent.contains("home")) tags.append(" #homedecor");
        if (lowerContent.contains("gadget") || lowerContent.contains("tech")) tags.append(" #techgadgets");
        if (lowerContent.contains("beauty") || lowerContent.contains("skincare")) tags.append(" #beautytips");
        if (lowerContent.contains("fashion") || lowerContent.contains("outfit")) tags.append(" #ootd");

        return tags.toString();
    }

    private void parseAndUpload(String html, AmazonPostRequest amazonPostRequest) {

        Document doc = Jsoup.parse(html);
        Elements links = doc.select("a.download_link");

        String rawContent = (amazonPostRequest.getCaption() != null && !amazonPostRequest.getCaption().isEmpty())
                ? amazonPostRequest.getCaption()
                : doc.select("p.text-sm.text-gray-700.leading-relaxed").text();

        PostEntity post = new PostEntity();
        post.setCaption(rawContent);
        post.setSourceUrl(amazonPostRequest.getSourceUrl());
        post.setAmzUrl(amazonPostRequest.getAmzUrl());
        post.setIsCaptionLink(amazonPostRequest.getIsCaptionLink());
        post.setIsPublished(false);
        post.setStatus("DEFAULT");
        post.setHasLink(amazonPostRequest.getHasLink());
        post = postRepository.save(post);

        List<MediaEntity> mediaList = new ArrayList<>();

        for (int i = 0; i < links.size(); i++) {
            Element link = links.get(i);
            String originalUrl = link.attr("href");

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

    public void handleFailedPost(PostEntity post, String reason) {
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("dd/MM HH:mm");
        String timestamp = dtf.format(LocalDateTime.now());
        post.setLastError(String.format("[%s] %s", timestamp, reason));
        post.setIsPublished(true);
        post.setPublishedAt(LocalDateTime.now());
        post.setStatus("FAILED");
        post.setRetryCount(1);
        postRepository.save(post);
        log.warn("Bài viết ID {} bị từ chối: {}", post.getId(), reason);
    }

    public List<ThreadAccount> getAllThreadAccount() {
        return threadAccountRepository.findAll(Sort.by(Sort.Direction.ASC, "isCaptionLink"));
    }
    public ThreadAccount getThreadAccountByThreadId(String threadId) {
        return threadAccountRepository.findByThreadId(threadId).orElseThrow();
    }
    public static String extractLink(String text) {
        Pattern pattern = Pattern.compile("https?://\\S+");
        Matcher matcher = pattern.matcher(text);
        if (matcher.find()) {
            return matcher.group();
        }
        return null;
    }
    public static String cleanCaption(String text) {
        if (text == null) return "";
        String regex = "(?i)(Amazon finds:?\\s*)?https?://\\S+[\\s\\S]*";

        return text.replaceAll(regex, "").trim();
    }

    public void cleanData() {
        postRepository.cleanData();
    }
}
