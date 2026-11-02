package online.book.market.entity.dto.log;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LogGetResponse {
    private Integer id;
    private String pageId;
    private String name;
    private String action;
    private String ipAddress;
    private String userAgent;
    private String referer;
    private String device;
    private String url;
    private String method;
    private LocalDateTime createdAt;
}