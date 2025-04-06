package org.yawdenisk.woodlit.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.yawdenisk.woodlit.Entites.CartItem;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
}
