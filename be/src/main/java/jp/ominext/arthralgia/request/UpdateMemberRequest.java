package jp.ominext.arthralgia.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

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
