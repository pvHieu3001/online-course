package online.course.market.entity.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "orders")
@NoArgsConstructor
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @NotNull
    private Double subTotal;
    protected Double discountAmount;
    @NotNull
    protected Double totalAmount;
    protected Integer couponId;
    @NotNull
    protected String status;
}
