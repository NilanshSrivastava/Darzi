package com.darzi.controller;

import com.darzi.model.Category;
import com.darzi.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "*")
public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories() {
        return ResponseEntity.ok(categoryRepository.findByIsActiveTrue());
    }

    @PostMapping
    public ResponseEntity<Category> createCategory(@RequestBody Category category) {
        if (category.getImageUrl() == null || category.getImageUrl().isEmpty()) {
            category.setImageUrl("https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80");
        }
        category.setIsActive(true);
        Category saved = categoryRepository.save(category);
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable Long id) {
        return categoryRepository.findById(id).map(cat -> {
            cat.setIsActive(false);
            categoryRepository.save(cat);
            return ResponseEntity.ok("Category deactivated successfully.");
        }).orElse(ResponseEntity.notFound().build());
    }
}
