package online.course.market.service;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import online.course.market.entity.model.UserModel;

public interface UserService {
	UserModel getById(final Long id);
	UserModel getByPhoneNumber(String userName);
	UserModel getByUserName(String userName);
	List<UserModel> getAll();
	UserModel save(final UserModel user);
	UserModel update(final UserModel user, final Long id);
	void deleteById(final Long id);
	Page<UserModel> finadAll(Pageable pageable);
	Long count();
}
