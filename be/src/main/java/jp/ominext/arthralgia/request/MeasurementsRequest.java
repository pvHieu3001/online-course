package jp.ominext.arthralgia.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.PositiveOrZero;

@EqualsAndHashCode(callSuper = true)
@Data
public class MeasurementsRequest extends BaseRequest{
    @JsonProperty("esr")
    @Max(value = 1000)
    @PositiveOrZero
    private Integer esr;

    @JsonProperty("crp")
    @DecimalMax(value = "100.00")
    private Double crp;

    @JsonProperty("mmp3")
    @DecimalMax(value = "10000.0")
    private Double mmp3;
}
