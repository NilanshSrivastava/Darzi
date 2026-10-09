package com.darzi.model;

import jakarta.persistence.*;

@Entity
@Table(name = "tailor_profiles")
public class TailorProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String shopName;
    private Integer experienceYears;
    private String specialties; // e.g. "Blouses, Kurtas, Anarkalis, Suits"
    private Double rating = 4.8;
    private Integer totalOrdersCompleted = 0;

    private String status = "APPROVED"; // PENDING, APPROVED, SUSPENDED

    public TailorProfile() {}

    public TailorProfile(User user, String shopName, Integer experienceYears, String specialties) {
        this.user = user;
        this.shopName = shopName;
        this.experienceYears = experienceYears;
        this.specialties = specialties;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getShopName() { return shopName; }
    public void setShopName(String shopName) { this.shopName = shopName; }

    public Integer getExperienceYears() { return experienceYears; }
    public void setExperienceYears(Integer experienceYears) { this.experienceYears = experienceYears; }

    public String getSpecialties() { return specialties; }
    public void setSpecialties(String specialties) { this.specialties = specialties; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }

    public Integer getTotalOrdersCompleted() { return totalOrdersCompleted; }
    public void setTotalOrdersCompleted(Integer totalOrdersCompleted) { this.totalOrdersCompleted = totalOrdersCompleted; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
