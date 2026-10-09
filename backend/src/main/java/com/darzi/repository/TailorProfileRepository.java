package com.darzi.repository;

import com.darzi.model.TailorProfile;
import com.darzi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface TailorProfileRepository extends JpaRepository<TailorProfile, Long> {
    Optional<TailorProfile> findByUser(User user);
    List<TailorProfile> findByStatus(String status);
}
