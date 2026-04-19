package online.course.market.entity.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;


@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@Table(name = "book_categories")
@NoArgsConstructor
public class BookCategory extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = false, unique = true)
    private String slug; // Ví dụ: /books, /chung-khoan

    private String description;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    private List<Book> books;
}
