package jp.ominext.arthralgia.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import jp.ominext.arthralgia.validator.ValidEmail;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class LoginUserRequest {
    @JsonProperty("email")
    @NotBlank
    @ValidEmail
    private String email;

    @JsonProperty("password")
    @NotBlank
    @Size(min = 3, max = 20)
    private String password;
}
