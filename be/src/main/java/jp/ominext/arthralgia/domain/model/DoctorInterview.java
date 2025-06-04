package jp.ominext.arthralgia.domain.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@Table(name = "doctor_interviews")
@NoArgsConstructor
public class DoctorInterview extends BaseEntity {
    /**
     * ID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /**
     * Global VAS
     */
    private Integer gVas;
}
