package jp.ominext.arthralgia.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import jp.ominext.arthralgia.domain.model.PatientInterview;
import jp.ominext.arthralgia.utils.Dates;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Map;

@EqualsAndHashCode(callSuper = true)
@Data
public class PatientInterviewResponse extends BaseResponse{
    @JsonProperty("pVas")
    private Integer pVas;

    @JsonProperty("gVas")
    private Integer gVas;

    @JsonProperty("stiffenedTimeSpan")
    @Schema(description = "Format: [HH:MI]")
    private String stiffenedTimeSpan;

    public PatientInterviewResponse(PatientInterview interview, Map<String, String> uIdMemberMap) {
        this.date = interview.getDate().toString();
        this.patientId = interview.getUid();
        this.pVas = interview.getPVas();
        this.gVas = interview.getGVas();
        this.stiffenedTimeSpan = interview.getStiffenedTimeSpan();
        this.memberId = uIdMemberMap.get(interview.getUid());
        this.created = Dates.format(interview.getCreated(), Dates.ISO_ZONED_DATETIME_FORMAT);
    }
}
