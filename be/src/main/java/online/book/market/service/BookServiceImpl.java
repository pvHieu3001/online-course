package online.book.market.service;

import lombok.AllArgsConstructor;
import online.book.market.entity.dto.category.CategoryDto;
import online.book.market.entity.dto.book.BookDto;
import online.book.market.entity.dto.book.BookPutRequest;
import online.book.market.entity.dto.book.QuickViewBookGetResponse;
import online.book.market.entity.model.Category;
import online.book.market.entity.model.Book;
import online.book.market.framework.exception.CJNotFoundException;
import online.book.market.repository.CategoryRepository;
import online.book.market.repository.BookRepository;
import online.book.market.utils.CustomCodeException;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@AllArgsConstructor
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;
    private final CategoryRepository categoryRepository;
    private final ModelMapper modelMapper;

    private BookDto toDto(Book book) {
        return modelMapper.map(book, BookDto.class);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Book> getRecommendedBooks() {
        return bookRepository.getRecommendedBooks();

    }

    @Override
    @Transactional(readOnly = true)
    public List<Book> getAll() {
        return bookRepository.findAllByOrderByIdDesc();
    }

    @Override
    @Transactional
    public Book save(Book book) {
        Assert.notNull(book, "book cannot be null");
        Book bookDb =  bookRepository.save(book);
        categoryRepository.updateNumberBookByIds(Stream.of(bookDb.getCategory().getId())
                .collect(Collectors.toSet()));
        return bookDb;
    }

    @Override
    @Transactional
    public Book update(BookPutRequest dto, Integer id) {
        Book bookDB = bookRepository.findById(id).orElseThrow(() -> new RuntimeException("Khóa học không tồn tại"));;
        Category oldCat = bookDB.getCategory();

        Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Danh mục không tồn tại"));
        bookDB.setName(dto.getName());
        bookDB.setDescription(dto.getDescription());
        bookDB.setContent(dto.getContent());
        bookDB.setSlug(dto.getSlug());
        bookDB.setStatus(dto.getStatus());
        bookDB.setCategory(category);
        bookDB.setImageUrl(dto.getImageUrl() != null && !dto.getImageUrl().isEmpty() ? dto.getImageUrl() : bookDB.getImageUrl());
        bookDB.setAmzUrl(dto.getAmzUrl());
        bookDB.setIsDisplayHot(dto.getIsDisplayHot());
        Book newBook = bookRepository.save(bookDB);


        categoryRepository.updateNumberBookByIds(
                Stream.of(oldCat !=null ? oldCat.getId() : null, dto.getCategoryId())
                        .filter(Objects::nonNull)
                        .collect(Collectors.toSet()));
        return newBook;
    }

    @Override
    @Transactional
    public void deleteById(Integer id) {
        Assert.notNull(id, "id cannot be null");
        Book bookDb = bookRepository.findById(id)
                .orElseThrow(() -> new CJNotFoundException(CustomCodeException.CODE_400, "book not found"));
        bookRepository.delete(bookDb);
        categoryRepository.updateNumberBookByIds(Stream.of(bookDb.getCategory().getId())
                .collect(Collectors.toSet()));
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Book> finadAll(Pageable pageable) {
        return bookRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Book getById(Integer id) {
        return bookRepository.findById(id)
            .orElseThrow(() -> new CJNotFoundException(CustomCodeException.CODE_400, "Book not found"));
    }

    @Override
    @Transactional(readOnly = true)
    public Book getBySlug(String slug) {
        return bookRepository.findBySlug(slug)
            .orElseThrow(() -> new CJNotFoundException(CustomCodeException.CODE_400, "Book not found"));
    }

    @Override
    @Transactional
    public Book getBookBySlug(String slug) {
        return bookRepository.findBySlug(slug)
            .orElseThrow(() -> new CJNotFoundException(CustomCodeException.CODE_400, "Book not found"));
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Book> filterBook(String status, String search, Boolean isDisplayHot, Pageable pageable) {
        return bookRepository.filterBook(status, search, isDisplayHot, pageable);
    }

    @Override
    public List<QuickViewBookGetResponse> getQuickViewBooks() {
        List<QuickViewBookGetResponse> quickViewBookDtoList = new ArrayList<>();
        List<Category> categoryList =  categoryRepository.findByIsQuickViewTrueAndStatusTrue();
        categoryList.forEach((item)->{
            QuickViewBookGetResponse quickViewBookDto = new QuickViewBookGetResponse();
            quickViewBookDto.setCategory(modelMapper.map(item, CategoryDto.class));
            List<Book> bookList =  bookRepository.findByCategoryIdOrderByIdDesc(item.getId());
            quickViewBookDto.setListBook(bookList.stream().map(this::toDto).toList());
            quickViewBookDtoList.add(quickViewBookDto);
        });
        return quickViewBookDtoList;
    }

    @Override
    public Long count() {
        return bookRepository.count();
    }

    @Override
    @Transactional(readOnly = true)
    public List<Book> getByCategoryId(Integer categoryId) {
        Assert.notNull(categoryId, "categoryId cannot be null");
        return bookRepository.findByCategoryIdOrderByIdDesc(categoryId);
    }
}
