package online.course.market.repository;

import online.course.market.entity.model.PostEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<PostEntity, Long>{
    @Query("SELECT p FROM PostEntity p LEFT JOIN FETCH p.medias WHERE p.id = :id")
    Optional<PostEntity> findPostWithMediasById(@Param("id") Long id);

    @Query(value = "SELECT * FROM posts p " +
            "WHERE (:search IS NULL OR :search = '' OR LOWER(p.caption) LIKE LOWER(CONCAT('%', :search, '%'))) " +
            "AND (:status IS NULL OR :status = '' OR p.status = :status) " +
            "AND (:isCaptionLink IS NULL OR p.is_caption_link = :isCaptionLink)",
            countQuery = "SELECT count(*) FROM posts p " +
                    "WHERE (:search IS NULL OR :search = '' OR LOWER(p.caption) LIKE LOWER(CONCAT('%', :search, '%'))) " +
                    "AND (:status IS NULL OR :status = '' OR p.status = :status) " +
                    "AND (:isCaptionLink IS NULL OR p.is_caption_link = :isCaptionLink)",
            nativeQuery = true)
    Page<PostEntity> getPagePosts(
            @Param("search") String search,
            @Param("status") String status,
            @Param("isCaptionLink") Boolean isCaptionLink,
            Pageable pageable
    );

    boolean existsBySourceUrl(String sourceUrl);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM posts WHERE id NOT IN (SELECT post_id FROM media)", nativeQuery = true)
    void cleanData();
}
