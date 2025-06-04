package jp.ominext.arthralgia.domain.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Data
@Entity
@Table(name = "barometric_pressures")
@NoArgsConstructor
public class BarometricPressure {
    /**
     * ID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /**
     * Barometric Pressure
     */
    @NotNull
    private Float barometric;

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
}
