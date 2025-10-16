package online.course.market.controller;

import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

import online.course.market.entity.dto.ApiResponse;
import online.course.market.service.AuthService;
import org.apache.commons.lang3.ObjectUtils;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import online.course.market.entity.dto.user.UserDto;
import online.course.market.entity.dto.user.UserPostRequest;
import online.course.market.entity.dto.user.UserPutRequest;
import online.course.market.entity.model.UserModel;
import online.course.market.exception.CJNotFoundException;
import online.course.market.service.UserService;
import online.course.market.utils.CustomCodeException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("api/v1/admin/user")
@Tag(name = "User",description = "User controller")
public class UserController {

	private final UserService userService;
	private final AuthService authService;
	private final ModelMapper modelMapper;
	private final PasswordEncoder passwordEncoder;

	@Operation(description = "Get pageable endpoint for user", summary = "This is a summary for user get pageable endpoint")
	@GetMapping(value = "/me")
	public ResponseEntity<ApiResponse<UserDto>> getLoginUser() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		UserModel currentUser = (UserModel) authentication.getPrincipal();
		UserModel userModel = userService.getByUserName(currentUser.getUsername());
		UserDto userDto = modelMapper.map(userModel, UserDto.class);
		return ResponseEntity.ok(ApiResponse.success(userDto));
	}

	@Operation(description = "Get all endpoint for user", summary = "This is a summary for user get all endpoint")
	@GetMapping
	public ResponseEntity<ApiResponse<List<UserDto>>> getAll() {
		List<UserModel> user = userService.getAll();
		List<UserDto> userDtos = user.stream().map(userModel -> modelMapper.map(userModel, UserDto.class))
				.collect(Collectors.toList());
		return ResponseEntity.ok(ApiResponse.success(userDtos));
	}

	@Operation(description = "Get by id endpoint for user", summary = "This is a summary for user get by id endpoint")
	@GetMapping("/{id}")
	public ResponseEntity<ApiResponse<UserDto>> getUserByName(@PathVariable Long id) {
		UserModel userDb = userService.getById(id);
		if(ObjectUtils.isEmpty(userDb))
			throw new CJNotFoundException(CustomCodeException.CODE_400, "user not found with name "+id);
		UserDto userDto = modelMapper.map(userDb, UserDto.class);
		return ResponseEntity.ok(ApiResponse.success(userDto));
	}

	@Operation(description = "Save  endpoint for user", summary = "This is a summary for user save endpoint")
	@PostMapping
	public ResponseEntity<ApiResponse<UserDto>> saveUser(@Valid @RequestBody UserPostRequest dto) {
		UserModel user = modelMapper.map(dto, UserModel.class);
		UserModel userDb = userService.save(user);
		UserDto userDto = modelMapper.map(userDb, UserDto.class);
		return ResponseEntity.ok(ApiResponse.success(userDto));
	}

	@Operation(description = "Update  endpoint for user", summary = "This is a summary for user update endpoint")
	@PutMapping(value = "/{id}")
	public ResponseEntity<ApiResponse<UserDto>> updateUser(@Valid @RequestBody UserPutRequest dto,
											  @PathVariable(name = "id") Long id) {
		UserModel user = modelMapper.map(dto, UserModel.class);
		UserModel userDb = userService.update(user, id);
		UserDto userDto = modelMapper.map(userDb, UserDto.class);
		return ResponseEntity.ok(ApiResponse.success(userDto));
	}

	@Operation(description = "Delete  endpoint for user", summary = "This is a summary for user delete endpoint")
	@DeleteMapping(value = "{id}")
	public ResponseEntity<ApiResponse<Void>> deleteUser(@PathVariable(name = "id") Long id) {
		userService.deleteById(id);
		return ResponseEntity.status(HttpStatus.NO_CONTENT).body(ApiResponse.success("Deleted", null));
	}
}
