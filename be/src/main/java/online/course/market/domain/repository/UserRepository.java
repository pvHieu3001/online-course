package online.course.market.domain.repository;

import online.course.market.domain.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    User findFirstById(String id);

    @Query(value = "SELECT * FROM patients p WHERE p.email = :email",
            nativeQuery = true)
    User findFirstByEmail(String email);

    @Modifying
    @Query(value = "Update patients p set p.last_login = now() WHERE p.id = :id",
            nativeQuery = true)
    void updateLastLoginById(String id);

    @Modifying
    @Query(value = "delete from patients where id = :uid", nativeQuery = true)
    void deleteByUid(@Param("uid") String uid);
}
