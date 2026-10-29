package online.book.market.repository;

import java.util.List;
import java.util.Optional;

import online.book.market.entity.model.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BookRepository extends JpaRepository<Book, Integer>{
    List<Book> findAllByOrderByIdDesc();
    
    List<Book> findByCategoryIdOrderByIdDesc(Integer categoryId);

    Optional<Book> findBySlug(String slug);

    @Query("SELECT c FROM Book c " +
            "WHERE (:status IS NULL OR c.status = :status) " +
            "AND (:search IS NULL OR LOWER(c.name) LIKE LOWER(CONCAT('%', :search, '%'))) " +
            "AND (:isDisplayHot IS NULL OR c.isDisplayHot = :isDisplayHot) "+
            "AND (:tag IS NULL OR EXISTS (SELECT t FROM c.tags t WHERE t.name = :tag))")
    Page<Book> filterBook(@Param("status") String status,
                              @Param("search") String search,
                              @Param("tag") String tag,
                              @Param("isDisplayHot") Boolean isDisplayHot,
                              Pageable pageable);

    @Query("SELECT c FROM Book c WHERE c.isDisplayHot = true")
    List<Book> getRecommendedBooks();

}
