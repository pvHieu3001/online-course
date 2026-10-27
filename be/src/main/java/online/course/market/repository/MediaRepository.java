package online.course.market.repository;

import online.course.market.entity.model.MediaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MediaRepository extends JpaRepository<MediaEntity, Long>{
    @Query("SELECT m FROM MediaEntity m WHERE m.post.id IN :postIds")
    List<MediaEntity> findAllByPostIdIn(@Param("postIds") List<Long> postIds);
}
