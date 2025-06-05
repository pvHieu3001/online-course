package jp.ominext.arthralgia.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

@EqualsAndHashCode(callSuper = true)
@Data
public class PatientInterviewRequest extends BaseRequest{
    @JsonProperty("pVas")
    @NotNull
    @Max(value = 100)
    @PositiveOrZero
    private Integer pVas;

    @JsonProperty("gVas")
    @NotNull
    @Max(value = 100)
    @PositiveOrZero
    private Integer gVas;

    @JsonProperty("stiffenedTimeSpan")
    @Schema(description = "Format: [HH:MI]")
    private String stiffenedTimeSpan;
}
