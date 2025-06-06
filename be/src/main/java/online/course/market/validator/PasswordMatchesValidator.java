package online.course.market.validator;

import online.course.market.request.NewPasswordRequest;
import online.course.market.request.RegistrationUserRequest;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class PasswordMatchesValidator implements ConstraintValidator<PasswordMatches, Object> {

    @Override
    public void initialize(PasswordMatches constraintAnnotation) {
        // Implement later
    }

    @Override
    public boolean isValid(Object o, ConstraintValidatorContext constraintValidatorContext) {
        if (o instanceof RegistrationUserRequest) {
            RegistrationUserRequest request = (RegistrationUserRequest) o;
            return request.getPassword().equals(request.getMatchingPassword());
        } else if (o instanceof NewPasswordRequest) {
            NewPasswordRequest request = (NewPasswordRequest) o;
            return request.getPassword().equals(request.getMatchingPassword());
        } else {
            return false;
        }
    }
}
