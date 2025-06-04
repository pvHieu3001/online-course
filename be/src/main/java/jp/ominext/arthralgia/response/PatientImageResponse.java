package jp.ominext.arthralgia.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import jp.ominext.arthralgia.constant.AreaType;
import jp.ominext.arthralgia.domain.model.PatientImage;
import jp.ominext.arthralgia.utils.Dates;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.logging.log4j.util.Strings;
import org.springframework.util.StringUtils;

import java.util.Map;

/**
 * Patient image response
 */
@Data
@NoArgsConstructor
public class PatientImageResponse extends BaseResponse{
    @JsonProperty("fileName")
    private String fileName;

    @JsonProperty("fileType")
    private String fileType;

    @JsonProperty("size")
    private long size;

    @JsonProperty("area_type")
    private String areaType;

    @JsonProperty("downloadURL")
    private String url;

    public PatientImageResponse(PatientImage patientImage, String url, Map<String, String> uIdMemberMap) {
        this.fileName = patientImage.getFileName();
        this.fileType = patientImage.getFileType();
        this.size = patientImage.getData().length;

        if (StringUtils.isEmpty(patientImage.getAreaType())) {
            this.areaType = Strings.EMPTY;
        } else {
            this.areaType = AreaType.valueOf(patientImage.getAreaType()).getValue();
        }
        this.date = patientImage.getDate().toString();
        this.created = Dates.format(patientImage.getCreated(), Dates.ISO_ZONED_DATETIME_FORMAT);
        this.url = url;
        this.patientId = patientImage.getUid();
        this.memberId = uIdMemberMap.get(patientImage.getUid());
    }
}
