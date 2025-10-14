package online.course.market.entity.dto.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserSecurityDto implements Serializable {
	private String username;
	private String firstname;
	private String lastname;
	private String email;
}
