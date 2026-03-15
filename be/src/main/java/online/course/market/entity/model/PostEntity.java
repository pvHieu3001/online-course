package online.course.market.entity.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "posts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostEntity {
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
    private String lastError;
    private Integer retryCount = 0;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<MediaEntity> medias = new ArrayList<>();

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
