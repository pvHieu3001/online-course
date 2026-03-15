package online.course.market.scheduler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
import java.util.Optional;

@Slf4j
@Component
@RequiredArgsConstructor
public class ThreadScheduler {
    @Value("${thread.account-1}")
    private String account1;
    @Value("${thread.account-1-id}")
    private String accountId1;

    private final ThreadsService threadsService;
    private final PostRepository postRepository;

    @Scheduled(cron = "0 0 * * * *")
    @Transactional
    public void runAtStartOfHour() {
        log.info("Bắt đầu tiến trình lấy bài đăng: " + LocalDateTime.now());
        Optional<PostEntity> postOpt = postRepository.findFirstByIsPublishedFalseOrderByCreatedAtAsc();
        if (postOpt.isPresent()) {
            PostEntity post = postOpt.get();

            try {
                if (StringUtils.isEmpty(post.getCaption()) || StringUtils.isEmpty(post.getAmzUrl())) {
                    log.warn("Bỏ qua bài ID {}: Thiếu Caption hoặc Amazon URL", post.getId());
                    return;
                }

                if (post.getMedias() == null || post.getMedias().size() < 2) {
                    log.warn("Bỏ qua bài ID {}: Không đủ số lượng Media (Yêu cầu ít nhất 1 Video và 1 Image)", post.getId());
                    return;
                }

                String videoUrl = post.getMedias().get(0).getCloudinaryUrl();
                String imageUrl = post.getMedias().get(1).getCloudinaryUrl();

                if (StringUtils.isEmpty(videoUrl) || StringUtils.isEmpty(imageUrl)) {
                    log.warn("Bỏ qua bài ID {}: Link Media bị trống", post.getId());
                    return;
                }
                threadsService.postToThreads(post.getCaption(), imageUrl, videoUrl, post.getAmzUrl(), post, account1, accountId1);
            } catch (Exception e) {
                log.error("Lỗi khi đăng bài ID {}: {}", post.getId(), e.getMessage());
            }
        } else {
            log.info("Không có bài viết nào đang chờ để đăng.");
        }
    }
}
