package online.book.market.service;

import online.book.market.entity.dto.book.BookPutRequest;
import online.book.market.entity.dto.book.QuickViewBookGetResponse;
import online.book.market.entity.model.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface BookService {
	List<Book> getRecommendedBooks();
	List<Book> getAll();
	Book save(final Book book);
	Book update(BookPutRequest dto, Integer id);
	void deleteById(final Integer id);
	Page<Book> finadAll(Pageable pageable);
	Book getById(Integer id);
	List<Book> getByCategoryId(Integer categoryId);
    Book getBySlug(String slug);
	Book getBookBySlug(String slug);
	Page<Book> filterBook(String status, String search, Boolean isDisplayHot, Pageable pageable);
	List<QuickViewBookGetResponse> getQuickViewBooks();
	Long count();
}
