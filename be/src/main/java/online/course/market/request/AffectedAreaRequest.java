package online.course.market.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.NotBlank;

/**
 * Affected area request
 */
@Data
@NoArgsConstructor
public class AffectedAreaRequest {
    @JsonProperty("area")
    //@Pattern(regexp = "^([LRlr])([1-9]|[1-2][0-9]|3[0-4])$")
    @Schema(description = "Sample: R1 - 右顎, L1 - 左顎")
    @NotBlank
    String area;

    @JsonProperty("affectedType")
    @NotBlank

    @Schema(description = "Enum: <br /> S1 - Swelling Lv1,<br /> S2 - Swelling Lv2, <br />S3 - Swelling Lv3,<br />"
            + "P - Pain,<br />"
            + "PS1 - Pain & Swelling Lv1,<br /> PS2 - Pain & Swelling Lv2,<br /> PS3 - Pain & Swelling Lv3")
    String affectedType;
}
