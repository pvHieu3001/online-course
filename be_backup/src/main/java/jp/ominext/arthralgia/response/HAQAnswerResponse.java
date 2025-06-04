package jp.ominext.arthralgia.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import jp.ominext.arthralgia.domain.model.HAQAnswer;
import jp.ominext.arthralgia.utils.Dates;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Map;

@EqualsAndHashCode(callSuper = true)
@Data
public class HAQAnswerResponse extends BaseResponse{
    @JsonProperty("answer")
    private int answer = -1;

    @JsonProperty("questionId")
    private int questionId;

    public HAQAnswerResponse(HAQAnswer haqAnswer, Map<String, String> uIdMemberMap) {
        this.date = haqAnswer.getDate().toString();
        this.answer = haqAnswer.getAnswer();
        this.questionId = haqAnswer.getQuestionId();
        this.memberId = uIdMemberMap.get(haqAnswer.getUid());
        this.created = Dates.format(haqAnswer.getCreated(), Dates.ISO_ZONED_DATETIME_FORMAT);
    }
}
