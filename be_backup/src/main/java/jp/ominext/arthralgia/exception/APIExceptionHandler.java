package jp.ominext.arthralgia.exception;

import lombok.extern.log4j.Log4j2;
import org.apache.commons.lang3.StringUtils;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;

@RestControllerAdvice
@Log4j2
public class APIExceptionHandler {
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleAllException(Exception ex) {
        ErrorResponse errorResponse = ErrorResponse.of(HttpStatus.INTERNAL_SERVER_ERROR);
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ErrorResponse> handleRuntimeException(RuntimeException ex) {
        log.error(ex.getLocalizedMessage());
        ErrorResponse errorResponse = ErrorResponse.of(ex.getLocalizedMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(ServiceException.class)
    public ResponseEntity<ErrorResponse> handleServiceException(ServiceException ex) {
        log.error(ex.getMessage());
        HttpStatus status = ex.getStatus() != null? ex.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        ErrorResponse errorResponse = ErrorResponse.of(ex.getMessage(), ex.getErrorCode());
        return new ResponseEntity<>(errorResponse, status);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ErrorResponse> handleMysqlDataTruncationException(Exception ex) {
        log.error(ex.getCause().getCause().getLocalizedMessage());
        ErrorResponse errorResponse = ErrorResponse.of(ex.getCause().getCause().getLocalizedMessage(),
                HttpStatus.INTERNAL_SERVER_ERROR);
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    /**
     * Handler parameters exception
     * @param ex {@link MethodArgumentNotValidException}
     */
    @ExceptionHandler({MethodArgumentNotValidException.class})
    public ResponseEntity<Object> handleArgumentNotValidException(MethodArgumentNotValidException ex) {
        List<FieldError> fieldErrors = ex.getBindingResult().getFieldErrors();
        if (fieldErrors.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        FieldError fieldError = fieldErrors.get(0);
        String message = StringUtils.joinWith(" ", fieldError.getField(), fieldError.getDefaultMessage());
        log.error(message);
        ErrorResponse errorResponse = ErrorResponse.of(message, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MissingServletRequestParameterException.class)
    public ResponseEntity<Object> handleMissingServletRequestParameterException(
            MissingServletRequestParameterException ex) {
        String message = ex.getLocalizedMessage();
        log.error(message);
        ErrorResponse errorResponse = ErrorResponse.of(message, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }
}
