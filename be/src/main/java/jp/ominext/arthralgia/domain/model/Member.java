package jp.ominext.arthralgia.domain.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import java.util.Date;

@Data
@Entity
@Table(name = "members")
@NoArgsConstructor
public class Member {
    /**
     * ID
     */
    @Id
    @Column(unique = true, nullable = false)
    private String id;

    /**
     * Name
     */
    private String name;

    /**
     * Patient id
     */
    @NotNull
    protected String uid;

    /**
     * Parent's Patient id
     */
    @NotNull
    protected String parentUid;

    /**
     * Create time
     */
    private Date createAt;

    /**
     * Update time
     */
    private Date updateAt;
}
