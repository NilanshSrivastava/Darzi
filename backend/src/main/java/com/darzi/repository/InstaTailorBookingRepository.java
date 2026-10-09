package com.darzi.repository;

import com.darzi.model.InstaTailorBooking;
import com.darzi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface InstaTailorBookingRepository extends JpaRepository<InstaTailorBooking, Long> {
    List<InstaTailorBooking> findByCustomerOrderByCreatedAtDesc(User customer);
    List<InstaTailorBooking> findByAssignedTailorOrderByCreatedAtDesc(User tailor);
}
