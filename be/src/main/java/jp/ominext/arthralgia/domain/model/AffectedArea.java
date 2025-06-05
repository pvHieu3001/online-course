package jp.ominext.arthralgia.domain.model;

import jp.ominext.arthralgia.constant.AffectedType;
import jp.ominext.arthralgia.constant.Area;
import jp.ominext.arthralgia.constant.Recorder;
import jp.ominext.arthralgia.request.AffectedAreaRequest;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import java.sql.Timestamp;
import java.util.Date;

/**
 * HAQ Answer
 */

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@Table(name = "affected_areas")
@NoArgsConstructor
public class AffectedArea extends BaseEntity {
    /**
     * ID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /**
     * Recorder
     */
    @NotNull
    private String recorder;

    /**
     * Area
     */
    @NotNull
    private String area;

    /**
     * AffectedType
     */
    @NotNull
    private String type;

    public AffectedArea(AffectedAreaRequest request, String uid, Date date, Recorder recorder){
        this.uid = uid;
        this.date = new Timestamp(date.getTime());
        this.recorder = recorder.name();
        this.area = Area.of(request.getArea()).getValue();
        this.type = AffectedType.of(request.getAffectedType()).name();
    }
}
