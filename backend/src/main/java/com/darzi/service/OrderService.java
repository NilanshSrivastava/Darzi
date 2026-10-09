package com.darzi.service;

import com.darzi.model.*;
import com.darzi.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private MeasurementProfileRepository measurementProfileRepository;

    public List<Order> getOrdersByCustomer(Long customerId) {
        User customer = userRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        return orderRepository.findByCustomerOrderByCreatedAtDesc(customer);
    }

    public List<Order> getOrdersByTailor(Long tailorId) {
        User tailor = userRepository.findById(tailorId)
                .orElseThrow(() -> new RuntimeException("Tailor not found"));
        return orderRepository.findByTailorOrderByCreatedAtDesc(tailor);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order createOrder(Long customerId, Long categoryId, Long measurementProfileId,
                             String necklineStyle, String sleeveStyle, String liningOption,
                             String customInstructions, Boolean doorstepVisitRequested,
                             String pickupAddress, Double totalPrice) {

        User customer = userRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        Category category = categoryId != null ? categoryRepository.findById(categoryId).orElse(null) : null;
        MeasurementProfile measurementProfile = measurementProfileId != null ?
                measurementProfileRepository.findById(measurementProfileId).orElse(null) : null;

        List<User> tailors = userRepository.findByRole(Role.ROLE_TAILOR);
        User assignedTailor = tailors.isEmpty() ? null : tailors.get((int) (Math.random() * tailors.size()));

        Order order = new Order();
        order.setOrderNumber("DZ-" + (100000 + (int)(Math.random() * 900000)));
        order.setCustomer(customer);
        order.setTailor(assignedTailor);
        order.setCategory(category);
        order.setMeasurementProfile(measurementProfile);
        order.setNecklineStyle(necklineStyle);
        order.setSleeveStyle(sleeveStyle);
        order.setLiningOption(liningOption);
        order.setCustomInstructions(customInstructions);
        order.setDoorstepVisitRequested(doorstepVisitRequested != null ? doorstepVisitRequested : false);
        order.setPickupAddress(pickupAddress);
        order.setTotalPrice(totalPrice != null ? totalPrice : (category != null ? category.getBasePrice() : 499.0));
        order.setStatus(assignedTailor != null ? OrderStatus.ACCEPTED : OrderStatus.PENDING_ASSIGNMENT);
        order.setPickupDate(LocalDateTime.now().plusDays(1));

        return orderRepository.save(order);
    }

    public Order updateStatus(Long orderId, OrderStatus status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus(status);
        order.setUpdatedAt(LocalDateTime.now());
        return orderRepository.save(order);
    }
}
