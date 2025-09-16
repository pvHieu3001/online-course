package online.course.market.entity.dto.url;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class UrlDto {
    private Integer id;
    private String link;
    private Integer seqNo;
}
