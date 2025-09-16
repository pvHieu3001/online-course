package online.course.market.entity.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.*;

/**
 * HAQ Answer
 */
@Data
@Entity
@Table(name = "urls")
@NoArgsConstructor
public class Url {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String link;

    private Integer seqNo;

    @JsonIgnoreProperties("courses")
    @ManyToMany(mappedBy = "urls")
    private List<Course> courses = new ArrayList<>();

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Url url)) return false;
        return Objects.equals(id, url.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
