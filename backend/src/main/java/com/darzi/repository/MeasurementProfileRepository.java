package com.darzi.repository;

import com.darzi.model.MeasurementProfile;
import com.darzi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MeasurementProfileRepository extends JpaRepository<MeasurementProfile, Long> {
    List<MeasurementProfile> findByUser(User user);
}
