package online.course.market.entity.dto.amazon;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AmazonPutRequest {
    private String sourceUrl;
    private String amzUrl;
    private String caption;
}
