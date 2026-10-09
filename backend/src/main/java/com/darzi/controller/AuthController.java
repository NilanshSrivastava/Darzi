package com.darzi.controller;

import com.darzi.dto.AuthDTO.*;
import com.darzi.model.Role;
import com.darzi.model.TailorProfile;
import com.darzi.model.User;
import com.darzi.repository.TailorProfileRepository;
import com.darzi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TailorProfileRepository tailorProfileRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());
        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Account with this email does not exist.");
        }

        User user = userOpt.get();
        if (!user.getPassword().equals(request.getPassword())) {
            return ResponseEntity.badRequest().body("Invalid password. Please try again.");
        }

        // Strict Admin Role check
        if (user.getRole() == Role.ROLE_ADMIN && !user.getEmail().equalsIgnoreCase("admin@darzi.com")) {
            return ResponseEntity.status(403).body("Admin portal access is restricted to primary admin email.");
        }

        String token = "JWT_" + UUID.randomUUID().toString() + "_" + user.getId();
        return ResponseEntity.ok(new AuthResponse(token, user.getId(), user.getName(), user.getEmail(), user.getRole(), "Login Successful!"));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerCustomer(@RequestBody RegisterCustomerRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.badRequest().body("An account with this email already exists.");
        }

        User user = new User(
                request.getName(),
                request.getEmail(),
                request.getPassword(),
                request.getPhone(),
                request.getCity() != null ? request.getCity() : "Delhi NCR",
                request.getNeighborhood() != null ? request.getNeighborhood() : "Central",
                Role.ROLE_CUSTOMER
        );

        userRepository.save(user);
        String token = "JWT_" + UUID.randomUUID().toString() + "_" + user.getId();
        return ResponseEntity.ok(new AuthResponse(token, user.getId(), user.getName(), user.getEmail(), user.getRole(), "Customer Registration Successful!"));
    }

    @PostMapping("/register-partner")
    public ResponseEntity<?> registerPartner(@RequestBody RegisterPartnerRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.badRequest().body("An account with this email already exists.");
        }

        User user = new User(
                request.getName(),
                request.getEmail(),
                request.getPassword(),
                request.getPhone(),
                request.getCity() != null ? request.getCity() : "Delhi NCR",
                request.getNeighborhood() != null ? request.getNeighborhood() : "Central",
                Role.ROLE_TAILOR
        );

        User savedUser = userRepository.save(user);

        TailorProfile profile = new TailorProfile(
                savedUser,
                request.getShopName() != null ? request.getShopName() : request.getName() + " Stitchers",
                request.getExperienceYears() != null ? request.getExperienceYears() : 5,
                request.getSpecialties() != null ? request.getSpecialties() : "Custom Tailoring & Alterations"
        );
        tailorProfileRepository.save(profile);

        String token = "JWT_" + UUID.randomUUID().toString() + "_" + savedUser.getId();
        return ResponseEntity.ok(new AuthResponse(token, savedUser.getId(), savedUser.getName(), savedUser.getEmail(), savedUser.getRole(), "Partner Registration Successful! Your profile is active."));
    }
}
