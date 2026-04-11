package online.course.market.entity.dto.amazon;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AmazonPostRequest {
    private String sourceUrl;
    private String amzUrl;
    private String caption;
    private Boolean isCaptionLink = false;
    private Boolean hasLink = true;
}
