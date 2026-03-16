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

    @Scheduled(cron = "0 0 6,9,12,15,18,21 * * *", zone = "Asia/Ho_Chi_Minh")
//    @Scheduled(cron = "0 * * * * *")
    @Transactional
    public void runAtStartOfHour() {
        log.info("Bắt đầu tiến trình lấy bài đăng buổi sáng (2h/lần): " + LocalDateTime.now());

        Optional<PostEntity> postOpt = postRepository.findFirstByIsPublishedFalseAndThreadIdOrderByIdAsc(accountId1);

        if (postOpt.isPresent()) {
            PostEntity post = postOpt.get();
            try {
                if (StringUtils.isEmpty(post.getCaption()) || StringUtils.isEmpty(post.getAmzUrl())) {
                    log.warn("Bỏ qua bài ID {}: Thiếu dữ liệu bắt buộc", post.getId());
                    return;
                }

                String videoUrl = post.getMedias().get(0).getCloudinaryUrl();
                String imageUrl = (post.getMedias().size() >= 2) ? post.getMedias().get(1).getCloudinaryUrl() : null;

                if (StringUtils.isEmpty(videoUrl)) {
                    log.warn("Bỏ qua bài ID {}: Không có Video URL", post.getId());
                    return;
                }

                log.info("Đang chờ 5 giây trước khi thực hiện đăng bài...");
                Thread.sleep(5000);

                threadsService.postToThreads(post.getCaption(), imageUrl, videoUrl, post.getAmzUrl(), post, account1, accountId1);

                log.info("Đã đăng thành công bài ID: {}", post.getId());

            } catch (InterruptedException ie) {
                Thread.currentThread().interrupt();
                log.error("Tiến trình delay bị ngắt quãng: {}", ie.getMessage());
            } catch (Exception e) {
                log.error("Lỗi khi đăng bài ID {}: {}", post.getId(), e.getMessage());
            }
        } else {
            log.info("Không có bài viết nào đang chờ để đăng.");
        }
    }
}
