package jp.ominext.arthralgia.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jp.ominext.arthralgia.config.LoggedUser;
import jp.ominext.arthralgia.response.AffectedAreaItem;
import jp.ominext.arthralgia.response.BarometricPressureResponse;
import jp.ominext.arthralgia.response.FootStepResponse;
import jp.ominext.arthralgia.response.HAQAnswerResponse;
import jp.ominext.arthralgia.response.PatientInterviewResponse;
import jp.ominext.arthralgia.service.AffectedAreaService;
import jp.ominext.arthralgia.service.HealthInfoService;
import jp.ominext.arthralgia.service.PatientHAQService;
import jp.ominext.arthralgia.service.PatientInterviewService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.constraints.PositiveOrZero;
import java.util.List;

/**
 * Patient synchronize controller
 */
@RestController()
@Log4j2
@RequestMapping("/patient/sync/")
@Tag(name = "Synchronize controller")
@Validated
public class PatientSyncController {
    private final PatientInterviewService patientInterviewService;
    private final PatientHAQService patientHAQService;
    private final AffectedAreaService affectedAreaService;
    private final HealthInfoService healthInfoService;

    @Autowired
    public PatientSyncController(PatientInterviewService patientInterviewService,
                                 PatientHAQService patientHAQService,
                                 AffectedAreaService affectedAreaService,
                                 HealthInfoService healthInfoService) {
        this.patientInterviewService = patientInterviewService;
        this.patientHAQService = patientHAQService;
        this.affectedAreaService = affectedAreaService;
        this.healthInfoService = healthInfoService;
    }

    @Operation(description = "Synchronize Patient interview")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Get info success!"),
            @ApiResponse(responseCode = "400", description = "Bad request!")
    })
    @GetMapping(value = "/interviews")
    public ResponseEntity<List<PatientInterviewResponse>> listInterview(
                                                @RequestParam @PositiveOrZero int page,
                                                @RequestParam @PositiveOrZero int size) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        LoggedUser loggedUser = (LoggedUser) authentication.getPrincipal();

        List<PatientInterviewResponse> response =
                patientInterviewService.listPatientInterview(loggedUser.getId(), page, size);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Operation(description = "Synchronize HAQ answer")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Get info success!"),
            @ApiResponse(responseCode = "400", description = "Bad request!")
    })
    @GetMapping(value = "/haqs")
    public ResponseEntity<List<HAQAnswerResponse>> listHAQAnswer(
                                                @RequestParam @PositiveOrZero int page,
                                                @RequestParam @PositiveOrZero int size) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        LoggedUser loggedUser = (LoggedUser) authentication.getPrincipal();

        List<HAQAnswerResponse> response = patientHAQService.listAnswer(loggedUser.getId(), page, size);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping(value = "/affectedAreas")
    public ResponseEntity<List<AffectedAreaItem>> listAffectedAreas(
                                                @RequestParam @PositiveOrZero int page,
                                                @RequestParam @PositiveOrZero int size) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        LoggedUser loggedUser = (LoggedUser) authentication.getPrincipal();

        List<AffectedAreaItem> response = affectedAreaService.listAffectedArea(loggedUser.getId(), page, size);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping(value = "/barometricPressures")
    public ResponseEntity<List<BarometricPressureResponse>> listBarometricPressure(
                                                @RequestParam @PositiveOrZero int page,
                                                @RequestParam @PositiveOrZero int size) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        LoggedUser loggedUser = (LoggedUser) authentication.getPrincipal();

        List<BarometricPressureResponse> response =
                healthInfoService.listBarometricPressure(loggedUser.getId(), page, size);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping(value = "/footSteps")
    public ResponseEntity<List<FootStepResponse>> listFootSteps(
                                                @RequestParam @PositiveOrZero int page,
                                                @RequestParam @PositiveOrZero int size) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        LoggedUser loggedUser = (LoggedUser) authentication.getPrincipal();

        List<FootStepResponse> response = healthInfoService.listFootSteps(loggedUser.getId(), page, size);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
