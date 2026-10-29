package online.book.market.entity.dto.blog;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import online.book.market.entity.dto.tag.TagDto;
import online.book.market.entity.dto.user.UserDto;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BlogDto {
    private Integer id;
    private String title;
    private String description;
    private String content;
    private String image;
    private String slug;
    private Boolean status;
    private String type;
    private Boolean isTrending;
    private Boolean isTrendingNew;
    private UserDto updatedBy;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Set<TagDto> tags;
} 