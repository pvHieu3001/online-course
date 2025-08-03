package online.course.market.controller;

import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import online.course.market.entity.dto.ApiResponse;
import online.course.market.entity.dto.category.GetCategoryDto;
import online.course.market.entity.dto.category.PostCategoryDto;
import online.course.market.entity.dto.category.PutCategoryDto;
import online.course.market.entity.model.Category;
import online.course.market.service.CategoryService;
import online.course.market.utils.SlugUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@AllArgsConstructor
@RestController
@RequestMapping("api/v1/category")
@Tag(name = "Category", description = "Category controller")
public class CategoryController {
    private final CategoryService categoryService;
    private final ModelMapper modelMapper;

    @Value("${application.upload.url}")
    private String resourceFolder;

    private Path uploadDir;
    @PostConstruct
    public void init() {
        uploadDir = Paths.get(resourceFolder);
    }


    private GetCategoryDto toDto(Category category) {
        return modelMapper.map(category, GetCategoryDto.class);
    }

    @Operation(description = "Get pageable endpoint for Category", summary = "Get pageable Category")
    @GetMapping("/pageable")
    public ResponseEntity<ApiResponse<Page<GetCategoryDto>>> getPageable(Pageable pageable) {
        Page<Category> page = categoryService.getAll() instanceof Page ? (Page<Category>) categoryService.getAll() : Page.empty();
        Page<GetCategoryDto> pageDto = page.map(this::toDto);
        return ResponseEntity.ok(ApiResponse.success(pageDto));
    }

    @Operation(description = "Get all endpoint for Category", summary = "Get all Category")
    @GetMapping
    public ResponseEntity<ApiResponse<List<GetCategoryDto>>> getAll() {
        List<GetCategoryDto> dtos = categoryService.getAll().stream().map(this::toDto).collect(Collectors.toList());
        return ResponseEntity.ok(ApiResponse.success(dtos));
    }

    @Operation(description = "Get by id endpoint for Category", summary = "Get Category by id")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<GetCategoryDto>> getById(@PathVariable Integer id) {
        Category category = categoryService.getById(id);
        return ResponseEntity.ok(ApiResponse.success(toDto(category)));
    }

    @Operation(description = "Create Category", summary = "Create Category")
    @PostMapping
    public ResponseEntity<ApiResponse<GetCategoryDto>> create(@Valid @ModelAttribute PostCategoryDto dto) {
        try {
            if(!Files.exists(uploadDir)){
                Files.createDirectories(uploadDir);
            }

            String imageFilename="";
            if(dto.getImageFile() != null){
                imageFilename = UUID.randomUUID()+"_"+dto.getImageFile().getOriginalFilename();
                Path imagePath = uploadDir.resolve(imageFilename);
                Files.copy(dto.getImageFile().getInputStream(), imagePath, StandardCopyOption.REPLACE_EXISTING);
            }

            dto.setSlug(SlugUtils.toSlug(dto.getName()));
            dto.setImage("/upload/" + imageFilename);
            Category category = modelMapper.map(dto, Category.class);
            Category saved = categoryService.save(category);
            return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success("Created", toDto(saved)));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Operation(description = "Update Category", summary = "Update Category")
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<GetCategoryDto>> update(@Valid @ModelAttribute PutCategoryDto dto, @PathVariable Integer id) {
        try {
            if(!Files.exists(uploadDir)){
                Files.createDirectories(uploadDir);
            }

            String imageFilename="";
            if(dto.getImageFile() != null){
                imageFilename = UUID.randomUUID()+"_"+dto.getImageFile().getOriginalFilename();
                Path imagePath = uploadDir.resolve(imageFilename);
                Files.copy(dto.getImageFile().getInputStream(), imagePath, StandardCopyOption.REPLACE_EXISTING);
            }

            dto.setSlug(SlugUtils.toSlug(dto.getName()));
            dto.setImage("/upload/" + imageFilename);
            Category category = modelMapper.map(dto, Category.class);
            Category updated = categoryService.update(category, id);
            return ResponseEntity.ok(ApiResponse.success("Updated", toDto(updated)));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Operation(description = "Delete Category", summary = "Delete Category")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Integer id) {
        categoryService.deleteById(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(ApiResponse.success("Deleted", null));
    }
} 