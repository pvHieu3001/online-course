package online.book.market.entity.dto.amazon;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MediaDto {
    private Long id;
    private String cloudinaryUrl;
    private String mediaType;
}
