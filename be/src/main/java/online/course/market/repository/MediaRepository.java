package online.course.market.repository;

import online.course.market.entity.model.MediaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MediaRepository extends JpaRepository<MediaEntity, Long>{
}
