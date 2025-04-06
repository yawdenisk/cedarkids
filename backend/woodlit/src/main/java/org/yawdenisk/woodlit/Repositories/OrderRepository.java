package org.yawdenisk.woodlit.Repositories;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.yawdenisk.woodlit.Entites.Order;
import org.yawdenisk.woodlit.Entites.User;

import java.util.List;
import java.util.UUID;

@Repository
public interface OrderRepository extends JpaRepository<Order, UUID> {
    List<Order> findOrderByUser(User user);

    List<Order> findOrdersByUser(User user, Sort sort);
}
