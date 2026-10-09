package com.darzi.model;

import jakarta.persistence.*;

@Entity
@Table(name = "measurement_profiles")
public class MeasurementProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String profileTitle; // e.g., "Pooja's Blouse Fit", "Rahul's Kurta Spec"
    private String garmentType; // Blouse, Kurta, Sherwani, Pant, Lehenga, Suit

    private Double chest;
    private Double waist;
    private Double hips;
    private Double shoulder;
    private Double sleeveLength;
    private Double inseam;
    private Double garmentLength;

    @Column(length = 1000)
    private String customNotes;

    private Boolean sampleGarmentPickupRequested = false;

    public MeasurementProfile() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getProfileTitle() { return profileTitle; }
    public void setProfileTitle(String profileTitle) { this.profileTitle = profileTitle; }

    public String getGarmentType() { return garmentType; }
    public void setGarmentType(String garmentType) { this.garmentType = garmentType; }

    public Double getChest() { return chest; }
    public void setChest(Double chest) { this.chest = chest; }

    public Double getWaist() { return waist; }
    public void setWaist(Double waist) { this.waist = waist; }

    public Double getHips() { return hips; }
    public void setHips(Double hips) { this.hips = hips; }

    public Double getShoulder() { return shoulder; }
    public void setShoulder(Double shoulder) { this.shoulder = shoulder; }

    public Double getSleeveLength() { return sleeveLength; }
    public void setSleeveLength(Double sleeveLength) { this.sleeveLength = sleeveLength; }

    public Double getInseam() { return inseam; }
    public void setInseam(Double inseam) { this.inseam = inseam; }

    public Double getGarmentLength() { return garmentLength; }
    public void setGarmentLength(Double garmentLength) { this.garmentLength = garmentLength; }

    public String getCustomNotes() { return customNotes; }
    public void setCustomNotes(String customNotes) { this.customNotes = customNotes; }

    public Boolean getSampleGarmentPickupRequested() { return sampleGarmentPickupRequested; }
    public void setSampleGarmentPickupRequested(Boolean sampleGarmentPickupRequested) { this.sampleGarmentPickupRequested = sampleGarmentPickupRequested; }
}
