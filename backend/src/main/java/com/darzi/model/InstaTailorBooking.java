package com.darzi.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "insta_tailor_bookings")
public class InstaTailorBooking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String bookingNumber;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private User customer;

    @ManyToOne
    @JoinColumn(name = "assigned_tailor_id")
    private User assignedTailor;

    @Column(length = 1000)
    private String selectedRequirements;

    private String timeSlot;
    private String homeAddress;
    private String contactPhone;

    private Double estimatedCost;
    private Double discountApplied = 200.0; // FIRST200 Free Promo (up to ₹200 off)
    private Double finalPrice = 0.0;

    private String tailorVehicleNo = "DL-3S-9821";
    private Double tailorLat = 28.5678;
    private Double tailorLng = 77.2431;

    private String status = "PENDING_PARTNER_ACCEPTANCE";

    private LocalDateTime createdAt = LocalDateTime.now();

    public InstaTailorBooking() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getBookingNumber() { return bookingNumber; }
    public void setBookingNumber(String bookingNumber) { this.bookingNumber = bookingNumber; }

    public User getCustomer() { return customer; }
    public void setCustomer(User customer) { this.customer = customer; }

    public User getAssignedTailor() { return assignedTailor; }
    public void setAssignedTailor(User assignedTailor) { this.assignedTailor = assignedTailor; }

    public String getSelectedRequirements() { return selectedRequirements; }
    public void setSelectedRequirements(String selectedRequirements) { this.selectedRequirements = selectedRequirements; }

    public String getTimeSlot() { return timeSlot; }
    public void setTimeSlot(String timeSlot) { this.timeSlot = timeSlot; }

    public String getHomeAddress() { return homeAddress; }
    public void setHomeAddress(String homeAddress) { this.homeAddress = homeAddress; }

    public String getContactPhone() { return contactPhone; }
    public void setContactPhone(String contactPhone) { this.contactPhone = contactPhone; }

    public Double getEstimatedCost() { return estimatedCost; }
    public void setEstimatedCost(Double estimatedCost) { this.estimatedCost = estimatedCost; }

    public Double getDiscountApplied() { return discountApplied; }
    public void setDiscountApplied(Double discountApplied) { this.discountApplied = discountApplied; }

    public Double getFinalPrice() { return finalPrice; }
    public void setFinalPrice(Double finalPrice) { this.finalPrice = finalPrice; }

    public String getTailorVehicleNo() { return tailorVehicleNo; }
    public void setTailorVehicleNo(String tailorVehicleNo) { this.tailorVehicleNo = tailorVehicleNo; }

    public Double getTailorLat() { return tailorLat; }
    public void setTailorLat(Double tailorLat) { this.tailorLat = tailorLat; }

    public Double getTailorLng() { return tailorLng; }
    public void setTailorLng(Double tailorLng) { this.tailorLng = tailorLng; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
