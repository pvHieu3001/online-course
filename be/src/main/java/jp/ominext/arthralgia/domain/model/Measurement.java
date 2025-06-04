package jp.ominext.arthralgia.domain.model;

import jp.ominext.arthralgia.request.MeasurementsRequest;
import jp.ominext.arthralgia.utils.Dates;
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
@Table(name = "measurements")
@NoArgsConstructor
public class Measurement extends BaseEntity {
    /**
     * ID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /**
     * ESR
     * mm/h
     */
    private Integer esr;

    /**
     * CRP
     * mg/dL
     */
    private Double crp;

    /**
     * CRP
     */
    private Double mmp3;

    public Measurement(MeasurementsRequest request, String uid) {
        this.esr = request.getEsr();
        this.crp = request.getCrp();
        this.mmp3 = request.getMmp3();
        this.uid = uid;
        this.date = Dates.parseExact(request.getDate(), Dates.ISO_ZONED_DATETIME_FORMAT);
    }
}
