package jp.ominext.arthralgia.domain.repository;

import jp.ominext.arthralgia.domain.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Integer> {
}
