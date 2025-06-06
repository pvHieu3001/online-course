package online.course.market.domain.model;

import lombok.Data;

import jakarta.persistence.MappedSuperclass;
import jakarta.validation.constraints.NotNull;
import java.util.Date;

@Data
@MappedSuperclass
public class BaseEntity {
    protected Integer createdBy;
    protected Integer updatedBy;
    protected Date createdAt;
    protected Date updatedAt;
}
