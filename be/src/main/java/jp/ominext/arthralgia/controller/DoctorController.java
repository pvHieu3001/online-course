package jp.ominext.arthralgia.controller;


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jp.ominext.arthralgia.config.LoggedUser;
import jp.ominext.arthralgia.request.MeasurementsRequest;
import jp.ominext.arthralgia.request.DoctorInterviewRequest;
import jp.ominext.arthralgia.response.DoctorInterviewResponse;
import jp.ominext.arthralgia.response.MeasurementsResponse;
import jp.ominext.arthralgia.service.DoctorInterviewService;
import jp.ominext.arthralgia.service.MeasurementService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import javax.validation.constraints.PositiveOrZero;
import java.util.List;

/**
 * Doctor input controller
 */
@RestController()
@RequestMapping("/doctor")
@Tag(name = "Doctor")
@Validated
public class DoctorController {
    private final DoctorInterviewService doctorInterviewService;
    private final MeasurementService measurementService;

    public DoctorController(DoctorInterviewService doctorInterviewService,
                            MeasurementService measurementService) {
        this.doctorInterviewService = doctorInterviewService;
        this.measurementService = measurementService;
    }

    @Operation(description = "Doctor interview")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Post info success!"),
            @ApiResponse(responseCode = "400", description = "Bad request!"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error!")
    })
    @PostMapping(value = "/input/blood_measurement")
    public ResponseEntity<MeasurementsResponse> measureBlood(@Valid @RequestBody MeasurementsRequest request) {
        MeasurementsResponse response = measurementService.createMeasurement(request);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Operation(description = "Doctor interview")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Post info success!"),
            @ApiResponse(responseCode = "400", description = "Bad request!"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error!")
    })
    @PostMapping(value = "/input/interview")
    public ResponseEntity<DoctorInterviewResponse> inputInterview(@Valid @RequestBody DoctorInterviewRequest request) {
        DoctorInterviewResponse response = doctorInterviewService.newInterview(request);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Operation(description = "Synchronize Patient interview")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Get info success!"),
            @ApiResponse(responseCode = "400", description = "Bad request!")
    })
    @GetMapping(value = "/sync/interviews")
    public ResponseEntity<List<DoctorInterviewResponse>> listInterview(
                                                @RequestParam @PositiveOrZero int page,
                                                @RequestParam @PositiveOrZero int size){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        LoggedUser loggedUser = (LoggedUser) authentication.getPrincipal();

        List<DoctorInterviewResponse> response =
                doctorInterviewService.listDoctorInterview(loggedUser.getId(), page, size);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Operation(description = "Synchronize Patient interview")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Get info success!"),
            @ApiResponse(responseCode = "400", description = "Bad request!")
    })
    @GetMapping(value = "/sync/measurements")
    public ResponseEntity<List<MeasurementsResponse>> listMeasurement(
                                                @RequestParam @PositiveOrZero int page,
                                                @RequestParam @PositiveOrZero int size){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        LoggedUser loggedUser = (LoggedUser) authentication.getPrincipal();

        List<MeasurementsResponse> response =
                measurementService.listMeasurement(loggedUser.getId(), page, size);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
