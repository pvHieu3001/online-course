package jp.ominext.arthralgia.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import jp.ominext.arthralgia.domain.model.Member;
import jp.ominext.arthralgia.request.PatientMemberRequest;
import jp.ominext.arthralgia.utils.Dates;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Date;

@EqualsAndHashCode(callSuper = true)
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class MemberResponse extends BaseResponse{
    @JsonProperty("id")
    private String id;

    @JsonProperty("name")
    private String name;

    public MemberResponse(Member member) {
        this.id = member.getId();
        this.name = member.getName();
        this.patientId = member.getUid();
    }

    public MemberResponse(PatientMemberRequest.Member member, String patientId, Date created) {
        this.id = member.getId();
        this.name = member.getName();
        this.patientId = patientId;
        this.created = Dates.format(created, Dates.ISO_ZONED_DATETIME_FORMAT);
    }
}
