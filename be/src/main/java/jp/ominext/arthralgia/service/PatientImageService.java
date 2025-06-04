package jp.ominext.arthralgia.service;

import jp.ominext.arthralgia.config.LoggedUser;
import jp.ominext.arthralgia.constant.AreaType;
import jp.ominext.arthralgia.constant.ErrorMessage;
import jp.ominext.arthralgia.domain.model.Member;
import jp.ominext.arthralgia.domain.model.Patient;
import jp.ominext.arthralgia.domain.model.PatientImage;
import jp.ominext.arthralgia.domain.repository.PatientImageRepository;
import jp.ominext.arthralgia.domain.repository.PatientRepository;
import jp.ominext.arthralgia.exception.ServiceException;
import jp.ominext.arthralgia.response.PatientImageResponse;
import jp.ominext.arthralgia.utils.Dates;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StreamUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.sql.Timestamp;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;
import java.util.stream.Collectors;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

@Service
@Log4j2
public class PatientImageService {
    private final PatientImageRepository patientImageRepository;
    private final PatientRepository patientRepository;
    private final MemberService memberService;

    @Value("${base.ip}")
    private String baseIp;

    @Value("${base.url}")
    private String baseUrl;

    public PatientImageService(PatientImageRepository patientImageRepository,
                               PatientRepository patientRepository,
                               MemberService memberService) {
        this.patientImageRepository = patientImageRepository;
        this.patientRepository = patientRepository;
        this.memberService = memberService;
    }

    /**
     * Store symptom image
     * @param file {@link MultipartFile}
     * @param type Area type
     * @param uid Uid
     * @param memberId Member's Id
     * @param date {@link Date}
     * @param created Created date
     * @return {@link PatientImageResponse}
     */
    @Transactional
    public PatientImageResponse storeFile(MultipartFile file, String type,
                                          String uid, String memberId,
                                          String date, String created){
        log.info("***Save patient image");
        Map<String, String> uIdMemberMap = new HashMap<>();
        String memberUid = memberService.getMemberUid(memberId);
        if (memberUid != null) {
            uid = memberUid;
            uIdMemberMap.put(uid, memberId);
        } else {
            uIdMemberMap.put(uid, uid);
        }

        Patient patient = patientRepository.findFirstById(uid);

        if (patient == null) {
            throw new ServiceException("Patient not exist!", ErrorMessage.E_NOT_FOUND);
        }
        return getPatientImageResponse(file, type, uid, date, created, uIdMemberMap);
    }

    @Transactional
    public PatientImageResponse getPatientImageResponse(MultipartFile file, String type, String uid,
                                                        String date, String created, Map<String, String> uIdMemberMap) {
        PatientImageResponse result;

        if (file == null) {
            return null;
        }

        // Normalize file name
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        try {
            // Check if the file's name contains invalid characters
            if(fileName.contains("..")) {
                throw new ServiceException("Sorry! Filename contains invalid path sequence " + fileName);
            }

            String startDateStr = Dates.getStartOfDayDateString(date);
            String endDateStr = Dates.getEndOfDayDateString(date);

            if (startDateStr == null || endDateStr == null) {
                log.info("***Date time values invalid!");
                return null;
            }

            Date startDate = Dates.parseExact(startDateStr, Dates.ISO_ZONED_DATETIME_FORMAT);
            Date endDate = Dates.parseExact(endDateStr, Dates.ISO_ZONED_DATETIME_FORMAT);
            Date createdDate = Dates.parseExact(created, Dates.ISO_ZONED_DATETIME_FORMAT);

            Date saveDate = Dates.parseExact(date, Dates.ISO_ZONED_DATETIME_FORMAT);
            AreaType areaType = AreaType.of(type);

            PatientImage checkImage = patientImageRepository.findOneByDateBetween(
                    areaType.name(), startDate, endDate, uid);

            if (checkImage == null) {
                PatientImage patientImage = new PatientImage(uid, areaType, saveDate, file);
                patientImage.setCreated(createdDate);
                patientImageRepository.save(patientImage);
                log.info("Add new image type {} created at {}", areaType.name(), date);
            } else if (createdDate == null || checkImage.getCreated() == null || checkImage.getCreated().before(createdDate)) {
                checkImage.setData(file.getBytes());
                checkImage.setFileName(file.getOriginalFilename());
                checkImage.setFileType(file.getContentType());
                checkImage.setDate(new Timestamp(saveDate.getTime()));
                checkImage.setCreated(createdDate);
                checkImage.setUpdated(Dates.now());
                patientImageRepository.save(checkImage);

                log.info("Update exist image type {} created at {}", areaType.name(), date);
            } else {
                return new PatientImageResponse(checkImage, getDownloadUrl(checkImage.getId()), uIdMemberMap);
            }
        } catch (IOException ex) {
            throw new ServiceException("Could not store file " + fileName + ". Please try again!");
        }

        return null;
    }

    @Transactional
    public List<PatientImageResponse> storeMultipleFiles(MultipartFile[] files, String uid, String memberId){
        String memberUid = memberService.getMemberUid(memberId);
        Map<String, String> uIdMemberMap = new HashMap<>();
        if (memberUid != null) {
            uid = memberUid;
            uIdMemberMap.put(uid, memberId);
        } else {
            uIdMemberMap.put(uid, uid);
        }

        Patient patient = patientRepository.findFirstById(uid);

        if (patient == null) {
            throw new ServiceException("Patient not exist!", ErrorMessage.E_NOT_FOUND);
        }

        String finalUid = uid;
        return Arrays.stream(files)
                .map(file -> getPatientImageResponse(file, null, finalUid, null, null, uIdMemberMap))
                .collect(Collectors.toList());
    }

