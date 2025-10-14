package online.course.market.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import online.course.market.entity.model.UserModel;
import org.springframework.security.core.userdetails.UserDetails;

public interface JwtService {

	public String extractUsernameFromToken(String jwt);

	public String getToken(final UserModel securityUser) throws JsonProcessingException;

	public String getRefreshToken(final UserModel securityUser) throws JsonProcessingException;

	public boolean isTokenValid(String token, UserDetails userDetails);
}
