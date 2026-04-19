package online.course.market.entity.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@Table(name = "books")
@NoArgsConstructor
public class Book extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String title;
    private String author;
    @Column(columnDefinition = "TEXT")
    private String description;
    private String imageUrl;
    @Column(columnDefinition = "TEXT")
    private String affiliateUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private BookCategory category;


}
