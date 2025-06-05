package jp.ominext.arthralgia.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import jp.ominext.arthralgia.validator.PasswordMatches;
import jp.ominext.arthralgia.validator.ValidEmail;
import lombok.Data;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Data
@PasswordMatches
public class NewPasswordRequest {
    @JsonProperty("email")
    @NotBlank
    @ValidEmail
    private String email;

    @JsonProperty("password")
    @NotBlank
    @Size(min = 3, max = 20)
    private String password;
    private String matchingPassword;
}
