package jp.ominext.arthralgia.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jp.ominext.arthralgia.request.PatientMemberRequest;
import jp.ominext.arthralgia.request.UpdateMemberRequest;
import jp.ominext.arthralgia.response.MemberResponse;
import jp.ominext.arthralgia.service.MemberService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import java.util.List;

/**
 * Patient member controller
 */
@RestController()
@Log4j2
@RequestMapping("/patient/member/")
@Tag(name = "Member controller")
@Validated
public class PatientMemberController {
    private final MemberService memberService;

    @Autowired
    public PatientMemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @Operation(description = "Patient list member")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Get info success!"),
            @ApiResponse(responseCode = "400", description = "Bad request!")
    })
    @GetMapping(value = "/list")
    public ResponseEntity<List<MemberResponse>> listMember() {
        List<MemberResponse> response = memberService.listMember();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Operation(description = "Patient new member")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Post info success!"),
            @ApiResponse(responseCode = "400", description = "Bad request!"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error!")
    })
    @PostMapping(value = "/new")
    public ResponseEntity<List<MemberResponse>> createNewMember(@Valid @RequestBody PatientMemberRequest request){
        List<MemberResponse> responses = memberService.newMember(request);
        return new ResponseEntity<>(responses, HttpStatus.OK);
    }

    @Operation(description = "Patient update member")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Post info success!"),
            @ApiResponse(responseCode = "400", description = "Bad request!"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error!")
    })
    @PutMapping(value = "/update")
    public ResponseEntity<String> updateMember(@Valid @RequestBody UpdateMemberRequest request){
        String memberId = memberService.updateMember(request);
        return new ResponseEntity<>(memberId, HttpStatus.OK);
    }

    @Operation(description = "Patient delete member")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Post info success!"),
            @ApiResponse(responseCode = "400", description = "Bad request!"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error!")
    })
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<String> deleteMember(@PathVariable @NotBlank String id){
        memberService.deleteMember(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
