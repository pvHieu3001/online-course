package online.course.market.entity.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "posts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class PostEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "source_url", unique = true, length = 500)
    private String sourceUrl;

    @Column(columnDefinition = "TEXT CHARACTER SET utf8mb4")
    private String caption;

    @Column(nullable = false)
    private String amzUrl;

    private Boolean isPublished;

    @Column(name = "published_at")
    private LocalDateTime publishedAt;

    private String status;
    @Column(columnDefinition = "TEXT CHARACTER SET utf8mb4")
    private String lastError;
    private Integer retryCount = 0;
    private String accountThread;
    private Boolean isCaptionLink;
    private Boolean hasLink;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<MediaEntity> medias = new ArrayList<>();
}
