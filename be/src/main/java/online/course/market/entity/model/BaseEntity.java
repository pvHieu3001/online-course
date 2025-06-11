package online.course.market.entity.model;

import jakarta.persistence.MappedSuperclass;
import lombok.Data;

import java.util.Date;

@Data
@MappedSuperclass
public class BaseEntity {
    protected Integer createdBy;
    protected Integer updatedBy;
    protected Date createdAt;
    protected Date updatedAt;
}
