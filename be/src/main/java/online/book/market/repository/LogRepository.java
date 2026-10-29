package online.book.market.repository;

import online.book.market.entity.model.Log;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LogRepository extends JpaRepository<Log, Integer> {
}