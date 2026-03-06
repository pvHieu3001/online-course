package online.course.market.entity.dto.thread;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ThreadsDownloadResult {
    private String postId;
    private String text;
    private List<String> mediaUrls;
    private String username;
    private String createdAt;
}
