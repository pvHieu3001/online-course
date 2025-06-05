package jp.ominext.arthralgia.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jp.ominext.arthralgia.request.LoginUserRequest;
import jp.ominext.arthralgia.request.NewPasswordRequest;
import jp.ominext.arthralgia.request.RegistrationUserRequest;
import jp.ominext.arthralgia.response.LoginResponse;
import jp.ominext.arthralgia.service.PatientService;
import jp.ominext.arthralgia.validator.ValidEmail;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@RestController
@Tag(name = "Login")
@Log4j2
@Validated
public class LoginController {
    private final PatientService patientService;

    public LoginController(PatientService patientService) {
        this.patientService = patientService;
    }

    @Operation(description = "Registration new patient")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Registration info success!"),
            @ApiResponse(responseCode = "400", description = "Bad request!"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error!")
    })
    @PostMapping(value = "/registration")
    public ResponseEntity<String> registerUserAccount(@Valid @RequestBody RegistrationUserRequest userRequest,
                                                      HttpServletRequest httpRequest){
        String uid = patientService.registerUserAccount(userRequest, httpRequest);
        return new ResponseEntity<>(uid, HttpStatus.OK);
    }

    @Operation(description = "Extend active time")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Resend active email success!"),
            @ApiResponse(responseCode = "400", description = "Bad request!"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error!")
    })
    @GetMapping(value = "/extendActiveTime")
    public ResponseEntity<String> extendActiveTime(@NotBlank @RequestParam String token,
                                                    HttpServletRequest request){
        patientService.extendActiveTime(token, request);
        return new ResponseEntity<>("Extend active time success!", HttpStatus.OK);
    }

    @Operation(description = "Resend active email")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Resend active email success!"),
            @ApiResponse(responseCode = "400", description = "Bad request!"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error!")
    })
    @GetMapping(value = "/resendActiveEmail")
    public ResponseEntity<String> resendActiveEmail(
            @NotBlank @RequestParam @Size(max = 20, min = 3) @ValidEmail String email,
            HttpServletRequest request){
        patientService.resendActiveEmail(email, request);
        return new ResponseEntity<>("Resend active email success!", HttpStatus.OK);
    }

    @Operation(description = "Registration confirm")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Confirm info success!"),
            @ApiResponse(responseCode = "400", description = "Bad request!"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error!")
    })
    @GetMapping(value = "/registrationConfirm")
    public ResponseEntity<String> registerConfirm(@NotBlank @RequestParam String token){
        patientService.registerConfirm(token);
        return new ResponseEntity<>("Confirmed!", HttpStatus.OK);
    }

    @PostMapping(value = "/authenticate")
    public ResponseEntity<LoginResponse> authenticateUser(@Valid @RequestBody LoginUserRequest request) {
        String token = patientService.authWithJWT(request);
        return new ResponseEntity<>(new LoginResponse(token), HttpStatus.OK);
    }

    @Operation(description = "New password")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "New password success!"),
            @ApiResponse(responseCode = "400", description = "Bad request!"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error!")
    })
    @PostMapping(value = "/newPassword")
    public ResponseEntity<String> createNewPassword(@Valid @RequestBody NewPasswordRequest newPasswordRequest,
                                                      HttpServletRequest httpRequest){
        patientService.newPassword(newPasswordRequest, httpRequest);
        return new ResponseEntity<>("Create new password success!", HttpStatus.OK);
    }

    @Operation(description = "New password confirm")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "New password confirm success!"),
            @ApiResponse(responseCode = "400", description = "Bad request!"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error!")
    })
    @GetMapping(value = "/newPasswordConfirm")
    public ResponseEntity<String> confirmPassword(@Valid @RequestParam String token){
        patientService.newPasswordConfirm(token);
        return new ResponseEntity<>("Confirmed!", HttpStatus.OK);
    }
}
