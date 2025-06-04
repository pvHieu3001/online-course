package jp.ominext.arthralgia.service;

import jp.ominext.arthralgia.config.LoggedUser;
import jp.ominext.arthralgia.domain.model.HAQAnswer;
import jp.ominext.arthralgia.domain.model.Question;
import jp.ominext.arthralgia.domain.repository.HAQAnswerRepository;
import jp.ominext.arthralgia.domain.repository.QuestionRepository;
import jp.ominext.arthralgia.request.PatientHAQRequest;
import jp.ominext.arthralgia.response.HAQAnswerResponse;
import jp.ominext.arthralgia.response.QuestionResponse;
import jp.ominext.arthralgia.utils.Dates;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.lang3.math.NumberUtils;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Log4j2
public class PatientHAQService {
    private final QuestionRepository questionRepository;
    private final HAQAnswerRepository haqAnswerRepository;
    private final MemberService memberService;

    public PatientHAQService(QuestionRepository questionRepository,
                             HAQAnswerRepository haqAnswerRepository,
                             MemberService memberService) {
        this.questionRepository = questionRepository;
        this.haqAnswerRepository = haqAnswerRepository;
        this.memberService = memberService;
    }

    @Transactional
    public List<HAQAnswerResponse> saveHAQAnswer(PatientHAQRequest request){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        LoggedUser loggedUser = (LoggedUser) authentication.getPrincipal();

        // Validate data
        String uid = loggedUser.getId();
        String memberUid = memberService.getMemberUid(request.getMemberId());
        if (memberUid != null) {
            uid = memberUid;
        }

        List<PatientHAQRequest.HAQAnswer> answers = request.getAnswers();
        String date = request.getDate();
        String created = request.getCreated();

        List<Integer> questionIds = answers.stream()
                .map(PatientHAQRequest.HAQAnswer::getQuestionId)
                .collect(Collectors.toList());

        List<Question> questionList = questionRepository.findAllById(questionIds);

        if (CollectionUtils.isEmpty(questionList)){
            log.error("*** List question empty!");
            return Collections.emptyList();
        }

        // Save data
        String finalUid = uid;
        Date parseDate = Dates.parseExact(date, Dates.ISO_ZONED_DATETIME_FORMAT);
        Date parseCreatedDate = Dates.parseExact(created, Dates.ISO_ZONED_DATETIME_FORMAT);

        HAQAnswer lastAnswerOnDay = null;
        List<HAQAnswer> top1AnswerOnDay = haqAnswerRepository.findByDateAndUId(parseDate, finalUid, NumberUtils.INTEGER_ONE);
        if (!top1AnswerOnDay.isEmpty()) {
            lastAnswerOnDay = top1AnswerOnDay.get(NumberUtils.INTEGER_ZERO);
        }

        if (lastAnswerOnDay == null) {
            saveListHAQAnswer(answers, finalUid, parseDate, parseCreatedDate);
            log.info("*** Save new data");
        } else if (parseCreatedDate == null || lastAnswerOnDay.getCreated() == null || lastAnswerOnDay.getCreated().before(parseCreatedDate)) {
            // Clean current data before insert new
            haqAnswerRepository.deleteByUidAndDate(finalUid, parseDate);

            saveListHAQAnswer(answers, finalUid, parseDate, parseCreatedDate);
            log.info("*** Remove exists and create new data");
        } else {
            int questionsSize = (int) questionRepository.count();
            List<HAQAnswer> lastAnswersOnDay = haqAnswerRepository.findByDateAndUId(parseDate, finalUid, questionsSize);

            if (!lastAnswersOnDay.isEmpty()) {
                log.info("*** Return last answers on day data");
                Map<String, String> mapMemberByUId = memberService.getMapMemberByUId(uid);
                return lastAnswersOnDay.stream()
                        .map(haqAnswer -> new HAQAnswerResponse(haqAnswer, mapMemberByUId))
                        .collect(Collectors.toList());
            }
        }

        return Collections.emptyList();
    }

    private void saveListHAQAnswer(List<PatientHAQRequest.HAQAnswer> answers, String finalUid,
                                   Date parseDate, Date parseCreatedDate) {
        answers.forEach(answer -> {
            HAQAnswer haqAnswer = new HAQAnswer(answer, finalUid, parseDate);
            haqAnswer.setCreated(parseCreatedDate);
            haqAnswerRepository.save(haqAnswer);
        });
    }

    /**
     * List HAQ questions
     * @return {@link List<QuestionResponse>}
     */
    @Transactional
    public List<QuestionResponse> listHAQQuestion(){
        List<Question> questionList = questionRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));

        if (CollectionUtils.isEmpty(questionList)){
            return Collections.emptyList();
        } else {
            List<QuestionResponse> questionResponseList = new ArrayList<>();
            for (Question question : questionList) {
                questionResponseList.add(new QuestionResponse(question));
            }
            return questionResponseList;
        }
    }

    /**
     * List HAQ answer
     *
     * @param uid Patient Id
     * @param page Page number
     * @param size Record number per page
     * @return List<HAQAnswerResponse>
     */
    @Transactional
    public List<HAQAnswerResponse> listAnswer(String uid, int page, int size) {
        Map<String, String> uIdMemberMap = memberService.getMapMemberByUId(uid);
        ArrayList<String> uIds = new ArrayList<>(uIdMemberMap.keySet());
        uIds.add(uid);

        List<HAQAnswer> haqAnswerList = haqAnswerRepository.findAllByUIdInWithPaging(uIds, size, page * size);

        if (CollectionUtils.isEmpty(haqAnswerList)){
            return Collections.emptyList();
        }

        return haqAnswerList.stream()
                .map(haqAnswer -> new HAQAnswerResponse(haqAnswer, uIdMemberMap))
                .collect(Collectors.toList());
    }
}
