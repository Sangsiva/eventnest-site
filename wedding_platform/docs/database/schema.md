# Database Schema Design

## 1. Core Tables

### Users
```sql
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    profile_image_url VARCHAR(512),
    is_email_verified BOOLEAN DEFAULT false,
    is_phone_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login_at TIMESTAMP WITH TIME ZONE
);
```

### User_Profiles
```sql
CREATE TABLE user_profiles (
    profile_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    wedding_date DATE,
    partner_name VARCHAR(200),
    budget DECIMAL(12, 2),
    location_id INTEGER REFERENCES locations(location_id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### Vendors
```sql
CREATE TABLE vendors (
    vendor_id SERIAL PRIMARY KEY,
    business_name VARCHAR(255) NOT NULL,
    business_email VARCHAR(255) UNIQUE NOT NULL,
    business_phone VARCHAR(20) NOT NULL,
    business_description TEXT,
    years_of_experience INTEGER,
    is_verified BOOLEAN DEFAULT false,
    is_featured BOOLEAN DEFAULT false,
    average_rating DECIMAL(3, 2) DEFAULT 0.00,
    total_reviews INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### Vendor_Categories
```sql
CREATE TABLE vendor_categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    icon_url VARCHAR(512),
    is_active BOOLEAN DEFAULT true
);

-- Sample categories
INSERT INTO vendor_categories (name, slug, description) VALUES
    ('Venues', 'venues', 'Wedding venues and banquet halls'),
    ('Photographers', 'photographers', 'Wedding photography services'),
    ('Makeup Artists', 'makeup-artists', 'Bridal makeup and hairstyling'),
    ('Caterers', 'caterers', 'Wedding catering services'),
    ('Decorators', 'decorators', 'Wedding decoration and floral arrangements'),
    ('Mehndi Artists', 'mehndi-artists', 'Henna application services'),
    ('DJs', 'djs', 'Wedding music and entertainment'),
    ('Wedding Planners', 'planners', 'Full-service wedding planning');
```

### Vendor_Services
```sql
CREATE TABLE vendor_services (
    service_id SERIAL PRIMARY KEY,
    vendor_id INTEGER REFERENCES vendors(vendor_id) ON DELETE CASCADE,
    category_id INTEGER REFERENCES vendor_categories(category_id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price_range_start DECIMAL(10, 2),
    price_range_end DECIMAL(10, 2),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

## 2. Location Management

### Locations
```sql
CREATE TABLE locations (
    location_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    parent_id INTEGER REFERENCES locations(location_id),
    location_type VARCHAR(50), -- country, state, city, area
    is_active BOOLEAN DEFAULT true
);

-- Create index for faster lookups
CREATE INDEX idx_locations_slug ON locations(slug);
CREATE INDEX idx_locations_parent ON locations(parent_id);
```

### Vendor_Locations
```sql
CREATE TABLE vendor_locations (
    vendor_id INTEGER REFERENCES vendors(vendor_id) ON DELETE CASCADE,
    location_id INTEGER REFERENCES locations(location_id) ON DELETE CASCADE,
    address_line1 VARCHAR(255),
    address_line2 VARCHAR(255),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    is_primary BOOLEAN DEFAULT false,
    PRIMARY KEY (vendor_id, location_id)
);
```

## 3. Booking System

### Bookings
```sql
CREATE TABLE bookings (
    booking_id SERIAL PRIMARY KEY,
    booking_reference VARCHAR(50) UNIQUE NOT NULL,
    user_id INTEGER REFERENCES users(user_id) ON DELETE SET NULL,
    vendor_id INTEGER REFERENCES vendors(vendor_id) ON DELETE CASCADE,
    service_id INTEGER REFERENCES vendor_services(service_id) ON DELETE SET NULL,
    booking_date TIMESTAMP WITH TIME ZONE NOT NULL,
    event_date DATE NOT NULL,
    start_time TIME,
    end_time TIME,
    guest_count INTEGER,
    special_requests TEXT,
    status VARCHAR(50) NOT NULL, -- pending, confirmed, cancelled, completed
    total_amount DECIMAL(12, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'INR',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_bookings_user ON bookings(user_id);
CREATE INDEX idx_bookings_vendor ON bookings(vendor_id);
CREATE INDEX idx_bookings_status ON bookings(status);
```

### Booking_Payments
```sql
CREATE TABLE booking_payments (
    payment_id SERIAL PRIMARY KEY,
    booking_id INTEGER REFERENCES bookings(booking_id) ON DELETE CASCADE,
    amount DECIMAL(12, 2) NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    transaction_id VARCHAR(255),
    payment_status VARCHAR(50) NOT NULL, -- pending, completed, failed, refunded
    payment_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

## 4. Reviews and Ratings

### Reviews
```sql
CREATE TABLE reviews (
    review_id SERIAL PRIMARY KEY,
    booking_id INTEGER REFERENCES bookings(booking_id) ON DELETE SET NULL,
    user_id INTEGER REFERENCES users(user_id) ON DELETE SET NULL,
    vendor_id INTEGER REFERENCES vendors(vendor_id) ON DELETE CASCADE,
    rating DECIMAL(2, 1) NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(255),
    comment TEXT,
    is_approved BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_reviews_vendor ON reviews(vendor_id);
CREATE INDEX idx_reviews_user ON reviews(user_id);
```

### Review_Media
```sql
CREATE TABLE review_media (
    media_id SERIAL PRIMARY KEY,
    review_id INTEGER REFERENCES reviews(review_id) ON DELETE CASCADE,
    media_url VARCHAR(512) NOT NULL,
    media_type VARCHAR(50) NOT NULL, -- image, video
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

## 5. Media Management

### Vendor_Media
```sql
CREATE TABLE vendor_media (
    media_id SERIAL PRIMARY KEY,
    vendor_id INTEGER REFERENCES vendors(vendor_id) ON DELETE CASCADE,
    media_url VARCHAR(512) NOT NULL,
    media_type VARCHAR(50) NOT NULL, -- image, video
    title VARCHAR(255),
    description TEXT,
    is_primary BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_vendor_media_vendor ON vendor_media(vendor_id);
```

## 6. Favorites and Shortlisting

### User_Favorites
```sql
CREATE TABLE user_favorites (
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    vendor_id INTEGER REFERENCES vendors(vendor_id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, vendor_id)
);

CREATE INDEX idx_user_favorites_user ON user_favorites(user_id);
```

## 7. Notifications

### Notifications
```sql
CREATE TABLE notifications (
    notification_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    notification_type VARCHAR(50) NOT NULL,
    reference_id INTEGER, -- Could be booking_id, review_id, etc.
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(is_read);
```

## 8. Search and Discovery

### Search_History
```sql
CREATE TABLE search_history (
    search_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    query TEXT NOT NULL,
    filters JSONB,
    result_count INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_search_history_user ON search_history(user_id);
```

## 9. Analytics and Reporting

### Vendor_Analytics
```sql
CREATE TABLE vendor_analytics (
    analytics_id SERIAL PRIMARY KEY,
    vendor_id INTEGER REFERENCES vendors(vendor_id) ON DELETE CASCADE,
    date DATE NOT NULL,
    page_views INTEGER DEFAULT 0,
    profile_views INTEGER DEFAULT 0,
    contact_clicks INTEGER DEFAULT 0,
    whatsapp_clicks INTEGER DEFAULT 0,
    call_clicks INTEGER DEFAULT 0,
    email_clicks INTEGER DEFAULT 0,
    UNIQUE(vendor_id, date)
);
```

## 10. System Settings

### System_Settings
```sql
CREATE TABLE system_settings (
    setting_id SERIAL PRIMARY KEY,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    setting_group VARCHAR(50),
    is_public BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert default settings
INSERT INTO system_settings (setting_key, setting_value, setting_group, is_public) VALUES
    ('site_name', 'EventNest', 'general', true),
    ('site_description', 'India\'s Largest Wedding Planning Platform', 'general', true),
    ('default_currency', 'INR', 'payment', true),
    ('commission_rate', '10', 'payment', false),
    ('support_email', 'support@weddingbazaar.com', 'contact', true);
```

## Indexing Strategy

1. **Primary Keys**: All tables have appropriate primary keys
2. **Foreign Keys**: Indexed for join operations
3. **Searchable Fields**: Indexed for common search patterns
4. **Composite Indexes**: Used for frequently combined conditions

## Database Maintenance

1. Regular backups (daily differential, weekly full)
2. Query optimization and index maintenance
3. Partitioning for large tables (e.g., bookings, reviews)
4. Regular VACUUM and ANALYZE operations
5. Monitoring and alerting for performance issues
