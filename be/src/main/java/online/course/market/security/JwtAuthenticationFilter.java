package online.course.market.security;

import java.io.IOException;

import org.springframework.http.HttpHeaders;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import online.course.market.security.repository.TokenRepository;
import online.course.market.security.service.JwtService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.support.StandardServletMultipartResolver;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

	final static String BEARER_SPACE = "Bearer ";

	private final JwtService jwtService;
	private final UserDetailsService userDetailsService;
	private final TokenRepository tokenRepository;

	@Override
	protected void doFilterInternal(
			@NonNull HttpServletRequest request,
			@NonNull HttpServletResponse response,
			@NonNull FilterChain filterChain)
			throws ServletException, IOException {

		if (request.getServletPath().contains("/api/v1/auth")) {
			filterChain.doFilter(request, response);
			return;
		}

		HttpServletRequest processedRequest = request;
		StandardServletMultipartResolver multipartResolver = new StandardServletMultipartResolver();
		boolean isMultipart = false;

		if(request.getContentType() != null && request.getContentType().toLowerCase().startsWith("multipart/form-data")){
			if(multipartResolver.isMultipart(request)){
				processedRequest = multipartResolver.resolveMultipart(request);
				isMultipart = true;
			}
		}

		try {
			final String jwt = getTokenFromRequest(processedRequest);
			final String username;

			if (jwt == null) {
				filterChain.doFilter(processedRequest, response);
				return;
			}

			username = jwtService.extractUsernameFromToken(jwt);

			if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
				UserDetails userDetails = userDetailsService.loadUserByUsername(username);

				boolean isTokenValid = tokenRepository.findByToken(jwt)
						.map(t -> !t.isExpired() && !t.isRevoked())
						.orElse(false);

				if (jwtService.isTokenValid(jwt, userDetails) && isTokenValid) {
					UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(username, null,
							userDetails.getAuthorities());
					authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(processedRequest));
					SecurityContextHolder.getContext().setAuthentication(authToken);
				}
			}

			filterChain.doFilter(processedRequest, response);
		}finally {
			if(isMultipart){
				multipartResolver.cleanupMultipart((MultipartHttpServletRequest) processedRequest);
			}
		}

	}

	private String getTokenFromRequest(HttpServletRequest request) {
		final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);

		if (StringUtils.hasText(authHeader) && authHeader.startsWith(BEARER_SPACE)) {
			return authHeader.replace(BEARER_SPACE, "");
		}

		return null;
	}

}
