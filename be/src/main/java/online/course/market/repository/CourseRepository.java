package online.course.market.repository;

import java.util.Optional;

import online.course.market.entity.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Long>{
    Optional<Course> findByName(final String name);
}
