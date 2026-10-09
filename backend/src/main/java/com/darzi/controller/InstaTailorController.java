package com.darzi.controller;

import com.darzi.model.InstaTailorBooking;
import com.darzi.service.InstaTailorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/insta-tailor")
@CrossOrigin(origins = "*")
public class InstaTailorController {

    @Autowired
    private InstaTailorService instaTailorService;

    public static class CreateInstaRequest {
        public Long customerId;
        public String selectedRequirements;
        public String timeSlot;
        public String homeAddress;
        public String contactPhone;
        public Double estimatedCost;
    }

    @PostMapping("/book")
    public ResponseEntity<?> bookInstaTailor(@RequestBody CreateInstaRequest req) {
        try {
            InstaTailorBooking booking = instaTailorService.createBooking(
                    req.customerId, req.selectedRequirements, req.timeSlot,
                    req.homeAddress, req.contactPhone, req.estimatedCost
            );
            return ResponseEntity.ok(booking);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/offers/pending")
    public ResponseEntity<List<InstaTailorBooking>> getPendingOffers() {
        return ResponseEntity.ok(instaTailorService.getPendingOffers());
    }

    @PutMapping("/{id}/accept-offer")
    public ResponseEntity<?> acceptOffer(@PathVariable Long id, @RequestParam Long tailorId) {
        try {
            InstaTailorBooking updated = instaTailorService.acceptOffer(id, tailorId);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<?> getCustomerBookings(@PathVariable Long customerId) {
        try {
            return ResponseEntity.ok(instaTailorService.getBookingsByCustomer(customerId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
