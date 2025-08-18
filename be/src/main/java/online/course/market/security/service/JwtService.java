package online.course.market.security.service;

import org.springframework.security.core.userdetails.UserDetails;
import online.course.market.security.entity.SecurityUser;

public interface JwtService {

	public String extractUsernameFromToken(String jwt);

	public String getToken(final SecurityUser securityUser);

	public String getRefreshToken(final SecurityUser securityUser);

	public boolean isTokenValid(String token, UserDetails userDetails);
}
