package com.darzi.dto;

import com.darzi.model.Role;

public class AuthDTO {

    public static class LoginRequest {
        private String email;
        private String password;

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    public static class RegisterCustomerRequest {
        private String name;
        private String email;
        private String password;
        private String phone;
        private String city;
        private String neighborhood;

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
    }

    public static class RegisterPartnerRequest extends RegisterCustomerRequest {
        private String shopName;
        private Integer experienceYears;
        private String specialties;

        public String getShopName() { return shopName; }
        public void setShopName(String shopName) { this.shopName = shopName; }
        public Integer getExperienceYears() { return experienceYears; }
        public void setExperienceYears(Integer experienceYears) { this.experienceYears = experienceYears; }
        public String getSpecialties() { return specialties; }
        public void setSpecialties(String specialties) { this.specialties = specialties; }
    }

    public static class AuthResponse {
        private String token;
        private Long userId;
        private String name;
        private String email;
        private Role role;
        private String message;

        public AuthResponse(String token, Long userId, String name, String email, Role role, String message) {
            this.token = token;
            this.userId = userId;
            this.name = name;
            this.email = email;
            this.role = role;
            this.message = message;
        }

        public String getToken() { return token; }
        public Long getUserId() { return userId; }
        public String getName() { return name; }
        public String getEmail() { return email; }
        public Role getRole() { return role; }
        public String getMessage() { return message; }
    }
}
