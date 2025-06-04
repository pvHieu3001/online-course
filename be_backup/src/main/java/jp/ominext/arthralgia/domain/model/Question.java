package jp.ominext.arthralgia.domain.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

/**
 * Question
 */
@Data
@Entity
@Table(name = "questions")
@NoArgsConstructor
public class Question{
    /**
     * ID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /**
     * Title
     */
    @NotNull
    private String title;

    /**
     * Content detail
     */
    @NotNull
    private String detail;


}