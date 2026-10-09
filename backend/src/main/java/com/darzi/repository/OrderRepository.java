package com.darzi.repository;

import com.darzi.model.Order;
import com.darzi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByCustomerOrderByCreatedAtDesc(User customer);
    List<Order> findByTailorOrderByCreatedAtDesc(User tailor);
    Optional<Order> findByOrderNumber(String orderNumber);
}
