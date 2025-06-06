package online.course.market.domain.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import java.util.Date;

@Data
@Entity
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
