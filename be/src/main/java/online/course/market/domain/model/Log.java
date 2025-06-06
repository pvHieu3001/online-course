package online.course.market.domain.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * HAQ Answer
 */

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@Table(name = "logs")
@NoArgsConstructor
public class Log extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer userId;
    private Integer name;
    private Integer action;
    private Integer ipAddress;
    private Integer userAgent;
}
