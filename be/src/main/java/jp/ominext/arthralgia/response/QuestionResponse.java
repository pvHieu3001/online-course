package jp.ominext.arthralgia.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import jp.ominext.arthralgia.domain.model.Question;
import lombok.Data;

/**
 * Question response
 */
@Data
public class QuestionResponse {
    @JsonProperty("id")
    private Integer id;

    @JsonProperty("title")
    private String title;

    @JsonProperty("detail")
    private String detail;

    public QuestionResponse(Question question) {
        this.id = question.getId();
        this.title = question.getTitle();
        this.detail = question.getDetail();
    }
}
