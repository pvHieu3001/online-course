package online.course.market.entity.dto.amazon;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AmazonPutRequest {
    private Long id;
    private String name;
    private String targetUrl;
    private Integer clickCount = 0;
    private Boolean status = true;
    private String price;
    private String originalPrice;
    private String image;
}
