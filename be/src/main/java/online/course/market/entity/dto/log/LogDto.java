package online.course.market.entity.dto.log;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LogDto {
    private String pageId;
    private String name;
    private String action;
    private String ipAddress;
    private String userAgent;
    private String referrer;
    private String device;
    private String url;
} 