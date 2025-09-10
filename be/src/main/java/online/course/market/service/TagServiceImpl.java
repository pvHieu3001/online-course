package online.course.market.service;

import lombok.AllArgsConstructor;
import online.course.market.entity.model.Tag;
import online.course.market.repository.TagRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class TagServiceImpl implements TagService {
    private final TagRepository tagRepository;
    @Override
    @Transactional(readOnly = true)
    public List<Tag> getAll() {
        return tagRepository.findAll();
    }

    @Override
    @Transactional
    public Tag save(Tag Tag) {
        return tagRepository.save(Tag);
    }

    @Override
    @Transactional
    public Tag update(Tag Tag, Integer id) {
        Optional<Tag> tagOptional = tagRepository.findById(id);
        if(tagOptional.isPresent()){
            Tag newTag = tagOptional.get();
            newTag.setName(newTag.getName());
            return tagRepository.save(newTag);
        }
        return null;
    }

    @Override
    @Transactional
    public void deleteById(Integer id) {
        Optional<Tag> tagOptional = tagRepository.findById(id);
        tagOptional.ifPresent(tagRepository::delete);
    }

    @Override
    public Optional<Tag> findByName(String tagName) {
        return tagRepository.findByName(tagName);
    }

    @Override
    public Optional<Tag> findById(Integer id) {
        return tagRepository.findById(id);
    }
}