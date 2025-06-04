package jp.ominext.arthralgia.validator;

import jp.ominext.arthralgia.request.NewPasswordRequest;
import jp.ominext.arthralgia.request.RegistrationUserRequest;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

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
