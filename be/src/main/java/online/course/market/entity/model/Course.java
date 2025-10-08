package online.course.market.entity.model;

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
@Table(name = "courses")
@NoArgsConstructor
public class Course extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(columnDefinition = "TEXT")
    private String imageUrl;
    private String name;
    @Column(columnDefinition = "TEXT")
    private String content;
    private String slug;
    private Integer price;
    private String level;
    private String language;
    private String status;
    private Boolean isDisplayHot;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "course_tag",
            joinColumns = @JoinColumn(name = "course_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private Set<Tag> tags;

    @ManyToMany
    @JoinTable(
            name = "course_url",
            joinColumns = @JoinColumn(name = "course_id"),
            inverseJoinColumns = @JoinColumn(name = "url_id")
    )
    @OrderBy("seqNo ASC")
    private List<Url> urls = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    private Category category;

    private Double rating;
    private Integer totalStudents;
    private Integer totalRating;

    @Override
    public String toString() {
        return "Course{id=" + id + ", name='" + name + "', price=" + price + "}";
    }
}
