package online.course.market.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.util.List;

/**
 * Patient Affected areas request
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class PatientAffectedAreasRequest extends BaseRequest{
    @JsonProperty("recorder")
    @NotNull
    @Schema(description = "1- Patient,<br /> 2- Doctor")
    @Positive
    @Max(value = 2)
    Integer recorder;

    @JsonProperty("affectedAreas")
    @NotEmpty
    List<AffectedAreaRequest> affectedAreaRequests;
}
