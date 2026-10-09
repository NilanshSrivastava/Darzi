-- Initial Seeding for Darzi Platform

-- Admin Account (Email restricted: admin@darzi.com)
INSERT INTO users (id, name, email, password, phone, city, neighborhood, role, created_at) VALUES 
(1, 'Darzi Owner Admin', 'admin@darzi.com', 'admin123', '+91 9876543210', 'Delhi NCR', 'Connaught Place', 'ROLE_ADMIN', CURRENT_TIMESTAMP);

-- Sample Tailors (Partners)
INSERT INTO users (id, name, email, password, phone, city, neighborhood, role, created_at) VALUES 
(2, 'Master Rajesh Kumar', 'rajesh.tailor@darzi.com', 'tailor123', '+91 9811223344', 'Delhi NCR', 'Lajpat Nagar', 'ROLE_TAILOR', CURRENT_TIMESTAMP),
(3, 'Sultana Boutique', 'sultana.boutique@darzi.com', 'tailor123', '+91 9899887766', 'Delhi NCR', 'Shahpur Jat', 'ROLE_TAILOR', CURRENT_TIMESTAMP),
(4, 'Verma Gentleman Stitchers', 'verma.suits@darzi.com', 'tailor123', '+91 9711554433', 'Delhi NCR', 'Karol Bagh', 'ROLE_TAILOR', CURRENT_TIMESTAMP);

INSERT INTO tailor_profiles (id, user_id, shop_name, experience_years, specialties, rating, total_orders_completed, status) VALUES 
(1, 2, 'Rajesh Master Craft', 18, 'Saree Blouses, Designer Kurtis, Lehengas', 4.9, 142, 'APPROVED'),
(2, 3, 'Sultana Studio', 12, 'Anarkalis, Indo-Western Gowns, Velvet Blouses', 4.8, 98, 'APPROVED'),
(3, 4, 'Verma & Sons Tailors', 25, 'Men Sherwanis, Custom Suits, Nehru Jackets', 4.95, 210, 'APPROVED');

-- Sample Categories
INSERT INTO categories (id, name, description, base_price, estimated_days, image_url, is_active) VALUES
(1, 'Designer Saree Blouse', 'Padded/Non-padded bespoke saree blouses with custom necklines, back cutouts, and tassels.', 499.00, 3, 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80', true),
(2, 'Ethnic Kurti & Suits', 'Daily wear & festive straight-cut, A-line, and flared kurtis with lining options.', 699.00, 4, 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80', true),
(3, 'Grand Anarkali & Gowns', 'Floor-length flared Anarkali ensembles, kali cuts, and designer dupattas.', 1499.00, 6, 'https://images.unsplash.com/photo-1563178406-4cdc2923acbc?auto=format&fit=crop&w=600&q=80', true),
(4, 'Lehenga Choli Set', 'Bespoke blouse stitching, lehenga skirt waist fitting, and dupatta edging.', 1799.00, 7, 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80', true),
(5, 'Men Sherwani & Kurta Pyjama', 'Royal festive sherwanis, bandhgalas, and tailored cotton/silk kurta sets.', 1299.00, 5, 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80', true),
(6, 'Garment Alteration & Repair', 'Express doorstep size alteration, sleeve shortening, zip replacement, and taper fitting.', 199.00, 2, 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80', true);

-- Sample Customer User
INSERT INTO users (id, name, email, password, phone, city, neighborhood, role, created_at) VALUES 
(5, 'Pooja Sharma', 'pooja@example.com', 'user123', '+91 9988776655', 'Delhi NCR', 'Lajpat Nagar', 'ROLE_CUSTOMER', CURRENT_TIMESTAMP);

-- Sample Measurement Profile
INSERT INTO measurement_profiles (id, user_id, profile_title, garment_type, chest, waist, hips, shoulder, sleeve_length, inseam, garment_length, custom_notes, sample_garment_pickup_requested) VALUES
(1, 5, 'My Festive Blouse Fit', 'Designer Saree Blouse', 36.0, 30.0, 38.0, 14.5, 10.5, 0.0, 14.0, 'Prefer sweetheart neck, padded front, deep back with dori tassels.', true);

-- Sample Reviews & Portfolio Works
INSERT INTO reviews (id, tailor_profile_id, customer_name, rating, fit_score, review_text, garment_category, image_url, created_at) VALUES
(1, 1, 'Ananya Roy', 5.0, 5.0, 'Master Rajesh stitched my velvet bridal saree blouse to absolute perfection! Doorstep executive took measurements cleanly.', 'Designer Saree Blouse', 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80', CURRENT_TIMESTAMP),
(2, 1, 'Sneha Kapoor', 4.9, 4.8, 'The padded support and sweetheart neck cut were flawless. Will definitely reorder for all my festive kurtis.', 'Ethnic Kurti & Suits', 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80', CURRENT_TIMESTAMP),
(3, 2, 'Meera Sen', 4.8, 4.9, 'Sultana Studio delivered my floor-length Anarkali in just 4 days. The flared kali cut draping is gorgeous!', 'Grand Anarkali & Gowns', 'https://images.unsplash.com/photo-1563178406-4cdc2923acbc?auto=format&fit=crop&w=600&q=80', CURRENT_TIMESTAMP),
(4, 3, 'Vikramaditya Rao', 5.0, 5.0, 'Verma Ji crafted my silk wedding Sherwani with impeccable shoulder structure and hand embroidery detail.', 'Men Sherwani & Kurta Pyjama', 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80', CURRENT_TIMESTAMP);

-- Sample Customer Query
INSERT INTO customer_queries (id, customer_id, subject, message, admin_reply, status, created_at, replied_at) VALUES
(1, 5, 'Doorstep Measurement Availability in Lajpat Nagar', 'Can I request a female measurement specialist for this Saturday evening at 5 PM?', 'Hello Pooja! Yes, our doorstep specialist Team Darzi will arrive at 5 PM on Saturday. We have confirmed your appointment slot.', 'RESOLVED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
