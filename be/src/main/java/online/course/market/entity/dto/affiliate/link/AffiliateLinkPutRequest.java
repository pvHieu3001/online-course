package online.course.market.entity.dto.affiliate.link;

import java.time.LocalDateTime;

public class AffiliateLinkPutRequest {
    public Long productId;
    public String targetUrl;
    public LocalDateTime expiredAt;
}
