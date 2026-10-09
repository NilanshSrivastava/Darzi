package com.darzi.controller;

import com.darzi.model.*;
import com.darzi.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private MeasurementProfileRepository measurementProfileRepository;

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<?> getCustomerOrders(@PathVariable Long customerId) {
        return userRepository.findById(customerId)
                .<ResponseEntity<?>>map(cust -> ResponseEntity.ok(orderRepository.findByCustomerOrderByCreatedAtDesc(cust)))
                .orElse(ResponseEntity.badRequest().body("Customer not found"));
    }

    @GetMapping("/partner/{tailorId}")
    public ResponseEntity<?> getTailorOrders(@PathVariable Long tailorId) {
        return userRepository.findById(tailorId)
                .<ResponseEntity<?>>map(tailor -> ResponseEntity.ok(orderRepository.findByTailorOrderByCreatedAtDesc(tailor)))
                .orElse(ResponseEntity.badRequest().body("Tailor not found"));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderRepository.findAll());
    }

    public static class CreateOrderRequest {
        public Long customerId;
        public Long categoryId;
        public Long measurementProfileId;
        public String necklineStyle;
        public String sleeveStyle;
        public String liningOption;
        public String customInstructions;
        public Boolean doorstepVisitRequested;
        public String pickupAddress;
        public Double totalPrice;
    }

    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody CreateOrderRequest req) {
        Optional<User> customerOpt = userRepository.findById(req.customerId);
        if (customerOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Customer not found");
        }

        Category category = categoryRepository.findById(req.categoryId).orElse(null);
        MeasurementProfile measurementProfile = req.measurementProfileId != null ?
                measurementProfileRepository.findById(req.measurementProfileId).orElse(null) : null;

        // Auto-assign to an available tailor in system
        List<User> tailors = userRepository.findByRole(Role.ROLE_TAILOR);
        User assignedTailor = tailors.isEmpty() ? null : tailors.get((int) (Math.random() * tailors.size()));

        Order order = new Order();
        order.setOrderNumber("DZ-" + (100000 + (int)(Math.random() * 900000)));
        order.setCustomer(customerOpt.get());
        order.setTailor(assignedTailor);
        order.setCategory(category);
        order.setMeasurementProfile(measurementProfile);
        order.setNecklineStyle(req.necklineStyle);
        order.setSleeveStyle(req.sleeveStyle);
        order.setLiningOption(req.liningOption);
        order.setCustomInstructions(req.customInstructions);
        order.setDoorstepVisitRequested(req.doorstepVisitRequested != null ? req.doorstepVisitRequested : false);
        order.setPickupAddress(req.pickupAddress);
        order.setTotalPrice(req.totalPrice != null ? req.totalPrice : (category != null ? category.getBasePrice() : 499.0));
        order.setStatus(assignedTailor != null ? OrderStatus.ACCEPTED : OrderStatus.PENDING_ASSIGNMENT);
        order.setPickupDate(LocalDateTime.now().plusDays(1));

        Order saved = orderRepository.save(order);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateOrderStatus(@PathVariable Long id, @RequestParam OrderStatus status) {
        return orderRepository.findById(id).map(order -> {
            order.setStatus(status);
            order.setUpdatedAt(LocalDateTime.now());
            Order updated = orderRepository.save(order);
            return ResponseEntity.ok(updated);
        }).orElse(ResponseEntity.notFound().build());
    }
}
