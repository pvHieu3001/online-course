package jp.ominext.arthralgia.domain.repository;

import jp.ominext.arthralgia.domain.model.VerificationToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VerificationTokenRepository extends JpaRepository<VerificationToken, Integer> {
    VerificationToken findFirstByToken(String token);
}

