package online.course.market.service;

import online.course.market.entity.model.Category;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Set;

public interface CategoryService {
    Category getById(Integer id);
    Category getBySlug(String slug);
    List<Category> getAll();
    Category save(Category category);
    Category update(Category category, Integer id);
    void deleteById(Integer id);
    @Transactional
    void refreshCourseCount(Set<Integer> ids);
}