package online.course.market.entity.dto.amazon;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostDto {
    private Long id;
    private String productName;
    private String sourceUrl;
    private String caption;
    private String amzUrl;
    private Boolean isPublished;
    private LocalDateTime publishedAt;
    private String status;
    private String lastError;
    private Integer retryCount = 0;
    private String accountThread;
    private Boolean isCaptionLink;
    private Boolean hasLink;
    private List<MediaDto> medias;
}
