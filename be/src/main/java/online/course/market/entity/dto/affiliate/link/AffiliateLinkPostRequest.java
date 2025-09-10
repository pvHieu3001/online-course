package online.course.market.entity.dto.affiliate.link;

import java.time.LocalDateTime;

public class AffiliateLinkPostRequest {
    public Long productId;
    public String targetUrl;
    public LocalDateTime expiredAt;
}
