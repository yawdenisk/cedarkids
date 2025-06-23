package org.yawdenisk.woodlit.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.yawdenisk.woodlit.Entites.Blog;

import java.util.UUID;
@Repository
public interface BlogRepository extends JpaRepository<Blog, UUID> {
}
