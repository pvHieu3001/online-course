package jp.ominext.arthralgia.domain.model;

import jp.ominext.arthralgia.constant.AreaType;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.web.multipart.MultipartFile;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import java.io.IOException;
import java.sql.Timestamp;
import java.util.Date;

@Data
@Entity
@Table(name = "patient_images")
@NoArgsConstructor
public class PatientImage extends BaseEntity{
    /**
     * ID
     */
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;

    /**
     * File name
     */
    private String fileName;

    /**
     * File type
     */
    private String fileType;

    /**
     * Area type
     */
    @NotNull
    private String areaType;

    /**
     * Blob data
     */
    @Lob
    private byte[] data;

    public PatientImage(String uid, AreaType areaType, Date date, MultipartFile file) throws IOException {
        this.uid = uid;
        this.date = new Timestamp(date.getTime());
        this.fileName = file.getOriginalFilename();
        this.fileType = file.getContentType();
        if (areaType != null) {
            this.areaType = areaType.name();
        }
        this.data = file.getBytes();
    }
}
