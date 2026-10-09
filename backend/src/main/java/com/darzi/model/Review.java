package com.darzi.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "reviews")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "tailor_profile_id")
    private TailorProfile tailorProfile;

    private String customerName;
    private Double rating; // e.g. 5.0
    private Double fitScore; // e.g. 4.9

    @Column(length = 1000)
    private String reviewText;

    private String garmentCategory; // Saree Blouse, Kurti, Sherwani, Anarkali
    private String imageUrl; // Stitched garment showcase photo

    private LocalDateTime createdAt = LocalDateTime.now();

    public Review() {}

    public Review(TailorProfile tailorProfile, String customerName, Double rating, Double fitScore, String reviewText, String garmentCategory, String imageUrl) {
        this.tailorProfile = tailorProfile;
        this.customerName = customerName;
        this.rating = rating;
        this.fitScore = fitScore;
        this.reviewText = reviewText;
        this.garmentCategory = garmentCategory;
        this.imageUrl = imageUrl;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public TailorProfile getTailorProfile() { return tailorProfile; }
    public void setTailorProfile(TailorProfile tailorProfile) { this.tailorProfile = tailorProfile; }

    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }

    public Double getFitScore() { return fitScore; }
    public void setFitScore(Double fitScore) { this.fitScore = fitScore; }

    public String getReviewText() { return reviewText; }
    public void setReviewText(String reviewText) { this.reviewText = reviewText; }

    public String getGarmentCategory() { return garmentCategory; }
    public void setGarmentCategory(String garmentCategory) { this.garmentCategory = garmentCategory; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
