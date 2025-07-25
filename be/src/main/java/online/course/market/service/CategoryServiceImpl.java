package online.course.market.service;

import lombok.AllArgsConstructor;
import online.course.market.entity.model.Category;
import online.course.market.exception.CJNotFoundException;
import online.course.market.repository.CategoryRepository;
import online.course.market.utils.CustomCodeException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;

    @Override
    @Transactional(readOnly = true)
    public Category getById(Integer id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new CJNotFoundException(CustomCodeException.CODE_400, "Category not found"));
    }

    @Override
    @Transactional(readOnly = true)
    public List<Category> getAll() {
        return categoryRepository.findAll();
    }

    @Override
    @Transactional
    public Category save(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    @Transactional
    public Category update(Category category, Integer id) {
        Category categoryDb = getById(id);
        categoryDb.setName(category.getName());
        categoryDb.setSlug(category.getSlug());
        return categoryRepository.save(categoryDb);
    }

    @Override
    @Transactional
    public void deleteById(Integer id) {
        Category categoryDb = getById(id);
        categoryRepository.delete(categoryDb);
    }
} 