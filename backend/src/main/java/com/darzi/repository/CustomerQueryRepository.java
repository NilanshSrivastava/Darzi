package com.darzi.repository;

import com.darzi.model.CustomerQuery;
import com.darzi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CustomerQueryRepository extends JpaRepository<CustomerQuery, Long> {
    List<CustomerQuery> findByCustomerOrderByCreatedAtDesc(User customer);
    List<CustomerQuery> findAllByOrderByCreatedAtDesc();
}
