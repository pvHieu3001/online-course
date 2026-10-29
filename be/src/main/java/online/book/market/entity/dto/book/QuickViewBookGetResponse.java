package online.book.market.entity.dto.book;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import online.book.market.entity.dto.category.CategoryDto;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class QuickViewBookGetResponse {
    private List<BookDto> listBook;
    private CategoryDto category;
}
