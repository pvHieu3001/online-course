package online.course.market.entity.dto.notification;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NotificationResponseDto {
    private String id;
    private String title;
    private String content;
    private String userId;
    private String type;
    private Date isRead;
    private Date isDeleted;
} 