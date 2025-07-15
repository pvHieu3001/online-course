package online.course.market.repository;

import online.course.market.entity.model.Log;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LogRepository extends JpaRepository<Log, Integer> {
    List<Log> findByCourseId(Integer courseId);
} 