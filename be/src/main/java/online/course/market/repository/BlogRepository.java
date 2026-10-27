package online.course.market.repository;

import online.course.market.entity.model.Blog;
import online.course.market.entity.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlogRepository extends JpaRepository<Blog, Integer> {
    Blog findBySlugAndStatus(String slug, Boolean status);
    List<Blog> findByTypeAndStatus(String type, Boolean status);
    @Query("SELECT c FROM Blog c " +
            "WHERE (:status IS NULL OR c.status = :status) " +
            "AND (:search IS NULL OR LOWER(c.title) LIKE LOWER(CONCAT('%', :search, '%'))) " +
            "AND (:isTrending IS NULL OR c.isTrending = :isTrending) " +
            "AND (:isNew IS NULL OR c.isNew = :isNew) " +
            "AND (:type IS NULL OR c.type = :type) "+
            "AND (:tag IS NULL OR EXISTS (SELECT t FROM c.tags t WHERE t.name = :tag))")
    List<Blog> filterBlog(@Param("type") String type,
                          @Param("status") Boolean status,
                          @Param("search") String search,
                          @Param("isTrending") Boolean isTrending,
                          @Param("isNew") Boolean isNew,
                          @Param("tag") String tag);

    @Query("SELECT c FROM Blog c " +
            "WHERE c.status = true " +
            "AND c.type = :type " +
            "AND c.isTrending = true " +
            "ORDER BY createdAt DESC " +
            "LIMIT 4")
    List<Blog> getRecommendBlog(@Param("type") String type);
}