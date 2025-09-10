package online.course.market.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import online.course.market.entity.dto.ApiResponse;
import online.course.market.entity.dto.affiliate.link.AffiliateLinkDto;
import online.course.market.entity.dto.affiliate.link.AffiliateLinkPostRequest;
import online.course.market.entity.dto.affiliate.link.AffiliateLinkPutRequest;
import online.course.market.entity.model.AffiliateLink;
import online.course.market.service.AffiliateService;
import online.course.market.service.LogService;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static online.course.market.utils.Constant.LOG_ACTION_GET_ALL_BLOG;
import static online.course.market.utils.Constant.LOG_VIEW_BLOG;

@Slf4j
@RestController
@RequestMapping("api/v1/admin/affiliate")
@Tag(name = "Blog", description = "Blog controller")
public class AdminAffiliateController {
    private final AffiliateService affiliateService;
    private final ModelMapper modelMapper;
    private final LogService logService;
    private final String env;

    public AdminAffiliateController(AffiliateService affiliateService, ModelMapper modelMapper, LogService logService, String env) {
        this.affiliateService = affiliateService;
        this.modelMapper = modelMapper;
        this.logService = logService;
        this.env = env;
    }

    @PostMapping("/create")
    public ResponseEntity<?> createLink(@RequestBody AffiliateLinkPostRequest request) {
        AffiliateLink link = affiliateService.createAffiliateLink(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(link);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateLink(@PathVariable Long id, @RequestBody AffiliateLinkPutRequest request) {
        try {
            AffiliateLink updated = affiliateService.updateAffiliateLink(id, request);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
} 