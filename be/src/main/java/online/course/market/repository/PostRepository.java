package online.course.market.repository;

import online.course.market.entity.model.PostEntity;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<PostEntity, Long>{
    @Query("SELECT p FROM PostEntity p LEFT JOIN FETCH p.medias WHERE p.id = :id")
    Optional<PostEntity> findPostWithMediasById(@Param("id") Long id);

    @Query(value = "SELECT * FROM posts p " +
            "WHERE (:search IS NULL OR :search = '' OR LOWER(p.caption) LIKE LOWER(CONCAT('%', :search, '%'))) " +
            "AND (:isPublished IS NULL OR p.is_published = :isPublished)" +
            "ORDER BY p.published_at desc",
            nativeQuery = true)
    List<PostEntity> findAllByThreadIdAndCaption(@Param("search") String search, @Param("isPublished") Boolean isPublished);

    boolean existsBySourceUrl(String sourceUrl);
}
