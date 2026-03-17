package online.course.market.scheduler;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import online.course.market.entity.dto.thread.ThreadAccount;
import online.course.market.entity.model.PostEntity;
import online.course.market.repository.PostRepository;
import online.course.market.service.GroqService;
import online.course.market.service.ThreadsService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;

@Slf4j
@Component
@RequiredArgsConstructor
public class ThreadScheduler {
    @Value("${thread.account-1}")
    private String account1;
    @Value("${thread.account-1-id}")
    private String accountId1;
    @Value("${thread.account-2}")
    private String account2;
    @Value("${thread.account-2-id}")
    private String accountId2;
    @Value("${thread.account-3}")
    private String account3;
    @Value("${thread.account-3-id}")
    private String accountId3;
    @Value("${thread.account-4}")
    private String account4;
    @Value("${thread.account-4-id}")
    private String accountId4;
    @Value("${thread.account-5}")
    private String account5;
    @Value("${thread.account-5-id}")
    private String accountId5;

    private final ThreadsService threadsService;
    private final PostRepository postRepository;
    private List<ThreadAccount> accounts;

    @PostConstruct
    public void init() {
        accounts = List.of(
                new ThreadAccount(account1, accountId1),
                new ThreadAccount(account2, accountId2),
                new ThreadAccount(account3, accountId3),
                new ThreadAccount(account4, accountId4),
                new ThreadAccount(account5, accountId5)
        );
    }



    @Scheduled(cron = "0 0 6,9,12,15,18,21 * * *", zone = "Asia/Ho_Chi_Minh")
    public void runMultiAccountPost() {
        log.info("Bắt đầu tiến trình đăng bài phân tách thời gian: " + LocalDateTime.now());

        for (int i = 0; i < accounts.size(); i++) {
            ThreadAccount account = accounts.get(i);
            if (StringUtils.isEmpty(account.getId())) continue;

            int delayInMinutes = i * 15;

            CompletableFuture.runAsync(() -> {
                try {
                    if (delayInMinutes > 0) {
                        log.info("Account {} sẽ đợi {} phút trước khi đăng...", account.getId(), delayInMinutes);
                        Thread.sleep(delayInMinutes * 60 * 1000L);
                    }

                    processSingleAccountPost(account);

                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            });
        }
    }

    @Transactional
    public void processSingleAccountPost(ThreadAccount account) {
        Optional<PostEntity> postOpt = postRepository.findFirstByIsPublishedFalseAndThreadIdOrderByIdAsc(account.getId());

        if (postOpt.isPresent()) {
            PostEntity post = postOpt.get();
            try {
                String videoUrl = post.getMedias().get(0).getCloudinaryUrl();
                String imageUrl = (post.getMedias().size() >= 2) ? post.getMedias().get(1).getCloudinaryUrl() : null;

                threadsService.postToThreads(post.getCaption(), imageUrl, videoUrl, post.getAmzUrl(), post, account.getToken(), account.getId());
                log.info("Account {} đã đăng bài ID {} thành công sau thời gian chờ.", account.getId(), post.getId());

            } catch (Exception e) {
                log.error("Lỗi khi đăng bài cho Account {}: {}", account.getId(), e.getMessage());
            }
        }
    }
}
