package jp.ominext.arthralgia.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jp.ominext.arthralgia.request.HealthInfoRequest;
import jp.ominext.arthralgia.request.PatientAffectedAreasRequest;
import jp.ominext.arthralgia.request.PatientHAQRequest;
import jp.ominext.arthralgia.request.PatientInterviewRequest;
import jp.ominext.arthralgia.response.AffectedAreaItem;
import jp.ominext.arthralgia.response.FootStepResponse;
import jp.ominext.arthralgia.response.HAQAnswerResponse;
import jp.ominext.arthralgia.response.PatientInterviewResponse;
import jp.ominext.arthralgia.response.QuestionResponse;
import jp.ominext.arthralgia.service.AffectedAreaService;
import jp.ominext.arthralgia.service.PatientHAQService;
import jp.ominext.arthralgia.service.PatientInterviewService;
import jp.ominext.arthralgia.service.HealthInfoService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import java.util.List;

/**
 * Patient input controller
 */
@RestController()
@Log4j2
@RequestMapping("/patient")
@Tag(name = "Input controller")
public class PatientInputController {
    private final PatientInterviewService patientInterviewService;
    private final PatientHAQService patientHAQService;
    private final AffectedAreaService affectedAreaService;
    private final HealthInfoService healthInfoService;

    @Autowired
    public PatientInputController(PatientInterviewService patientInterviewService,
                                  PatientHAQService patientHAQService,
                                  AffectedAreaService affectedAreaService,
                                  HealthInfoService healthInfoService) {
        this.patientInterviewService = patientInterviewService;
        this.patientHAQService = patientHAQService;
        this.affectedAreaService = affectedAreaService;
        this.healthInfoService = healthInfoService;
    }

    @Operation(description = "Patient interview")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Post info success!"),
            @ApiResponse(responseCode = "400", description = "Bad request!"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error!")
    })
    @PostMapping(value = "/input/interview")
    public ResponseEntity<PatientInterviewResponse> inputInterview(@Valid @RequestBody PatientInterviewRequest request){
        PatientInterviewResponse response = patientInterviewService.newInterview(request);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Operation(description = "Patient input body condition")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Post info success!"),
            @ApiResponse(responseCode = "400", description = "Bad request!"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error!")
    })
    @PostMapping(value = "/input/body_condition")
    //TODO
    public ResponseEntity<Void> inputBodyCondition(){
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Operation(description = "Patient input haq")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Post info success!"),
            @ApiResponse(responseCode = "400", description = "Bad request!"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error!")
    })
    @PostMapping(value = "/input/haq")
    public ResponseEntity<List<HAQAnswerResponse>> inputHAQ(@Valid @RequestBody PatientHAQRequest request){
        List<HAQAnswerResponse> responses = patientHAQService.saveHAQAnswer(request);
        return new ResponseEntity<>(responses, HttpStatus.OK);
    }

    @Operation(description = "List HAQ questions")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Post info success!"),
            @ApiResponse(responseCode = "400", description = "Bad request!"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error!")
    })
    @GetMapping(value = "/list/haq_question")
    public ResponseEntity<List<QuestionResponse>> listHAQQuestion(){
        List<QuestionResponse> questionList = patientHAQService.listHAQQuestion();
        return new ResponseEntity<>(questionList, HttpStatus.OK);
    }
    @PostMapping(value = "/input/affected_areas")
    public ResponseEntity<List<AffectedAreaItem>> inputAffectedAreas(
            @Valid @RequestBody PatientAffectedAreasRequest request){
        List<AffectedAreaItem> responses = affectedAreaService.newAffectedArea(request);
        return new ResponseEntity<>(responses, HttpStatus.OK);
    }

    @Operation(description = "Patient input health info: barometric pressure & foot step")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Post info success!"),
            @ApiResponse(responseCode = "400", description = "Bad request!"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error!")
    })
    @PostMapping(value = "/input/healthInfo")
    public ResponseEntity<FootStepResponse> saveHealthInfo(@Valid @RequestBody HealthInfoRequest request){
        FootStepResponse response = healthInfoService.saveHealthInfo(request);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
