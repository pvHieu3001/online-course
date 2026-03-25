package online.course.market.repository;

import online.course.market.entity.model.Course;
import online.course.market.entity.model.PostEntity;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<PostEntity, Long>{
    @Query("SELECT p FROM PostEntity p LEFT JOIN FETCH p.medias WHERE p.id = :id")
    Optional<PostEntity> findPostWithMediasById(@Param("id") Long id);

    @EntityGraph(attributePaths = {"medias"})
    Optional<PostEntity> findFirstByIsPublishedFalseAndThreadIdOrderByIdAsc(String threadId);

    @Query(value = "SELECT * FROM posts p " +
            "WHERE p.thread_id = :threadId " +
            "AND (:search IS NULL OR :search = '' OR LOWER(p.caption) LIKE LOWER(CONCAT('%', :search, '%'))) " +
            "ORDER BY p.id desc",
            nativeQuery = true)
    List<PostEntity> findAllByThreadIdAndCaption(@Param("threadId") String threadId, @Param("search") String search);

    boolean existsBySourceUrl(String sourceUrl);
}
