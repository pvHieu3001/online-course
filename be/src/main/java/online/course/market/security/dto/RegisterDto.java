package online.course.market.security.dto;

import online.course.market.security.annotation.UsernameExistsConstraint;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterDto {
	@UsernameExistsConstraint
	private String username;
	private String password;
	private String firstname;
	private String lastname;
	private String email;
}
