package jp.ominext.arthralgia.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import jp.ominext.arthralgia.constant.AffectedType;
import jp.ominext.arthralgia.constant.Area;
import jp.ominext.arthralgia.constant.Recorder;
import jp.ominext.arthralgia.domain.model.AffectedArea;
import jp.ominext.arthralgia.utils.Dates;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Map;

/**
 * Affected Area Item
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class AffectedAreaItem extends BaseResponse{
    @JsonProperty("area")
    private String area;

    @JsonProperty("affectedType")
    private String affectedType;

    @JsonProperty("recorder")
    private Integer recorder;

    public AffectedAreaItem(AffectedArea affectedArea, Map<String, String> uIdMemberMap){
        this.area = Area.of(affectedArea.getArea()).getValue();
        this.affectedType = AffectedType.valueOf(affectedArea.getType()).getValue();
        this.recorder = Recorder.valueOf(affectedArea.getRecorder()).getValue() ;
        this.date = affectedArea.getDate().toString();
        this.patientId = affectedArea.getUid();
        this.memberId = uIdMemberMap.get(affectedArea.getUid());
        this.created = Dates.format(affectedArea.getCreated(), Dates.ISO_ZONED_DATETIME_FORMAT);
    }
}
