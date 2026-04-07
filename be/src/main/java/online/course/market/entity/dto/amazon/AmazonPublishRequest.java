package online.course.market.entity.dto.amazon;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AmazonPublishRequest {
    private Long id;
    private String threadId;
    private Boolean isCaptionLink = false;
}
