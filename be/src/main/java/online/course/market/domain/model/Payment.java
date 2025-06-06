package online.course.market.domain.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

/**
 * Question
 */
@Data
@Entity
@Table(name = "payments")
@NoArgsConstructor
public class Payment extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @NotNull
    private Integer orderId;
    @NotNull
    private Double amount;
    private String paymentMethod;
    private String transactionId;
    private String paymentStatus;
}