    /**
     * List patient's symptoms image
     *
     * @param page Page number
     * @param size Record number per page
     * @param loggedUser Logged user info
     * @param memberId Member's Id
     * @param startDate Start query date
     * @param endDate End query date
     * @return List Image
     */
    @Transactional
    public List<PatientImageResponse> listImage(int page, int size, LoggedUser loggedUser, String memberId,
                                                String startDate, String endDate) {
        log.info("***Get list image");
        String uid;
        String memberUid = memberService.getMemberUid(memberId);
        Map<String, String> uIdMemberMap = new HashMap<>();

        if (memberUid != null) {
            uid = memberUid;
            uIdMemberMap.put(uid, memberId);
        } else {
            uid = loggedUser.getId();
            List<Member> memberList = memberService.findAllByPatientUid(uid);
            uIdMemberMap.putAll(memberList.stream().collect(Collectors.toMap(Member::getUid, Member::getId)));
        }

        ArrayList<String> uIds = new ArrayList<>(uIdMemberMap.keySet());

        Date startParseDate = Dates.parseExact(startDate, Dates.ISO_ZONED_DATETIME_FORMAT);
        Date endParseDate = Dates.parseExact(endDate, Dates.ISO_ZONED_DATETIME_FORMAT);

        List<PatientImage> imageList = new ArrayList<>();
        if (startParseDate != null && endParseDate != null) {
            // search with range date
            imageList = patientImageRepository.findAllByDateBetweenAndUid(uid, startParseDate, endParseDate);
        } else if (page >= 0 && size > 0) {
            // Search with paging
            imageList = patientImageRepository.findAllByUidInWithPaging(uIds, size, page * size);
        }

        if (CollectionUtils.isEmpty(imageList)) {
            return Collections.emptyList();
        }

        return imageList.stream()
                .map(patientImage -> new PatientImageResponse(patientImage, getDownloadUrl(patientImage.getId()), uIdMemberMap))
                .collect(Collectors.toList());
    }

    /**
     * Load file resource from DB
     * @param fileId File Id
     * @param loggedUser {@link LoggedUser}
     * @return {@link ResponseEntity<Resource>}
     */
    @Transactional
    public ResponseEntity<Resource> loadFileResource(String fileId, LoggedUser loggedUser) {
        String uid = loggedUser.getId();

        List<Member> members = memberService.findAllByPatientUid(uid);
        List<String> allMemberUIds = new ArrayList<>();

        if (!members.isEmpty()) {
            allMemberUIds.addAll(members.stream().map(Member::getUid).collect(Collectors.toList()));
        }

        PatientImage patientImage = patientImageRepository.findByIdAndUIds(fileId, allMemberUIds);
        if (patientImage == null) {
            throw new ServiceException("File not exist!", ErrorMessage.E_NOT_FOUND, HttpStatus.NOT_FOUND);
        } else {
            InputStreamResource inputStreamResource = new InputStreamResource(
                    new ByteArrayInputStream(patientImage.getData()));

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(patientImage.getFileType()))
                    .header(HttpHeaders.CONTENT_DISPOSITION,
                            "attachment; filename=\"" + patientImage.getFileName() + "\"")
                    .body(inputStreamResource);
        }
    }

    /**
     * Search patient images and download zip file
     * @param uid Patient Id
     * @param page Page number
     * @param size Record number per page
     * @param response {@link HttpServletResponse}
     * @param memberId Member ID
     */
    @Transactional
    public void searchAndDownloadZipFile(String uid, int page, int size, HttpServletResponse response, String memberId) {
        try (ZipOutputStream zipOut = new ZipOutputStream(response.getOutputStream())) {
            String memberUid = memberService.getMemberUid(memberId);
            if (memberUid != null) {
                uid = memberUid;
            }

            List<PatientImage> patientImageList =
                    patientImageRepository.findAllByUidInWithPaging(Collections.singletonList(uid), size, page * size);

            if (CollectionUtils.isEmpty(patientImageList)){
                log.info("Image not found!");
                return;
            }

            ZoneId zoneJST = ZoneId.of(ZoneId.SHORT_IDS.get("JST"));

            String zipFileName = uid + ".zip";

            for (PatientImage image : patientImageList) {
                ZipEntry zipEntry = new ZipEntry(String.join(
                        "_",
                        Dates.format(image.getDate(), Dates.ISO_DATE_FORMAT, TimeZone.getTimeZone(zoneJST)),
                        AreaType.valueOf(image.getAreaType()).getValue(),
                        image.getFileName()
                ));
                zipEntry.setSize(image.getData().length);
                zipEntry.setComment(image.getAreaType());
                zipOut.putNextEntry(zipEntry);
                StreamUtils.copy(image.getData(), zipOut);
                zipOut.closeEntry();
            }

            zipOut.finish();
            response.setStatus(HttpServletResponse.SC_OK);
            response.addHeader(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + zipFileName + "\"");
            response.setHeader(HttpHeaders.CONTENT_TYPE, "application - download");
            log.info("Download zip file OK {}", zipFileName);

        } catch (IOException e){
            throw new ServiceException(e.getLocalizedMessage(), ErrorMessage.INTERNAL_SERVER_ERROR,
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Create file download URL
     *
     * @param fileId File Id
     * @return Direct link download
     */
    public String getDownloadUrl(String fileId) {

        String url = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/patient/download/")
                .path(fileId)
                .toUriString();
        url = replaceURL(url);
        return url;
    }

    private String replaceURL(String appUrl) {
        return appUrl.replace(baseIp, baseUrl).replace("http", "https");
    }
}
