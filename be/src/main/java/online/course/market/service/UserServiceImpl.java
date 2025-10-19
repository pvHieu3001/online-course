package online.course.market.service;

import java.util.List;
import java.util.Objects;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

import online.course.market.entity.model.UserModel;
import online.course.market.framework.exception.CJNotFoundException;
import online.course.market.repository.UserRepository;
import online.course.market.utils.CustomCodeException;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;

	@Override
	@Transactional(readOnly = true)
	public UserModel getById(Long id) {
		return userRepository.findById(id).orElseThrow(
				() -> new CJNotFoundException(CustomCodeException.CODE_400, "user not found with id "+id));
	}

	@Override
	public UserModel getByUserName(String userName) {
		return userRepository.findByUsername(userName).orElseThrow(
				() -> new CJNotFoundException(CustomCodeException.CODE_400, "user not found with username "+userName));
	}

	@Override
	@Transactional(readOnly = true)
	public List<UserModel> getAll() {
		return userRepository.findAll();
	}

	@Override
	@Transactional
	public UserModel save(UserModel user) {
		Assert.notNull(user, "user cannot be null");
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		return userRepository.save(user);
	}

	@Override
	@Transactional
	public UserModel update(UserModel user, Long id) {

		UserModel userDb = userRepository.findById(id)
				.orElseThrow(() -> new CJNotFoundException(CustomCodeException.CODE_400, "user not found"));

		userDb.setUsername(user.getUsername());
		userDb.setFirstname(user.getFirstname());
		userDb.setLastname(user.getLastname());
		if(!Objects.equals(user.getPassword(), "")){
			userDb.setPassword(passwordEncoder.encode(user.getPassword()));
		}
		userDb.setEmail(user.getEmail());
		userDb.setRole(user.getRole());

		return userRepository.save(userDb);
	}

	@Override
	@Transactional
	public void deleteById(Long id) {
		Assert.notNull(id, "id cannot be null");
		UserModel userDb = userRepository.findById(id)
				.orElseThrow(() -> new CJNotFoundException(CustomCodeException.CODE_400, "user not found"));
		userRepository.delete(userDb);
	}

	@Override
	@Transactional(readOnly = true)
	public Page<UserModel> finadAll(Pageable pageable) {
		return userRepository.findAll(pageable);
	}

	@Override
	public Long count() {
		return userRepository.count();
	}

}
