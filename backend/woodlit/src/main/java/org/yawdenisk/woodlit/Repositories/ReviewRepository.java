package org.yawdenisk.woodlit.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.yawdenisk.woodlit.Entites.Review;

import java.util.UUID;
@Repository
public interface ReviewRepository extends JpaRepository<Review, UUID> {
}
