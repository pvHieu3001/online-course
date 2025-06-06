package online.course.market.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;


/**
 * Base response
 */
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BaseResponse {
    @JsonProperty("date")
    protected String date;

    @JsonProperty("created_date")
    protected String created;

    @JsonProperty("patientId")
    protected String patientId;

    @JsonProperty("memberId")
    protected String memberId;
}
