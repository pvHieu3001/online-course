package online.course.market.repository;

import online.course.market.entity.model.ThreadAccount;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ThreadAccountRepository extends JpaRepository<ThreadAccount, Long>{
    Optional<ThreadAccount> findByThreadId(String threadId);
}
