package com.darzi.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    private String phone;
    private String city;
    private String neighborhood;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    private Boolean isGoldMember = false;
    private LocalDateTime goldExpiryDate;

    private LocalDateTime createdAt = LocalDateTime.now();

    public User() {}

    public User(String name, String email, String password, String phone, String city, String neighborhood, Role role) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.city = city;
        this.neighborhood = neighborhood;
        this.role = role;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getNeighborhood() { return neighborhood; }
    public void setNeighborhood(String neighborhood) { this.neighborhood = neighborhood; }

    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }

    public Boolean getIsGoldMember() { return isGoldMember; }
    public void setIsGoldMember(Boolean isGoldMember) { this.isGoldMember = isGoldMember; }

    public LocalDateTime getGoldExpiryDate() { return goldExpiryDate; }
    public void setGoldExpiryDate(LocalDateTime goldExpiryDate) { this.goldExpiryDate = goldExpiryDate; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
