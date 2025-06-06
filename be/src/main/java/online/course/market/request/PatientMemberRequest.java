package online.course.market.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import java.util.List;

/**
 * Patient Member request
 */
@Data
public class PatientMemberRequest{

    @JsonProperty("members")
    @Valid
    @NotEmpty
    public List<Member> members;

    @Data
    @NoArgsConstructor
    public static class Member{
        @JsonProperty("id")
        @NotBlank
        String id;

        @JsonProperty("name")
        @NotBlank
        @Size(min = 1, max = 50)
        String name;
    }
}
