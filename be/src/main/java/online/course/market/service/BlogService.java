package online.course.market.service;

import online.course.market.entity.model.Blog;
import online.course.market.entity.model.Category;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

public interface BlogService {
    Blog getById(Integer id);
    Blog getBySlug(String slug);
    List<Blog> getAll();
    Blog save(Blog blog);
    Blog update(Blog blog, Integer id);
    void deleteById(Integer id);
}