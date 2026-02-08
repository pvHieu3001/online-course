package online.course.market.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import online.course.market.entity.model.UserModel;

public interface UserRepository extends JpaRepository<UserModel, Long>{
	Optional<UserModel> findByFirstname(final String name);
	Optional<UserModel> findByUsername(final String name);
	boolean existsUserModelByUsername(final String username);
    Optional<UserModel> findByPhonenumber(String phone);
}
