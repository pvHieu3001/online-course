package jp.ominext.arthralgia.domain.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Data
@Entity
@Table(name = "patients")
@NoArgsConstructor
public class Patient{
    /**
     * ID
     */
    @Id
    @Column(unique = true, nullable = false)
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;

    /**
     * email
     */
    private String email;

    /**
     * password
     */
    private String password;

    /**
     * temporary password
     */
    private String temporaryPassword;

    /**
     * Enable flag
     */
    private boolean enabled;

    /**
     * Last login time
     */
    private Date lastLogin;

    /**
     * Creator
     */
    private String creator;

    /**
     * Create time
     */
    private Date createAt;
}
