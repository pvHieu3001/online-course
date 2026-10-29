package online.book.market.entity.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@Table(name = "books")
@NoArgsConstructor
public class Book extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(columnDefinition = "TEXT")
    private String imageUrl;
    private String amzUrl;
    private String name;
    @Column(columnDefinition = "TEXT")
    private String content;
    private String slug;
    private String status;
    private Boolean isDisplayHot;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "book_tags",
            joinColumns = @JoinColumn(name = "book_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private Set<Tag> tags;

    @ManyToOne
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    private Category category;

    @Override
    public String toString() {
        return "Book{id=" + id + ", name='" + name + "}";
    }
}
