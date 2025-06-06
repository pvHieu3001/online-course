package online.course.market.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;


/**
 * Patient save health request
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class HealthInfoRequest extends BaseRequest {
    @JsonProperty("barometricPressure")
    @NotNull
    @DecimalMax(value = "999999.99")
    @Positive
    private float barometricPressure;

    @JsonProperty("footstep")
    @NotNull
    @PositiveOrZero
    private Integer footstep;
}
