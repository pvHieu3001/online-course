package online.book.market.service;

import online.book.market.entity.model.Blog;
import online.book.market.entity.model.Category;
import org.hibernate.query.spi.Limit;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;
import java.util.Set;

public interface BlogService {
    Blog getById(Integer id);
    Blog getBySlug(String slug);
    List<Blog> getAll();
    Blog save(Blog blog);
    Blog update(Blog blog, Integer id);
    void deleteById(Integer id);
    List<Blog> getByType(String type);
    Page<Blog> filterBlog(String type, Boolean status, String search, Boolean isTrending, Boolean isTrendingNew, String tag, Pageable pageable);
    List<Blog> getRecommendBlog(String type);
    Long count();
}