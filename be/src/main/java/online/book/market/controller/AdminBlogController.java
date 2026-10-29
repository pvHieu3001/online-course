package online.book.market.controller;

import com.cloudinary.Cloudinary;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import online.book.market.entity.dto.ApiResponse;
import online.book.market.entity.dto.blog.BlogDto;
import online.book.market.entity.dto.blog.BlogPostRequest;
import online.book.market.entity.dto.blog.BlogPutRequest;
import online.book.market.entity.model.Blog;
import online.book.market.entity.model.Tag;
import online.book.market.service.BlogService;
import online.book.market.service.TagService;
import online.book.market.utils.DataUtils;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Slf4j
@RestController
@RequestMapping("api/v1/admin/blog")
@io.swagger.v3.oas.annotations.tags.Tag(name = "Blog", description = "Blog controller")
public class AdminBlogController {
    private final BlogService blogService;
    private final TagService tagService;
    private final ModelMapper modelMapper;
    private final Cloudinary cloudinary;

    public AdminBlogController(BlogService blogService, TagService tagService, ModelMapper modelMapper, Cloudinary cloudinary) {
        this.blogService = blogService;
        this.tagService = tagService;
        this.modelMapper = modelMapper;
        this.cloudinary = cloudinary;
    }

    private String uploadBlogImage(MultipartFile imageFile) throws Exception {
        Map<String, Object> uploadOptions = new HashMap<>();
        uploadOptions.put("resource_type", "image");
        uploadOptions.put("folder", "blogs");
        uploadOptions.put("public_id", UUID.randomUUID().toString());
        uploadOptions.put("overwrite", true);
        Map<?, ?> uploadResult = cloudinary.uploader().upload(imageFile.getBytes(), uploadOptions);
        return (String) uploadResult.get("secure_url");
    }

    private BlogDto toDto(Blog blog) {
        return modelMapper.map(blog, BlogDto.class);
    }

    @Operation(description = "Get all endpoint for Blog", summary = "Get all Blog with Pagination")
    @GetMapping
    public ResponseEntity<ApiResponse<Page<BlogDto>>> getAll(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String isTrending,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Boolean displayHot =
                isTrending == null || isTrending.isBlank() ? null :
                        "1".equals(isTrending) ? Boolean.TRUE :
                                "0".equals(isTrending) ? Boolean.FALSE : null;

        Pageable pageable = PageRequest.of(page, size);

        Page<BlogDto> blogPage = blogService.filterBlog(
                null,
                (status != null && !status.isBlank()) ? DataUtils.convertStatus(status) : null,
                (search != null && !search.isBlank()) ? search : null,
                displayHot, null, null, pageable
        ).map(this::toDto);

        return ResponseEntity.ok(ApiResponse.success(blogPage));
    }

    @Operation(description = "Get by id endpoint for Blog", summary = "Get Blog by id")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<BlogDto>> getById(@PathVariable Integer id) {
        Blog Blog = blogService.getById(id);
        return ResponseEntity.ok(ApiResponse.success(toDto(Blog)));
    }

