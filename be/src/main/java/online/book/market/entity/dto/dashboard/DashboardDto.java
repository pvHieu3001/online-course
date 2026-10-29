package online.book.market.entity.dto.dashboard;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class DashboardDto {
    private Long numberBook;
    private Long numberPost;
    private Long numberUser;
    private Long numberDownload;
}
