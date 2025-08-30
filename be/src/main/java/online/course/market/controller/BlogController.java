package online.course.market.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import online.course.market.entity.dto.ApiResponse;
import online.course.market.entity.dto.blog.GetBlogBySlugResponse;
import online.course.market.entity.dto.blog.GetBlogDto;
import online.course.market.entity.dto.user.GetUserDto;
import online.course.market.entity.model.Blog;
import online.course.market.service.BlogService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("api/v1/user/blog")
@Tag(name = "Blog", description = "Blog controller")
public class BlogController {
    private final BlogService blogService;
    private final ModelMapper modelMapper;

    public BlogController(BlogService blogService, ModelMapper modelMapper) {
        this.blogService = blogService;
        this.modelMapper = modelMapper;
    }

    private GetBlogDto toDto(Blog Blog) {
        return modelMapper.map(Blog, GetBlogDto.class);
    }

    @Operation(description = "Get pageable endpoint for Blog", summary = "Get pageable Blog")
    @GetMapping("/pageable")
    public ResponseEntity<ApiResponse<Page<GetBlogDto>>> getPageable(Pageable pageable) {
        Page<Blog> page = blogService.getAll() instanceof Page ? (Page<Blog>) blogService.getAll() : Page.empty();
        Page<GetBlogDto> pageDto = page.map(this::toDto);
        return ResponseEntity.ok(ApiResponse.success(pageDto));
    }

    @Operation(description = "Get all endpoint for Blog", summary = "Get all Blog")
    @GetMapping
    public ResponseEntity<ApiResponse<List<GetBlogDto>>> getAll(@RequestParam(required = false) String search) {
        List<GetBlogDto> dtos = blogService.getAll().stream()
                .filter(Blog -> search == null || search.isEmpty() || Blog.getTitle().toLowerCase().contains(search.toLowerCase()))
                .map(this::toDto).collect(Collectors.toList());
        return ResponseEntity.ok(ApiResponse.success(dtos));
    }

    @Operation(description = "Get by slug endpoint for Blog", summary = "Get Blog by slug")
    @GetMapping("/slug/{slug}")
    public ResponseEntity<ApiResponse<GetBlogBySlugResponse>> getBySlug(@PathVariable String slug) {
        GetBlogBySlugResponse response = new GetBlogBySlugResponse();
        Blog blog = blogService.getBySlug(slug);
        if (blog == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ApiResponse.error(HttpStatus.NOT_FOUND.value(), "Bài viết không tồn tại"));
        }

        List<GetBlogDto> blogs = blogService.getByType(blog.getType()).stream().filter(b -> !b.getSlug().equals(slug)).map(this::toDto).toList();
        response.setBlog(modelMapper.map(blog, GetBlogDto.class));
        response.setRelatedBlogs(blogs);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @Operation(description = "Get by slug endpoint for Blog", summary = "Get Blog by type")
    @GetMapping("/type/{type}")
    public ResponseEntity<ApiResponse<List<GetBlogDto>>> getByType(@PathVariable String type) {
        List<GetBlogDto> Blogs = blogService.getByType(type).stream().map((blog)->{
            GetBlogDto blogDto = modelMapper.map(blog, GetBlogDto.class);
            if(blog.getUpdatedBy()!= null){
                GetUserDto userDto = modelMapper.map(blog.getUpdatedBy(), GetUserDto.class);
                blogDto.setUpdatedBy(userDto);
            }
            return blogDto;
        }).collect(Collectors.toList());
        return ResponseEntity.ok(ApiResponse.success(Blogs));
    }
} 