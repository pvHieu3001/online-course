package jp.ominext.arthralgia.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jp.ominext.arthralgia.config.LoggedUser;
import jp.ominext.arthralgia.response.PatientImageResponse;
import jp.ominext.arthralgia.service.PatientImageService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import java.util.List;

/**
 * Patient File Controller
 */
@RestController()
@Log4j2
@RequestMapping("/patient")
@Tag(name = "File Controller")
@Validated
public class PatientFileController {
    private final PatientImageService patientImageService;

    @Autowired
    public PatientFileController(PatientImageService patientImageService) {
        this.patientImageService = patientImageService;
    }
    @Operation(description = "Patient upload image")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Post info success!"),
            @ApiResponse(responseCode = "400", description = "Bad request!"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error!")
    })
    @PostMapping(value = "/uploadFile")
    public ResponseEntity<PatientImageResponse> uploadFile(@NotNull @RequestParam("file") MultipartFile file,
           @Parameter(description = "RIGHT_HAND - RH, LEFT_HAND - LH, RIGHT_FOOT - RF,  LEFT_FOOT - LF", example = "RH")
           @NotBlank @RequestParam("type") String type,
           @Parameter(example = "yyyy-MM-dd'T'HH:mm:ssZZ") @NotBlank @RequestParam("date") String date,
           @Parameter(example = "yyyy-MM-dd'T'HH:mm:ssZZ") @RequestParam(value = "created_date", required = false) String created,
           @RequestParam(value = "memberId", required = false) String memberId){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        LoggedUser loggedUser = (LoggedUser) authentication.getPrincipal();

        PatientImageResponse response = patientImageService.storeFile(file, type, loggedUser.getId(), memberId, date, created);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Operation(description = "Patient upload multiples image")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Post info success!"),
            @ApiResponse(responseCode = "400", description = "Bad request!"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error!")
    })
    @PostMapping(value = "/uploadMultipleFiles")
    public ResponseEntity<List<PatientImageResponse>> uploadMultipleFiles(
                @Size(max = 10) @NotEmpty @RequestParam("files") MultipartFile[] files,
                @RequestParam(value = "memberId", required = false) String memberId){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        LoggedUser loggedUser = (LoggedUser) authentication.getPrincipal();

        List<PatientImageResponse> response =
                patientImageService.storeMultipleFiles(files, loggedUser.getId(), memberId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Operation(description = "Download file")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Post info success!"),
            @ApiResponse(responseCode = "400", description = "Bad request!"),
            @ApiResponse(responseCode = "404", description = "Not found!"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error!")
    })
    @GetMapping("/download/{fileId}")
    //TODO: memberId / uid
    public ResponseEntity<Resource> downloadFile(@PathVariable("fileId") String fileId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        LoggedUser loggedUser = (LoggedUser) authentication.getPrincipal();

        return patientImageService.loadFileResource(fileId, loggedUser);
    }

    @Operation(description = "Search and download zip file")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Post info success!"),
            @ApiResponse(responseCode = "400", description = "Bad request!"),
            @ApiResponse(responseCode = "404", description = "Not found!")
    })
    @GetMapping(value = "/sync/images/zip-download", produces="application/zip")
    public void searchAndDownloadZipFile(@RequestParam @PositiveOrZero int page,
                                         @RequestParam @PositiveOrZero int size,
                                         @RequestParam(value = "memberId", required = false) String memberId,
                                         HttpServletResponse response) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        LoggedUser loggedUser = (LoggedUser) authentication.getPrincipal();

        patientImageService.searchAndDownloadZipFile(loggedUser.getId(), page, size, response, memberId);
    }

    @Operation(description = "List image")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Get list success!"),
            @ApiResponse(responseCode = "400", description = "Bad request!"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error!")
    })
    @GetMapping(value = "/listFile")
    public ResponseEntity<List<PatientImageResponse>> listImage(
            @RequestParam(value = "page", required = false) @PositiveOrZero int page,
            @RequestParam(value = "size", required = false) @PositiveOrZero int size,
            @RequestParam(value = "memberId", required = false) String memberId,
            @RequestParam(value = "startDate", required = false) String startDate,
            @RequestParam(value = "endDate", required = false) String endDate
    ){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        LoggedUser loggedUser = (LoggedUser) authentication.getPrincipal();

        List<PatientImageResponse> response =
                patientImageService.listImage(page, size, loggedUser, memberId, startDate, endDate);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
