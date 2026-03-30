package online.course.market.scheduler;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import online.course.market.entity.dto.thread.ThreadAccount;
import online.course.market.entity.dto.user.UserDto;
import online.course.market.entity.model.MediaEntity;
import online.course.market.entity.model.PostEntity;
import online.course.market.entity.model.UserModel;
import online.course.market.repository.PostRepository;
import online.course.market.repository.UserRepository;
import online.course.market.service.GroqService;
import online.course.market.service.ThreadsService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@Slf4j
@Component
@RequiredArgsConstructor
public class ThreadScheduler {
    private final ThreadsService threadsService;
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

     @Scheduled(cron = "0 0 0,2,4,6,8,10,12,14,16,18,20,22 * * *", zone = "Asia/Ho_Chi_Minh")
    public void runMultiAccountPost() {
        log.info("Bắt đầu tiến trình đăng bài phân tách thời gian: {}", LocalDateTime.now());

        List<UserModel> users = userRepository.findAll();
        List<ThreadAccount> userDtos = users.stream().map(userModel -> modelMapper.map(userModel, ThreadAccount.class)).toList();
        for (int i = 0; i < userDtos.size(); i++) {
            ThreadAccount account = userDtos.get(i);

            if (account == null || Objects.equals(account.getIsThreadPending(), true) || !StringUtils.hasText(account.getThreadId()) || !StringUtils.hasText(account.getThreadToken())) {
                log.warn("Bỏ qua account do thiếu thông tin định danh, token hoặc pending.");
                continue;
            }
            Random rand = new Random();
            int delayInMinutes = rand.nextInt(60);
            CompletableFuture.runAsync(() -> {
                try {
                    if (delayInMinutes > 0) {
                        log.info("Account {} sẽ đợi {} phút trước khi đăng...", account.getId(), delayInMinutes);
                        Thread.sleep((long) delayInMinutes * 60 * 1000);
                    }
                    processSingleAccountPost(account);
                } catch (InterruptedException e) {
                    log.error("Tiến trình đợi của account {} bị ngắt quãng", account.getId());
                    Thread.currentThread().interrupt();
                } catch (Exception e) {
                    log.error("Lỗi không xác định khi xử lý account {}: {}", account.getId(), e.getMessage());
                }
            });
        }
    }

    @Transactional
    public void processSingleAccountPost(ThreadAccount account) {
	Pageable singleRandomResult = PageRequest.of(0, 1);
        List<PostEntity> postOpt = postRepository.findRandomByIsPublishedFalseAndThreadId(account.getThreadId(),singleRandomResult);
        if (!postOpt.isEmpty()) {
            PostEntity post = postOpt.get(0);
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

                if ((post.getCaption() == null || post.getCaption().isBlank()) && imageUrls.isEmpty() && videoUrls.isEmpty()) {
                    threadsService.handleFailedPost(post, "Post nội dung trống (không có chữ cũng không có media)");
                    return;
                }

                threadsService.postToThreads(
                        post.getCaption(),
                        imageUrls,
                        videoUrls,
                        post.getAmzUrl(),
                        post,
                        account.getThreadToken(),
                        account.getThreadId()
                );

                log.info("Account {} đã xử lý bài bài ID {}.", account.getId(), post.getId());

            } catch (Exception e) {
                log.error("Lỗi hệ thống khi xử lý bài ID {} cho Account {}: {}", post.getId(), account.getId(), e.getMessage());
            }
        }
    }
}
