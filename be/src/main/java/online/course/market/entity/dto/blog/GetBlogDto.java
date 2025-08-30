package online.course.market.entity.dto.blog;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import online.course.market.entity.dto.user.GetUserDto;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GetBlogDto {
    private Integer id;
    private String title;
    private String description;
    private String content;
    private String image;
    private String slug;
    private Boolean status;
    private String type;
    private Boolean isDisplayHot;
    private GetUserDto updatedBy;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
} 