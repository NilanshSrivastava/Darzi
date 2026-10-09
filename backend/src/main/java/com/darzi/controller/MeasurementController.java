package com.darzi.controller;

import com.darzi.model.MeasurementProfile;
import com.darzi.model.User;
import com.darzi.repository.MeasurementProfileRepository;
import com.darzi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/measurements")
@CrossOrigin(origins = "*")
public class MeasurementController {

    @Autowired
    private MeasurementProfileRepository measurementRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserMeasurements(@PathVariable Long userId) {
        return userRepository.findById(userId)
                .<ResponseEntity<?>>map(user -> ResponseEntity.ok(measurementRepository.findByUser(user)))
                .orElse(ResponseEntity.badRequest().body("User not found"));
    }

    @PostMapping("/user/{userId}")
    public ResponseEntity<?> saveMeasurementProfile(@PathVariable Long userId, @RequestBody MeasurementProfile profile) {
        return userRepository.findById(userId).<ResponseEntity<?>>map(user -> {
            profile.setUser(user);
            MeasurementProfile saved = measurementRepository.save(profile);
            return ResponseEntity.ok(saved);
        }).orElse(ResponseEntity.badRequest().body("User not found"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMeasurementProfile(@PathVariable Long id) {
        measurementRepository.deleteById(id);
        return ResponseEntity.ok("Profile deleted successfully.");
    }
}
