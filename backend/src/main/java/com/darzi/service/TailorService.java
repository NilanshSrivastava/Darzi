package com.darzi.service;

import com.darzi.model.Review;
import com.darzi.model.TailorProfile;
import com.darzi.repository.ReviewRepository;
import com.darzi.repository.TailorProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TailorService {

    @Autowired
    private TailorProfileRepository tailorProfileRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    public List<TailorProfile> getAllApprovedTailors() {
        return tailorProfileRepository.findByStatus("APPROVED");
    }

    public List<TailorProfile> getAllTailorsForAdmin() {
        return tailorProfileRepository.findAll();
    }

    public Optional<TailorProfile> getTailorById(Long id) {
        return tailorProfileRepository.findById(id);
    }

    public TailorProfile updateTailorStatus(Long id, String status) {
        TailorProfile profile = tailorProfileRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tailor profile not found"));
        profile.setStatus(status);
        return tailorProfileRepository.save(profile);
    }

    public List<Review> getReviewsForTailor(Long tailorId) {
        return tailorProfileRepository.findById(tailorId)
                .map(tp -> reviewRepository.findByTailorProfileOrderByCreatedAtDesc(tp))
                .orElse(List.of());
    }

    public List<Review> getAllReviews() {
        return reviewRepository.findAllByOrderByCreatedAtDesc();
    }

    public Review addReview(Long tailorId, Review review) {
        TailorProfile profile = tailorProfileRepository.findById(tailorId)
                .orElseThrow(() -> new RuntimeException("Tailor not found"));
        review.setTailorProfile(profile);
        return reviewRepository.save(review);
    }
}
