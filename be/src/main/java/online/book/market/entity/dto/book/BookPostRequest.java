package online.book.market.entity.dto.book;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class BookPostRequest {
    private MultipartFile imageFile;
    private String imageUrl;
    private String amzUrl;
    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters")
    private String name;
    private String description;
    private String content;
    private String slug;
    private String status;
    private Boolean isDisplayHot;
    private Integer categoryId;
}
