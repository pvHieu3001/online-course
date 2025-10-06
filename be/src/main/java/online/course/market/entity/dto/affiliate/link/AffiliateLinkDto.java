package online.course.market.entity.dto.affiliate.link;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AffiliateLinkDto {
    private Long id;
    private String name;
    private String targetUrl;
    private Integer clickCount = 0;
    private Boolean status = true;
    private String price;
    private String originalPrice;
    private String image;
}
