package jp.ominext.arthralgia.domain.model;

import jp.ominext.arthralgia.request.PatientInterviewRequest;
import jp.ominext.arthralgia.utils.Dates;
import jp.ominext.arthralgia.utils.Strings;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@Table(name = "patient_interviews")
@NoArgsConstructor
public class PatientInterview extends BaseEntity {
    /**
     * ID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /**
     * Paint VAS
     */
    private Integer pVas;

    /**
     * Global VAS
     */
    private Integer gVas;

    /**
     * Stiffened Time Span
     */
    private String stiffenedTimeSpan;

    public PatientInterview(PatientInterviewRequest request, String uid){
        this.gVas = request.getGVas();
        this.pVas = request.getPVas();
        this.stiffenedTimeSpan = Strings.nvl(request.getStiffenedTimeSpan());
        this.date = Dates.parseExact(request.getDate(), Dates.ISO_ZONED_DATETIME_FORMAT);
        this.uid = uid;
    }
}
