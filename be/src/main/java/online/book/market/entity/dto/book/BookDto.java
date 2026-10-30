package online.book.market.entity.dto.book;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import online.book.market.entity.dto.category.CategoryDto;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class BookDto {
    private Integer id;
    private String imageUrl;
    private String amzUrl;
    private String name;
    private String description;
    private String content;
    private String slug;
    private String status;
    private Boolean isDisplayHot;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private CategoryDto category;

}
