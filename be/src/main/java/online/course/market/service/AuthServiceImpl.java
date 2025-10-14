package online.course.market.service;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonProcessingException;
import online.course.market.entity.model.UserModel;
import online.course.market.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import online.course.market.entity.dto.user.AuthDto;
import online.course.market.entity.dto.user.LoginDto;
import online.course.market.entity.dto.user.RegisterDto;
import online.course.market.entity.model.Token;
import online.course.market.entity.model.TokenType;
import online.course.market.repository.TokenRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
	
	private final UserRepository userRepository;
	private final TokenRepository tokenRepository;
	private final JwtService jwtService;
	private final PasswordEncoder passwordEncoder;
	private final AuthenticationManager authenticationManager;
	private final ModelMapper modelMapper;

	@Override
	@Transactional
	public AuthDto login(LoginDto dto){
		
		authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(dto.getUsername(), dto.getPassword()));
		
		UserModel user = userRepository.findByUsername(dto.getUsername()).orElseThrow();
		String token = null;
        String refreshtoken = null;
        try {
			token = jwtService.getToken(user);
            refreshtoken = jwtService.getRefreshToken(user);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        revokeAllUserTokens(user);
		saveUserToken(user, token);
		
		return AuthDto.builder()
				.accessToken(token)
				.refreshToken(refreshtoken)
				.build();
	}

	@Override
	@Transactional
	public AuthDto register(RegisterDto dto) {
		
		dto.setPassword(passwordEncoder.encode(dto.getPassword()));
		UserModel user = modelMapper.map(dto, UserModel.class);
		
		UserModel userSaved = userRepository.save(user);
        String token = null;
		String refreshtoken = null;
        try {
            token = jwtService.getToken(user);
			refreshtoken = jwtService.getRefreshToken(user);
		} catch (JsonProcessingException e) {
			throw new RuntimeException(e);
		}
				
		saveUserToken(userSaved, token);
		
		return AuthDto.builder()
				.accessToken(token)
				.refreshToken(refreshtoken)
				.build();
	}
	
	private void saveUserToken(UserModel user, String jwtToken) {
	    Token token = Token.builder()
	        .user(user)
	        .token(jwtToken)
	        .tokenType(TokenType.BEARER)
	        .expired(false)
	        .revoked(false)
	        .build();
	    tokenRepository.save(token);
	  }
	
	private void revokeAllUserTokens(UserModel user) {
	    var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
	    if (validUserTokens.isEmpty()) {
	    	return;	
	    }
	    
	    validUserTokens.forEach(token -> {
	      token.setExpired(true);
	      token.setRevoked(true);
	    });
	    tokenRepository.saveAll(validUserTokens);
	  }

	@Override
	public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
		final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
	    final String refreshToken;
	    final String username;
	    if (authHeader == null ||!authHeader.startsWith("Bearer ")) {
	      return;
	    }
	    refreshToken = authHeader.substring(7);
	    username = jwtService.extractUsernameFromToken(refreshToken);
	    if (username != null) {
	      UserModel user = userRepository.findByUsername(username)
	              .orElseThrow();
	      if (jwtService.isTokenValid(refreshToken, user)) {
	        var accessToken = jwtService.getToken(user);
	        revokeAllUserTokens(user);
	        saveUserToken(user, accessToken);
	        AuthDto authResponse = AuthDto.builder()
	                .accessToken(accessToken)
	                .refreshToken(refreshToken)
	                .build();
	        response.setContentType("application/json");
	        new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
	      }
	    }
	}

	@Override
	@Transactional(readOnly = true)
	public boolean isUsernameValid(String username) {		
		return !userRepository.existsUserModelByUsername(username);
	}

}
