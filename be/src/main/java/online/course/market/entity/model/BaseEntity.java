package online.course.market.entity.model;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.Data;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@MappedSuperclass
public class BaseEntity {
    @CreatedBy
    @Column(nullable = false, updatable = false)
    protected Long createdBy;
    @LastModifiedBy
    @Column(nullable = false)
    protected Long updatedBy;
    @CreatedDate
    @Column(nullable = false, updatable = false)
    protected LocalDateTime  createdAt;
    @LastModifiedDate
    @Column(nullable = false)
    protected LocalDateTime updatedAt;
}
