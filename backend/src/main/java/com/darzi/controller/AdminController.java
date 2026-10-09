package com.darzi.controller;

import com.darzi.model.*;
import com.darzi.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TailorProfileRepository tailorProfileRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CustomerQueryRepository queryRepository;

    @GetMapping("/tailors")
    public ResponseEntity<List<TailorProfile>> getAllTailors() {
        return ResponseEntity.ok(tailorProfileRepository.findAll());
    }

    @PutMapping("/tailors/{id}/status")
    public ResponseEntity<?> updateTailorStatus(@PathVariable Long id, @RequestParam String status) {
        return tailorProfileRepository.findById(id).map(profile -> {
            profile.setStatus(status);
            tailorProfileRepository.save(profile);
            return ResponseEntity.ok(profile);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/tailors/{id}")
    public ResponseEntity<?> removeTailor(@PathVariable Long id) {
        return tailorProfileRepository.findById(id).map(profile -> {
            User user = profile.getUser();
            tailorProfileRepository.delete(profile);
            if (user != null) {
                userRepository.delete(user);
            }
            return ResponseEntity.ok("Tailor partner removed successfully.");
        }).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/metrics")
    public ResponseEntity<Map<String, Object>> getMetrics() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalCustomers", userRepository.findByRole(Role.ROLE_CUSTOMER).size());
        stats.put("totalTailors", tailorProfileRepository.findAll().size());
        stats.put("totalOrders", orderRepository.count());
        stats.put("pendingQueries", queryRepository.findAll().stream().filter(q -> "OPEN".equals(q.getStatus())).count());
        return ResponseEntity.ok(stats);
    }
}
