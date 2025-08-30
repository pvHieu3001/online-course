package online.course.market.entity.model;

import jakarta.persistence.*;
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
    @OneToOne
    @JoinColumn(name = "created_by", nullable = true)
    protected UserModel createdBy;
    @LastModifiedBy
    @OneToOne
    @JoinColumn(name = "updated_by", nullable = true)
    protected UserModel updatedBy;
    @CreatedDate
    @Column(nullable = false, updatable = false)
    protected LocalDateTime  createdAt;
    @LastModifiedDate
    @Column(nullable = false)
    protected LocalDateTime updatedAt;
}
