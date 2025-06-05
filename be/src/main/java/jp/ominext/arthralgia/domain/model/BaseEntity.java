package jp.ominext.arthralgia.domain.model;

import lombok.Data;

import jakarta.persistence.MappedSuperclass;
import jakarta.validation.constraints.NotNull;
import java.util.Date;

@Data
@MappedSuperclass
public class BaseEntity {
    /**
     * Device id
     */
    @NotNull
    protected String uid;

    /**
     * Log date
     */
    @NotNull
    protected Date date;

    /**
     * Created date
     */
    protected Date created;

    /**
     * Updated date
     */
    protected Date updated;
}
