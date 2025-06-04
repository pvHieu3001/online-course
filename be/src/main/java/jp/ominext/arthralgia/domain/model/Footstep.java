package jp.ominext.arthralgia.domain.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@Table(name = "footsteps")
@NoArgsConstructor
public class Footstep extends BaseEntity{
    /**
     * ID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /**
     * Footstep
     */
    @NotNull
    private Integer step;
}
