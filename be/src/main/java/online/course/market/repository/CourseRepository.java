package online.course.market.repository;

import java.util.List;
import java.util.Optional;

import online.course.market.entity.model.Course;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;

public interface CourseRepository extends JpaRepository<Course, Integer>{
    List<Course> findAllByOrderByIdDesc();
    
    List<Course> findByCategoryIdOrderByIdDesc(Integer categoryId);

    Optional<Course> findBySlug(String slug);

    @Query("SELECT c FROM Course c " +
            "WHERE (:status IS NULL OR c.status = :status) " +
            "AND (:search IS NULL OR LOWER(c.name) LIKE LOWER(CONCAT('%', :search, '%'))) " +
            "AND (:isDisplayHot IS NULL OR c.isDisplayHot = :isDisplayHot)")
    Page<Course> filterCourse(@Param("status") String status,
                              @Param("search") String search,
                              @Param("isDisplayHot") Boolean isDisplayHot,
                              Pageable pageable);

    @Query("SELECT c FROM Course c WHERE c.isDisplayHot = true")
    List<Course> getRecommendCourse();

    @Procedure(procedureName = "get_course_by_slug")
    Course getCourseBySlug(@Param("in_slug") String slug);
}
