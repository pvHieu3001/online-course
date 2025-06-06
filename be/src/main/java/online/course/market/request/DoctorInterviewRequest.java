package online.course.market.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

@EqualsAndHashCode(callSuper = true)
@Data
public class DoctorInterviewRequest extends BaseRequest{
    @JsonProperty("gVas")
    @NotNull
    @Max(value = 100)
    @PositiveOrZero
    private Integer gVas;
}
