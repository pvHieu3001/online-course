package online.course.market.exception;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
@Data
public class ServiceException extends RuntimeException {
    private String errorCode;
    private HttpStatus status;

    public ServiceException(String message) {
        super(message);
    }

    public ServiceException(String message, String errorCode) {
        super(message);
        this.errorCode = errorCode;
    }

    public ServiceException(String message, String errorCode, HttpStatus status) {
        super(message);
        this.errorCode = errorCode;
        this.status = status;
    }
}
