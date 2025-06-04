package jp.ominext.arthralgia.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.validation.constraints.DecimalMax;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.PositiveOrZero;


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
