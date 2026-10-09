package com.darzi.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String orderNumber;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private User customer;

    @ManyToOne
    @JoinColumn(name = "tailor_id")
    private User tailor;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "measurement_profile_id")
    private MeasurementProfile measurementProfile;

    @Enumerated(EnumType.STRING)
    private OrderStatus status = OrderStatus.PENDING_ASSIGNMENT;

    private String necklineStyle;
    private String sleeveStyle;
    private String liningOption;
    private String customInstructions;

    private Boolean doorstepVisitRequested = false;
    private String pickupAddress;
    private LocalDateTime pickupDate;

    private Double totalPrice;

    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt = LocalDateTime.now();

    public Order() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getOrderNumber() { return orderNumber; }
    public void setOrderNumber(String orderNumber) { this.orderNumber = orderNumber; }

    public User getCustomer() { return customer; }
    public void setCustomer(User customer) { this.customer = customer; }

    public User getTailor() { return tailor; }
    public void setTailor(User tailor) { this.tailor = tailor; }

    public Category getCategory() { return category; }
    public void setCategory(Category category) { this.category = category; }

    public MeasurementProfile getMeasurementProfile() { return measurementProfile; }
    public void setMeasurementProfile(MeasurementProfile measurementProfile) { this.measurementProfile = measurementProfile; }

    public OrderStatus getStatus() { return status; }
    public void setStatus(OrderStatus status) { this.status = status; }

    public String getNecklineStyle() { return necklineStyle; }
    public void setNecklineStyle(String necklineStyle) { this.necklineStyle = necklineStyle; }

    public String getSleeveStyle() { return sleeveStyle; }
    public void setSleeveStyle(String sleeveStyle) { this.sleeveStyle = sleeveStyle; }

    public String getLiningOption() { return liningOption; }
    public void setLiningOption(String liningOption) { this.liningOption = liningOption; }

    public String getCustomInstructions() { return customInstructions; }
    public void setCustomInstructions(String customInstructions) { this.customInstructions = customInstructions; }

    public Boolean getDoorstepVisitRequested() { return doorstepVisitRequested; }
    public void setDoorstepVisitRequested(Boolean doorstepVisitRequested) { this.doorstepVisitRequested = doorstepVisitRequested; }

    public String getPickupAddress() { return pickupAddress; }
    public void setPickupAddress(String pickupAddress) { this.pickupAddress = pickupAddress; }

    public LocalDateTime getPickupDate() { return pickupDate; }
    public void setPickupDate(LocalDateTime pickupDate) { this.pickupDate = pickupDate; }

    public Double getTotalPrice() { return totalPrice; }
    public void setTotalPrice(Double totalPrice) { this.totalPrice = totalPrice; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
