package online.course.market.exception;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import online.course.market.entity.dto.ApiResponse;
import online.course.market.entity.dto.ArgumentNotValidDto;
import online.course.market.entity.dto.ErrorDto;
import online.course.market.utils.CustomCodeException;

@RestControllerAdvice
public class ControllerAdvice {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Object> handleValidationExceptions(MethodArgumentNotValidException ex) {
        List<ErrorDto> errors = ex.getBindingResult().getAllErrors().stream()
                .map((error) -> ErrorDto.builder()
                        .code("400")
                        .field(((FieldError) error).getField())
                        .message(error.getDefaultMessage())
                        .build())
                .sorted(Comparator.comparing(ErrorDto::getField))
                .collect(Collectors.toList());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ValidationErrorResponse(400, "Validation failed", errors));
    }

    @ExceptionHandler(value = RuntimeException.class)
    public ResponseEntity<ApiResponse<Object>> runtimeExceptionHandler(RuntimeException exception) {
        ApiResponse<Object> error = ApiResponse.error(500, exception.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }

    @ExceptionHandler(value = CJNotFoundException.class)
    public ResponseEntity<ApiResponse<Object>> notFoundExceptionHandler(CJNotFoundException exception) {
        ApiResponse<Object> error = ApiResponse.error(404, exception.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    // Inner class cho lỗi validate chuẩn hóa
    public static class ValidationErrorResponse {
        private int code;
        private String message;
        private List<ErrorDto> errors;

        public ValidationErrorResponse(int code, String message, List<ErrorDto> errors) {
            this.code = code;
            this.message = message;
            this.errors = errors;
        }
        public int getCode() { return code; }
        public String getMessage() { return message; }
        public List<ErrorDto> getErrors() { return errors; }
    }
}
