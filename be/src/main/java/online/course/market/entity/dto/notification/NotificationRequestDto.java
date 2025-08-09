package online.course.market.entity.dto.notification;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NotificationRequestDto {
    private String title;
    private String content;
    private Integer userId;
    private String type;
    private boolean isRead;
    private boolean isDeleted;
} 