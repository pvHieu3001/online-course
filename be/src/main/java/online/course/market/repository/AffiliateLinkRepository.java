package online.course.market.repository;

import online.course.market.entity.model.AffiliateLink;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AffiliateLinkRepository extends JpaRepository<AffiliateLink, Long> {
    List<AffiliateLink> findAllByStatusTrue();
}
