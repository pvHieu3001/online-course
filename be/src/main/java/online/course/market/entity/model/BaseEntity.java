package online.course.market.entity.model;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
@MappedSuperclass
@SuperBuilder
@EntityListeners(AuditingEntityListener.class)
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
