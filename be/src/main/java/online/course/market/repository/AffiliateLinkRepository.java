package online.course.market.repository;

import online.course.market.entity.model.AffiliateLink;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AffiliateLinkRepository extends JpaRepository<AffiliateLink, Long> {
    Optional<AffiliateLink> findByAffiliateCode(String code);

    List<AffiliateLink> findAllByStatusTrue();
}
