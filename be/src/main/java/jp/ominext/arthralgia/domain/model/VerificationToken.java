package jp.ominext.arthralgia.domain.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Table(name = "verification_tokens")
@Data
@NoArgsConstructor
public class VerificationToken {
    /**
     * ID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /**
     * Token
     */
    private String token;

    /**
     * Expired date
     */
    @NotNull
    private Date expiredDate;

    /**
     * Device id
     */
    @NotNull
    private String uid;

    public VerificationToken(String token, @NotNull Date expiredDate, @NotNull String uid) {
        this.token = token;
        this.expiredDate = expiredDate;
        this.uid = uid;
    }
}
