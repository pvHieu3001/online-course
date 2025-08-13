package online.course.market.repository;

import online.course.market.entity.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
    boolean existsByName(String name);
    boolean existsBySlug(String slug);
    Category findBySlug(String slug);

    @Modifying
    @Transactional
    @Query(value = """
        UPDATE category c
        SET number_course = (
            SELECT COUNT(*) FROM course co WHERE co.category_id = c.id
        )
        WHERE c.id IN (:ids)
        """, nativeQuery = true)
    void updateNumberCourseByIds(@Param("ids") List<Integer> ids);
}