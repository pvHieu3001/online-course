package jp.ominext.arthralgia.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import jp.ominext.arthralgia.domain.model.Footstep;
import jp.ominext.arthralgia.utils.Dates;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Map;

@EqualsAndHashCode(callSuper = true)
@Data
public class FootStepResponse extends BaseResponse{
    @JsonProperty("step")
    private int step;

    public FootStepResponse(Footstep footstep, Map<String, String> uIdMemberMap) {
        this.date = footstep.getDate().toString();
        this.step = footstep.getStep();
        this.memberId = uIdMemberMap.get(footstep.getUid());
        this.created = Dates.format(footstep.getCreated(), Dates.ISO_ZONED_DATETIME_FORMAT);
    }
}
