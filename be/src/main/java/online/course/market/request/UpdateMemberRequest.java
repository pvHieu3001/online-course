package online.course.market.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * Update Member request
 */
@Data
public class UpdateMemberRequest {
    @JsonProperty("id")
    String id;

    @JsonProperty("name")
    @NotBlank
    @Size(min = 7, max = 50)
    String name;
}
