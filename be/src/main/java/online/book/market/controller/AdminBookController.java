package online.book.market.controller;

import com.cloudinary.Cloudinary;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import online.book.market.entity.dto.ApiResponse;
import online.book.market.entity.dto.category.CategoryDto;
import online.book.market.entity.dto.book.BookDto;
import online.book.market.entity.dto.book.BookPostRequest;
import online.book.market.entity.dto.book.BookPutRequest;
import online.book.market.entity.model.Category;
import online.book.market.entity.model.Book;
import online.book.market.service.CategoryService;
import online.book.market.service.BookService;
import online.book.market.service.LogService;
import online.book.market.utils.DataUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

import static online.book.market.utils.Constant.*;

@RestController
@RequestMapping("api/v1/admin/book")
@io.swagger.v3.oas.annotations.tags.Tag(name = "Book", description = "Book controller")
public class AdminBookController {

    private final LogService logService;
    private final BookService bookService;
    private final CategoryService categoryService;
    private final ModelMapper modelMapper;
    private final Cloudinary cloudinary;
    private final String env;

    public AdminBookController(LogService logService, BookService bookService, CategoryService categoryService, ModelMapper modelMapper,
                                 Cloudinary cloudinary, @Qualifier("env") String environment) {
        this.logService = logService;
        this.bookService = bookService;
        this.categoryService = categoryService;
        this.modelMapper = modelMapper;
        this.cloudinary = cloudinary;
        this.env = environment;
    }

    private String uploadBookImage(MultipartFile imageFile) throws IOException {
        Map<String, Object> uploadOptions = new HashMap<>();
        uploadOptions.put("resource_type", "image");
        uploadOptions.put("folder", "books");
        uploadOptions.put("public_id", UUID.randomUUID().toString());
        uploadOptions.put("overwrite", true);
        Map<?, ?> uploadResult = cloudinary.uploader().upload(imageFile.getBytes(), uploadOptions);
        return (String) uploadResult.get("secure_url");
    }

    private BookDto toDto(Book book) {
        BookDto bookDto = modelMapper.map(book, BookDto.class);
        Optional.ofNullable(book.getCategory())
                .ifPresent(category -> bookDto.setCategory(modelMapper.map(category, CategoryDto.class)));
        return bookDto;
    }

    @Operation(description = "Get all endpoint for Book", summary = "This is a summary for Book get all endpoint")
    @GetMapping
    public ResponseEntity<ApiResponse<Page<BookDto>>> getAll(
            @PageableDefault(size = 10, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String isDisplayHot,
            HttpServletRequest request) {
        logService.save(env, request, LOG_VIEW_BOOK, LOG_ACTION_GET_ALL_BOOK, HttpMethod.GET.name());
        Boolean displayHot =
                isDisplayHot == null || isDisplayHot.isBlank() ? null :
                        "1".equals(isDisplayHot) ? Boolean.TRUE :
                                "0".equals(isDisplayHot) ? Boolean.FALSE : null;
        Page<BookDto> getBookDtos = bookService.filterBook(
                        !String.valueOf(status).isEmpty() ? status : null,
                        !String.valueOf(search).isEmpty() ? search : null,
                        displayHot, pageable
                ).map(this::toDto);


        return ResponseEntity.ok(ApiResponse.success(getBookDtos));
    }

    @Operation(description = "Get by id endpoint for Book", summary = "This is a summary for Book get by id endpoint")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<BookDto>> getById(@PathVariable Integer id, HttpServletRequest request) {
        logService.save(env, request, LOG_DETAIL_BOOK, LOG_ACTION_GET_DETAIL_BOOK, HttpMethod.GET.name());

        Book book = bookService.getById(id);
        if (book == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ApiResponse.error(HttpStatus.NOT_FOUND.value(), "Book not found"));
        }
        return ResponseEntity.ok(ApiResponse.success(toDto(book)));
    }

    @Operation(description = "Save endpoint for Book", summary = "This is a summary for Book save endpoint")
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<BookDto>> saveBook(@Valid @ModelAttribute BookPostRequest dto, HttpServletRequest request) {
        try {
            if (dto.getImageFile() != null && !dto.getImageFile().isEmpty()) {
                dto.setImageUrl(uploadBookImage(dto.getImageFile()));
            }

            dto.setSlug(DataUtils.toSlug(dto.getName()));
            Book book = modelMapper.map(dto, Book.class);
            Category category = categoryService.getById(dto.getCategoryId());
            book.setCategory(category);

            Book bookDb = bookService.save(book);
            logService.save(env, request, LOG_CREATE_BOOK, LOG_ACTION_CREATE_NEW_BOOK, HttpMethod.POST.name());
            return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success("Created", toDto(bookDb)));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Operation(description = "Update endpoint for Book", summary = "This is a summary for Book update endpoint")
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<BookDto>> updateBook(@Valid @ModelAttribute BookPutRequest dto,
                                                               @PathVariable Integer id, HttpServletRequest request) {
        try {
            if (dto.getImageFile() != null && !dto.getImageFile().isEmpty()) {
                dto.setImageUrl(uploadBookImage(dto.getImageFile()));
            }

            dto.setSlug(DataUtils.toSlug(dto.getName()));

            Book bookDb = bookService.update(dto, id);
            logService.save(env, request, LOG_UPDATE_BOOK, LOG_ACTION_UPDATE_BOOK, HttpMethod.PUT.name());
            return ResponseEntity.ok(ApiResponse.success("Updated", toDto(bookDb)));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Operation(description = "Delete endpoint for Book", summary = "This is a summary for Book delete endpoint")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteBook(@PathVariable Integer id, HttpServletRequest request) {
        bookService.deleteById(id);
        logService.save(env, request, LOG_DELETE_BOOK, LOG_ACTION_DELETE_BOOK, HttpMethod.DELETE.name());
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(ApiResponse.success("Deleted", null));
    }
}
