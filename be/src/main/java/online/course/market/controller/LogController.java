package online.course.market.controller;

import lombok.AllArgsConstructor;
import online.course.market.entity.dto.ApiResponse;
import online.course.market.entity.dto.log.LogRequestDto;
import online.course.market.entity.dto.log.LogResponseDto;
import online.course.market.entity.model.Log;
import online.course.market.service.LogService;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/log")
@AllArgsConstructor
public class LogController {
    private final LogService logService;
    private final ModelMapper modelMapper;

    private LogResponseDto toDto(Log log) {
        return modelMapper.map(log, LogResponseDto.class);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<LogResponseDto>>> getAll() {
        List<LogResponseDto> dtos = logService.getAll().stream().map(this::toDto).collect(Collectors.toList());
        return ResponseEntity.ok(ApiResponse.success(dtos));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<LogResponseDto>> getById(@PathVariable Integer id) {
        Log log = logService.getById(id);
        if (log == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ApiResponse.error(HttpStatus.NOT_FOUND.value(),"Not found"));
        return ResponseEntity.ok(ApiResponse.success(toDto(log)));
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<ApiResponse<List<LogResponseDto>>> getByCourseId(@PathVariable Integer courseId) {
        List<LogResponseDto> dtos = logService.getByCourseId(courseId).stream().map(this::toDto).collect(Collectors.toList());
        return ResponseEntity.ok(ApiResponse.success(dtos));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<LogResponseDto>> create(@RequestBody LogRequestDto dto) {
        Log log = modelMapper.map(dto, Log.class);
        Log saved = logService.save(log);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success("Created", toDto(saved)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<LogResponseDto>> update(@RequestBody LogRequestDto dto, @PathVariable Integer id) {
        Log log = modelMapper.map(dto, Log.class);
        Log updated = logService.update(log, id);
        if (updated == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ApiResponse.error(HttpStatus.NOT_FOUND.value(),"Not found"));
        return ResponseEntity.ok(ApiResponse.success("Updated", toDto(updated)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Integer id) {
        logService.deleteById(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(ApiResponse.success("Deleted", null));
    }
} 