package online.course.market.entity.dto.log;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LogResponseDto {
    private Integer id;
    private Integer userId;
    private Integer courseId;
    private String name;
    private String action;
    private String ipAddress;
    private String userAgent;
} 