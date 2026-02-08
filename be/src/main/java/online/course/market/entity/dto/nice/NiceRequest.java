package online.course.market.entity.dto.nice;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class NiceRequest {
    public String encData;
    public String integrityValue;
    public String tokenVersionId;
    public String niceUrl;
}
