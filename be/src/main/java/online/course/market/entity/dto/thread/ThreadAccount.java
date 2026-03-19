package online.course.market.entity.dto.thread;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ThreadAccount {
    String id;
    String threadId;
    String threadToken;
    Boolean isThreadPending;
}
