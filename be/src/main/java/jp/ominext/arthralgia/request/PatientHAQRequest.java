package jp.ominext.arthralgia.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.List;

/**
 * Patient HAQ request
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class PatientHAQRequest extends BaseRequest{
    @JsonProperty("answers")
    @Valid
    @NotEmpty
    List<HAQAnswer> answers;

    @Data
    public static class HAQAnswer{
        @JsonProperty("questionId")
        @NotNull
        private Integer questionId;

        @JsonProperty("answer")
        @NotNull
        @Max(value = 3)
        @Min(value = -1)
        private Integer answer;
    }
}
