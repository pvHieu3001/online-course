package jp.ominext.arthralgia.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import jp.ominext.arthralgia.domain.model.Measurement;
import jp.ominext.arthralgia.utils.Dates;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Map;

@EqualsAndHashCode(callSuper = true)
@Data
public class MeasurementsResponse extends BaseResponse{
    @JsonProperty("esr")
    private Integer esr;

    @JsonProperty("crp")
    private Double crp;

    @JsonProperty("mmp3")
    private Double mmp3;

    public MeasurementsResponse(Measurement measurement, Map<String, String> uIdMemberMap) {
        this.crp = measurement.getCrp();
        this.esr = measurement.getEsr();
        this.mmp3 = measurement.getMmp3();
        this.date = measurement.getDate().toString();
        this.patientId = measurement.getUid();
        this.memberId = uIdMemberMap.get(measurement.getUid());
        this.created = Dates.format(measurement.getCreated(), Dates.ISO_ZONED_DATETIME_FORMAT);
    }
}
