package jp.ominext.arthralgia.domain.model;

import jp.ominext.arthralgia.request.PatientHAQRequest;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.sql.Timestamp;
import java.util.Date;

/**
 * HAQ Answer
 */

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@Table(name = "haq_answers")
@NoArgsConstructor
public class HAQAnswer extends BaseEntity {
    /**
     * ID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /**
     * Question ID
     */
    private Integer questionId;

    /**
     * Answer
     */
    private Integer answer;

    public HAQAnswer(PatientHAQRequest.HAQAnswer request, String uid, Date date){
        this.questionId = request.getQuestionId();
        this.answer = request.getAnswer();
        this.uid = uid;
        this.date = new Timestamp(date.getTime());
    }
}
