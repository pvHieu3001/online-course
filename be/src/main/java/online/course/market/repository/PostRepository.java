package online.course.market.repository;

import online.course.market.entity.model.Course;
import online.course.market.entity.model.PostEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<PostEntity, Long>{
    Optional<PostEntity> findFirstByIsPublishedFalseAndThreadIdOrderByIdAsc(String threadId);
}
