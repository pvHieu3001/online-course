package jp.ominext.arthralgia.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import jp.ominext.arthralgia.domain.model.BarometricPressure;
import jp.ominext.arthralgia.utils.Dates;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Map;

@EqualsAndHashCode(callSuper = true)
@Data
public class BarometricPressureResponse extends BaseResponse{
    @JsonProperty("barometric")
    private float barometric;

    public BarometricPressureResponse(BarometricPressure barometricPressure, Map<String, String> uIdMemberMap) {
        this.date = barometricPressure.getDate().toString();
        this.barometric = barometricPressure.getBarometric();
        this.memberId = uIdMemberMap.get(barometricPressure.getUid());
    }
}
