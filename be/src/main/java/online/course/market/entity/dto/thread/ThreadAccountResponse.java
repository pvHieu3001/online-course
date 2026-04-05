package online.course.market.entity.dto.thread;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ThreadAccountResponse {
    private Long id;
    private String accountName;
    private String threadId;
    private String threadToken;
    private Boolean isThreadPending;
}
