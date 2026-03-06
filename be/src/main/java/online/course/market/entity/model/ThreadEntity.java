package online.course.market.entity.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "thread")
public class ThreadEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String urlPost;

    @Column(nullable = false)
    private String urlAmz;

    private String cap;
    private Boolean isPublished;
}
