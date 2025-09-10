package online.course.market.service;

import online.course.market.entity.model.Tag;
import java.util.List;
import java.util.Optional;

public interface TagService {
    List<Tag> getAll();
    Tag save(Tag tag);
    Tag update(Tag tag, Integer id);
    void deleteById(Integer id);
    Optional<Tag> findByName(String tagName);
    Optional<Tag> findById(Integer id);
}