package online.book.market.controller;

import java.io.IOException;
import java.nio.file.*;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import jakarta.servlet.http.HttpServletRequest;
import online.book.market.entity.dto.ApiResponse;
import online.book.market.entity.dto.category.CategoryDto;
import online.book.market.entity.dto.book.BookDto;
import online.book.market.entity.dto.book.QuickViewBookGetResponse;
import online.book.market.entity.model.Book;
import online.book.market.service.LogService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import online.book.market.service.BookService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.PostConstruct;

import static online.book.market.utils.Constant.*;

@RestController
@RequestMapping("api/v1/user/book")
@Tag(name = "Book", description = "Book controller")
public class BookController {

    private final LogService logService;
    private final BookService bookService;
    private final ModelMapper modelMapper;
    private final String resourceFolder;
    private final String env;

    public BookController(LogService logService, BookService bookService, ModelMapper modelMapper,
                            @Qualifier("uploadUrl") String resourceFolder, @Qualifier("env") String environment) {
        this.logService = logService;
        this.bookService = bookService;
        this.modelMapper = modelMapper;
        this.resourceFolder = resourceFolder;
        this.env = environment;
    }

    private BookDto toDto(Book book) {
        return modelMapper.map(book, BookDto.class);
    }

    @Operation(description = "Get pageable endpoint for Book", summary = "This is a summary for Book get pageable endpoint")
    @GetMapping("/procedure/{slug}")
    public ResponseEntity<ApiResponse<BookDto>> getPageable(@PathVariable String slug) {
        Book bookBySlug = bookService.getBookBySlug(slug);
        BookDto bookPageDto = toDto(bookBySlug);
        return ResponseEntity.ok(ApiResponse.success(bookPageDto));
    }

    @Operation(description = "Get all endpoint for Book", summary = "This is a summary for Book get all endpoint")
    @GetMapping
    public ResponseEntity<ApiResponse<Page<BookDto>>> getAll(
            @PageableDefault(size = 15, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String isDisplayHot,
            HttpServletRequest request) {
        logService.save(env, request, LOG_VIEW_BOOK, LOG_ACTION_GET_ALL_BOOK, HttpMethod.GET.name());
        Boolean displayHot =
                isDisplayHot == null || isDisplayHot.isBlank() ? null :
                        "1".equals(isDisplayHot) ? Boolean.TRUE :
                                "0".equals(isDisplayHot) ? Boolean.FALSE : null;
        Page<BookDto> bookDtos = bookService.filterBook(
                (status != null && !status.isBlank()) ? status : null,
                (search != null && !search.isBlank()) ? search : null,
                displayHot,
                pageable
        ).map(book -> {
            BookDto bookDto = toDto(book);
            Optional.ofNullable(book.getCategory())
                    .ifPresent(category -> bookDto.setCategory(modelMapper.map(category, CategoryDto.class)));
            return bookDto;
        });

        return ResponseEntity.ok(ApiResponse.success(bookDtos));
    }

    @Operation(description = "Get by name endpoint for Book", summary = "This is a summary for Book get by name endpoint")
    @GetMapping("/quick_view")
    public ResponseEntity<ApiResponse<List<QuickViewBookGetResponse>>> GetQuickViewBook() {
        List<QuickViewBookGetResponse> quickViewBook = bookService.getQuickViewBooks();
        return ResponseEntity.ok(ApiResponse.success(quickViewBook));
    }

    @Operation(description = "Get by name endpoint for Book", summary = "This is a summary for Book get by name endpoint")
    @GetMapping("/recommend")
    public ResponseEntity<ApiResponse<List<BookDto>>> getRecommendedBooks() {
        List<BookDto> recommendBook = bookService.getRecommendedBooks().stream().map(this::toDto).toList();
        return ResponseEntity.ok(ApiResponse.success(recommendBook));
    }

    @Operation(description = "Get by slug endpoint for Book", summary = "This is a summary for Book get by id endpoint")
    @GetMapping("/slug/{slug}")
    public ResponseEntity<ApiResponse<BookDto>> getById(@PathVariable String slug, HttpServletRequest request) {
        Book book = bookService.getBySlug(slug);
        logService.save(env, request, LOG_DETAIL_BOOK, LOG_ACTION_GET_DETAIL_BOOK, HttpMethod.GET.name());
        return ResponseEntity.ok(ApiResponse.success(toDto(book)));
    }

    @Operation(description = "Get books by category endpoint", summary = "This is a summary for Book get by category endpoint")
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<ApiResponse<List<BookDto>>> getByCategoryId(@PathVariable Integer categoryId) {
        List<BookDto> getBookDtos = bookService.getByCategoryId(categoryId).stream()
                .map(this::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(ApiResponse.success(getBookDtos));
    }
}
