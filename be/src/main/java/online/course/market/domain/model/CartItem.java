package online.course.market.domain.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.sql.Date;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@Table(name = "cart_items")
@NoArgsConstructor
public class CartItem extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer CourseId;
    private Double price;
    private Date addedAt;
}
