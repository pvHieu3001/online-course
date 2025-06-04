package jp.ominext.arthralgia.exception;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.springframework.http.HttpStatus;

/**
 * Exception response
 */
@Data
public class ErrorResponse {
    @JsonProperty("message")
    private final String message;
    @JsonProperty(value = "error_code") private final String errorCode;

    private ErrorResponse(String message, String errorCode) {
        this.message = message;
        this.errorCode = errorCode;
    }

    /**
     * {@code ErrorResponse} Error response
     *
     * @param message Message
     * @param status Error code
     */
    public static ErrorResponse of(String message, HttpStatus status) {
        String errMsg = message == null ? "" : message;
        return new ErrorResponse(errMsg, String.valueOf(status.value()));
    }

    /**
     * {@code ErrorResponse} Error response
     *
     * @param message Message
     * @param errorCode Error code
     */
    public static ErrorResponse of(String message, String errorCode) {
        String errMsg = message == null ? "" : message;
        return new ErrorResponse(errMsg, errorCode);
    }

    /**
     * {@code ErrorResponse} Default Error response
     *
     * @param status Error code
     */
    public static ErrorResponse of(HttpStatus status) {
        return new ErrorResponse(status.name(), String.valueOf(status.value()));
    }
}
