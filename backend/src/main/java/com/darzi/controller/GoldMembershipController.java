package com.darzi.controller;

import com.darzi.model.User;
import com.darzi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/membership")
@CrossOrigin(origins = "*")
public class GoldMembershipController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/subscribe-gold/{userId}")
    public ResponseEntity<?> subscribeGold(@PathVariable Long userId) {
        return userRepository.findById(userId).<ResponseEntity<?>>map(user -> {
            user.setIsGoldMember(true);
            user.setGoldExpiryDate(LocalDateTime.now().plusMonths(3));
            User updated = userRepository.save(user);
            return ResponseEntity.ok(updated);
        }).orElse(ResponseEntity.badRequest().body("User not found"));
    }
}
