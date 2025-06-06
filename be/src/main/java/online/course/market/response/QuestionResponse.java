package online.course.market.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import online.course.market.domain.model.Payment;
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

    public QuestionResponse(Payment question) {
        this.id = question.getId();
    }
}
