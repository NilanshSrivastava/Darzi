package com.darzi.repository;

import com.darzi.model.Review;
import com.darzi.model.TailorProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByTailorProfileOrderByCreatedAtDesc(TailorProfile tailorProfile);
    List<Review> findAllByOrderByCreatedAtDesc();
}
