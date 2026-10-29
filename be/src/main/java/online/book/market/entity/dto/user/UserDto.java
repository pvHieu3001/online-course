package online.book.market.entity.dto.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import online.book.market.entity.model.Role;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserDto {
	Long id;
	String firstname;
	String lastname;
	String username;
	String email;
	Date createAt;
	Role role = Role.USER;
}
