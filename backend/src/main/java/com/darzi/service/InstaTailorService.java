package com.darzi.service;

import com.darzi.model.InstaTailorBooking;
import com.darzi.model.Role;
import com.darzi.model.User;
import com.darzi.repository.InstaTailorBookingRepository;
import com.darzi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InstaTailorService {

    @Autowired
    private InstaTailorBookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    public InstaTailorBooking createBooking(Long customerId, String requirements, String timeSlot, String homeAddress, String contactPhone, Double estimatedCost) {
        User customer = userRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        double baseRequirementsCost = estimatedCost != null ? estimatedCost : 248.0;
        
        // Express visit surcharge: +₹50
        double expressSurcharge = (timeSlot != null && timeSlot.contains("Express")) ? 50.0 : 0.0;
        
        // First order delivery/doorstep visit fee: FREE (₹0.00)
        double doorstepDeliveryFee = 0.0; // 100% Waived for 1st order on all services!

        double grossCost = baseRequirementsCost + expressSurcharge + doorstepDeliveryFee;
        double promoDiscount = 200.0; // FIRST200 Free promo
        double netPayable = Math.max(0.0, grossCost - promoDiscount);

        InstaTailorBooking booking = new InstaTailorBooking();
        booking.setBookingNumber("INSTA-" + (1000 + (int)(Math.random() * 9000)));
        booking.setCustomer(customer);
        booking.setAssignedTailor(null);
        booking.setSelectedRequirements(requirements);
        booking.setTimeSlot(timeSlot != null ? timeSlot : "Express 30 Mins Visit (+₹50)");
        booking.setHomeAddress(homeAddress);
        booking.setContactPhone(contactPhone);
        booking.setEstimatedCost(grossCost);
        booking.setDiscountApplied(promoDiscount);
        booking.setFinalPrice(netPayable);
        booking.setTailorVehicleNo("DL-3S-" + (1000 + (int)(Math.random() * 8999)));
        booking.setStatus("PENDING_PARTNER_ACCEPTANCE");

        return bookingRepository.save(booking);
    }

    public InstaTailorBooking acceptOffer(Long bookingId, Long tailorId) {
        InstaTailorBooking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking offer not found"));
        User tailor = userRepository.findById(tailorId)
                .orElseThrow(() -> new RuntimeException("Tailor not found"));

        booking.setAssignedTailor(tailor);
        booking.setStatus("OFFER_ACCEPTED_TAILOR_DISPATCHED");
        return bookingRepository.save(booking);
    }

    public InstaTailorBooking declineOffer(Long bookingId, Long tailorId) {
        return bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking offer not found"));
    }

    public List<InstaTailorBooking> getPendingOffers() {
        return bookingRepository.findAll().stream()
                .filter(b -> "PENDING_PARTNER_ACCEPTANCE".equals(b.getStatus()))
                .toList();
    }

    public List<InstaTailorBooking> getBookingsByCustomer(Long customerId) {
        User customer = userRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        return bookingRepository.findByCustomerOrderByCreatedAtDesc(customer);
    }

    public List<InstaTailorBooking> getAllBookings() {
        return bookingRepository.findAll();
    }
}
