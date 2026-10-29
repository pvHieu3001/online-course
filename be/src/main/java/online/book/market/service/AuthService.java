package online.book.market.service;

import java.io.IOException;

import online.book.market.entity.dto.user.AuthDto;
import online.book.market.entity.dto.user.LoginDto;
import online.book.market.entity.dto.user.RegisterDto;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public interface AuthService {

	AuthDto login(LoginDto dto);

	AuthDto register(RegisterDto dto);
	
	void refreshToken(final HttpServletRequest request, final HttpServletResponse response) throws IOException;
	
	boolean isUsernameValid(String username);

	AuthDto switchUser(String userName, String currentUsername);
}
