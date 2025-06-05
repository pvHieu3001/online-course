package jp.ominext.arthralgia.domain.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
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
