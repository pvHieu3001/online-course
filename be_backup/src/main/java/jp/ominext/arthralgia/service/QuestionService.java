package jp.ominext.arthralgia.service;

import jp.ominext.arthralgia.domain.model.Question;
import jp.ominext.arthralgia.domain.repository.QuestionRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Log4j2
public class QuestionService {
    private final QuestionRepository questionRepository;

    public QuestionService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    @Transactional
    public List<Question> listQuestion(){
        return questionRepository.findAll(Sort.by(Sort.Direction.ASC,"id"));
    }
}
