package online.course.market.domain.model;

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
@Table(name = "courses")
@NoArgsConstructor
public class Course extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String imageUrl;
    private String name;
    private String description;
    private String sourceUrl;
    private String slug;
    private Integer price;
    private String level;
    private String language;
    private String status;
    private Integer categoryId;
    private Double rating;
    private Integer totalStudents;
    private Integer totalRating;
}
