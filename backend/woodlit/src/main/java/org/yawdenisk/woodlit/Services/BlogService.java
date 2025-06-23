package org.yawdenisk.woodlit.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.yawdenisk.woodlit.Entites.Blog;
import org.yawdenisk.woodlit.Exceptions.BlogNotFoundException;
import org.yawdenisk.woodlit.Repositories.BlogRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class BlogService {
    @Autowired
    private BlogRepository blogRepository;

    public void upload(Blog blog) {
        blogRepository.save(blog);
    }

    public List<Blog> getAll() {
        return blogRepository.findAll();
    }

    public Optional<Blog> getById(UUID id) {
        return blogRepository.findById(id);
    }

    public void delete(UUID id) {
        blogRepository.deleteById(id);
    }
}
