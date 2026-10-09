package com.darzi.controller;

import com.darzi.model.CustomerQuery;
import com.darzi.model.User;
import com.darzi.repository.CustomerQueryRepository;
import com.darzi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/queries")
@CrossOrigin(origins = "*")
public class CustomerQueryController {

    @Autowired
    private CustomerQueryRepository queryRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<?> getCustomerQueries(@PathVariable Long customerId) {
        return userRepository.findById(customerId)
                .<ResponseEntity<?>>map(cust -> ResponseEntity.ok(queryRepository.findByCustomerOrderByCreatedAtDesc(cust)))
                .orElse(ResponseEntity.badRequest().body("Customer not found"));
    }

    @GetMapping("/admin/all")
    public ResponseEntity<List<CustomerQuery>> getAllQueriesForAdmin() {
        return ResponseEntity.ok(queryRepository.findAllByOrderByCreatedAtDesc());
    }

    public static class CreateQueryRequest {
        public Long customerId;
        public String subject;
        public String message;
    }

    @PostMapping
    public ResponseEntity<?> createQuery(@RequestBody CreateQueryRequest req) {
        Optional<User> customerOpt = userRepository.findById(req.customerId);
        if (customerOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Customer not found");
        }

        CustomerQuery query = new CustomerQuery(customerOpt.get(), req.subject, req.message);
        CustomerQuery saved = queryRepository.save(query);
        return ResponseEntity.ok(saved);
    }

    public static class ReplyRequest {
        public String replyMessage;
        public String status; // RESOLVED, IN_PROGRESS
    }

    @PutMapping("/{id}/reply")
    public ResponseEntity<?> replyToQuery(@PathVariable Long id, @RequestBody ReplyRequest req) {
        return queryRepository.findById(id).map(q -> {
            q.setAdminReply(req.replyMessage);
            q.setStatus(req.status != null ? req.status : "RESOLVED");
            q.setRepliedAt(LocalDateTime.now());
            CustomerQuery updated = queryRepository.save(q);
            return ResponseEntity.ok(updated);
        }).orElse(ResponseEntity.notFound().build());
    }
}