    @Operation(description = "Create Blog", summary = "Create Blog")
    @PostMapping
    public ResponseEntity<ApiResponse<BlogDto>> create(@ModelAttribute BlogPostRequest dto) {
        try {
            log.info("Creating Blog with title: {}", dto.getTitle());
            
            // Validate required fields
            if (dto.getTitle() == null || dto.getTitle().trim().isEmpty()) {
                log.error("Blog title is null or empty");
                return ResponseEntity.badRequest()
                    .body(ApiResponse.error(400, "Blog title is required"));
            }

            if (dto.getImageFile() != null && !dto.getImageFile().isEmpty()) {
                dto.setImage(uploadBlogImage(dto.getImageFile()));
            } else {
                dto.setImage(""); // No image uploaded
            }


            dto.setSlug(DataUtils.toSlug(dto.getTitle()));
            Blog blog = modelMapper.map(dto, Blog.class);

            if(dto.getTagStr()!=null && !dto.getTagStr().isEmpty()) {
                List<Tag> resolvedTags = new ArrayList<>();
                List<String> tagArray = List.of(dto.getTagStr().split(","));
                tagArray.forEach((tagValue) -> {
                    if (DataUtils.isNumeric(tagValue)) {
                        tagService.findById(Integer.parseInt(tagValue)).ifPresent(resolvedTags::add);
                    } else if (tagValue != null && !tagValue.isEmpty()) {
                        Tag tag = tagService.findByName(tagValue).orElseGet(() -> {
                            Tag newTag = new Tag();
                            newTag.setName(tagValue);
                            return tagService.save(newTag);
                        });
                        resolvedTags.add(tag);
                    }
                });
                blog.setTags(new HashSet<>(resolvedTags));
            }

            Blog saved = blogService.save(blog);
            
            log.info("Blog created successfully with ID: {}", saved.getId());
            return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success("Created", toDto(saved)));
        } catch (IOException e) {
            log.error("Failed to save image file", e);
            throw new RuntimeException("Failed to save image file", e);
        } catch (Exception e) {
            log.error("Failed to create Blog", e);
            throw new RuntimeException("Failed to create Blog: " + e.getMessage(), e);
        }
    }

    @Operation(description = "Update Blog", summary = "Update Blog")
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<BlogDto>> update(@Valid @ModelAttribute BlogPutRequest dto, @PathVariable Integer id) {
        try {
            log.info("Updating Blog with ID: {}, title: {}", id, dto.getTitle());
            
            // Validate required fields
            if (dto.getTitle() == null || dto.getTitle().trim().isEmpty()) {
                log.error("Blog title is null or empty");
                return ResponseEntity.badRequest()
                    .body(ApiResponse.error(400, "Blog title is required"));
            }

            Blog existingBlog = blogService.getById(id);

            if (dto.getImageFile() != null && !dto.getImageFile().isEmpty()) {
                dto.setImage(uploadBlogImage(dto.getImageFile()));
            } else {
                // Keep existing image
                dto.setImage(existingBlog.getImage());
            }

            dto.setSlug(DataUtils.toSlug(dto.getTitle()));
            Blog blog = modelMapper.map(dto, Blog.class);

            List<Tag> resolvedTags = new ArrayList<>();
            List<String> tagArray = List.of(dto.getTagStr().split(","));
            tagArray.forEach((tagValue)->{
                if (DataUtils.isNumeric(tagValue)) {
                    tagService.findById(Integer.parseInt(tagValue)).ifPresent(resolvedTags::add);
                } else if (tagValue != null && !tagValue.isEmpty()) {
                    Tag tag = tagService.findByName(tagValue).orElseGet(() -> {
                        Tag newTag = new Tag();
                        newTag.setName(tagValue);
                        return tagService.save(newTag);
                    });
                    resolvedTags.add(tag);
                }
            });
            blog.setTags(new HashSet<>(resolvedTags));

            Blog updated = blogService.update(blog, id);
            
            log.info("Blog updated successfully with ID: {}", updated.getId());
            return ResponseEntity.ok(ApiResponse.success("Updated", toDto(updated)));
        } catch (IOException e) {
            log.error("Failed to save image file", e);
            throw new RuntimeException("Failed to save image file", e);
        } catch (Exception e) {
            log.error("Failed to update Blog", e);
            throw new RuntimeException("Failed to update Blog: " + e.getMessage(), e);
        }
    }

    @Operation(description = "Delete Blog", summary = "Delete Blog")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Integer id) {
        try {
            log.info("Deleting Blog with ID: {}", id);
            blogService.deleteById(id);
            log.info("Blog deleted successfully with ID: {}", id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(ApiResponse.success("Deleted", null));
        } catch (Exception e) {
            log.error("Failed to delete Blog with ID: {}", id, e);
            throw new RuntimeException("Failed to delete Blog: " + e.getMessage(), e);
        }
    }
} 