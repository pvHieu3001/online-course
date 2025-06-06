package online.course.market.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import jakarta.validation.constraints.NotNull;

/**
 * Base request
 */
@Data
public class BaseRequest {
    @JsonProperty("date")
    @Schema(description = "Format: [yyyy-MM-dd'T'HH:mm:ssZZ]")
    @NotNull
    private String date;

    @JsonProperty(value = "created_date")
    @Schema(description = "Format: [yyyy-MM-dd'T'HH:mm:ssZZ]")
    private String created;

    @JsonProperty("memberId")
    private String memberId;
}
