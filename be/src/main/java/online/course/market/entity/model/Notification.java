package online.course.market.entity.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.Date;

@Data
@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "notifications")
@NoArgsConstructor
public class Notification {
    @Id
    @Column(unique = true, nullable = false)
    private String id;
    private String title;
    @NotNull
    protected String content;
    @NotNull
    protected String userId;
    private String type;
    private Date isRead;
    private Date isDeleted;
}
