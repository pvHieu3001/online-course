package online.course.market.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import online.course.market.entity.dto.ApiResponse;
import online.course.market.entity.dto.tag.TagDto;
import online.course.market.service.LogService;
import online.course.market.service.TagService;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import static online.course.market.utils.Constant.LOG_ACTION_GET_ALL_TAG;
import static online.course.market.utils.Constant.LOG_VIEW_TAG;

@Slf4j
@RestController
@RequestMapping("api/v1/admin/tag")
@Tag(name = "Tag", description = "Tag controller")
public class TagController {
    private final TagService tagService;
    private final ModelMapper modelMapper;
    private final LogService logService;
    private final String env;

    public TagController(TagService tagService, ModelMapper modelMapper, LogService logService, String env) {
        this.tagService = tagService;
        this.modelMapper = modelMapper;
        this.logService = logService;
        this.env = env;
    }

    private TagDto toDto(online.course.market.entity.model.Tag tag) {
        return modelMapper.map(tag, TagDto.class);
    }

    @Operation(description = "Get all endpoint for Tag", summary = "Get all Tag")
    @GetMapping
    public ResponseEntity<ApiResponse<List<TagDto>>> getAll(HttpServletRequest request) {
        logService.save(env, request, LOG_VIEW_TAG, LOG_ACTION_GET_ALL_TAG, HttpMethod.GET.name());
        List<TagDto> dtos = tagService.getAll().stream().map(this::toDto).toList();
        return ResponseEntity.ok(ApiResponse.success(dtos));
    }
}