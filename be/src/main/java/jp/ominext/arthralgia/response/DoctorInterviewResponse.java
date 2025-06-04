package jp.ominext.arthralgia.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import jp.ominext.arthralgia.domain.model.DoctorInterview;
import jp.ominext.arthralgia.utils.Dates;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Map;

@EqualsAndHashCode(callSuper = true)
@Data
public class DoctorInterviewResponse extends BaseResponse{
    @JsonProperty("gVas")
    private Integer gVas;

    public DoctorInterviewResponse(DoctorInterview interview, Map<String, String> uIdMemberMap) {
        this.date = interview.getDate().toString();
        this.patientId = interview.getUid();
        this.gVas = interview.getGVas();
        this.memberId = uIdMemberMap.get(interview.getUid());
        this.created = Dates.format(interview.getCreated(), Dates.ISO_ZONED_DATETIME_FORMAT);
    }
}
