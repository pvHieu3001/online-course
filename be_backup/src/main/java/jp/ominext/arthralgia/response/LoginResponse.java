package jp.ominext.arthralgia.response;

import lombok.Data;

@Data
public class LoginResponse {
    private String accessToken;
    private String accessType = "Bearer";

    public LoginResponse(String accessToken) {
        this.accessToken = accessToken;
    }
}
