package online.course.market.service;

import online.course.market.entity.model.Category;
import java.util.List;

public interface CategoryService {
    Category getById(Integer id);
    List<Category> getAll();
    Category save(Category category);
    Category update(Category category, Integer id);
    void deleteById(Integer id);
} 