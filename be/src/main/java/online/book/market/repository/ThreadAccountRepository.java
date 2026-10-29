package online.book.market.repository;

import online.book.market.entity.model.ThreadAccount;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ThreadAccountRepository extends JpaRepository<ThreadAccount, Long>{
    Optional<ThreadAccount> findByThreadId(String threadId);
}
