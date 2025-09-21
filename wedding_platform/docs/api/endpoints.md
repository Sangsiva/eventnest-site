# API Documentation

## Base URL
`https://api.weddingplatform.com/v1`

## Authentication
All API requests require authentication using JWT (JSON Web Tokens) unless otherwise specified.

### Headers
```
Authorization: Bearer <access_token>
Content-Type: application/json
```

## User Endpoints

### Register User
```
POST /auth/register
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123",
  "first_name": "John",
  "last_name": "Doe",
  "phone": "+919876543210"
}
```

**Response (201 Created):**
```json
{
  "user_id": 123,
  "email": "user@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Login
```
POST /auth/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response (200 OK):**
```json
{
  "user_id": 123,
  "email": "user@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## Vendor Endpoints

### Get Vendor List
```
GET /vendors
```

**Query Parameters:**
- `category` (string, optional): Filter by category slug
- `location` (string, optional): Filter by location ID or slug
- `min_price` (number, optional): Minimum price
- `max_price` (number, optional): Maximum price
- `rating` (number, optional): Minimum rating (1-5)
- `page` (number, optional): Page number (default: 1)
- `limit` (number, optional): Items per page (default: 10)
- `sort` (string, optional): Sort by (popular, rating_high, price_low, price_high)

**Response (200 OK):**
```json
{
  "data": [
    {
      "vendor_id": 456,
      "business_name": "Dream Wedding Photography",
      "category": "photographers",
      "average_rating": 4.8,
      "total_reviews": 124,
      "price_range": {
        "min": 50000,
        "max": 150000,
        "currency": "INR"
      },
      "location": {
        "city": "Mumbai",
        "state": "Maharashtra"
      },
      "cover_image": "https://cdn.weddingbazaar.com/vendors/456/cover.jpg"
    }
  ],
  "pagination": {
    "total": 1245,
    "page": 1,
    "limit": 10,
    "total_pages": 125
  }
}
```

### Get Vendor Details
```
GET /vendors/{vendor_id}
```

**Response (200 OK):**
```json
{
  "vendor_id": 456,
  "business_name": "Dream Wedding Photography",
  "business_description": "Professional wedding photography services with 10+ years of experience.",
  "category": {
    "id": 2,
    "name": "Photographers",
    "slug": "photographers"
  },
  "contact_info": {
    "email": "contact@dreamweddingphoto.com",
    "phone": "+919876543210",
    "website": "https://dreamweddingphoto.com",
    "social_media": {
      "facebook": "https://facebook.com/dreamweddingphoto",
      "instagram": "https://instagram.com/dreamweddingphoto"
    }
  },
  "location": {
    "address": "123 Photography Lane, Bandra West",
    "city": "Mumbai",
    "state": "Maharashtra",
    "pincode": "400050",
    "latitude": 19.0760,
    "longitude": 72.8777
  },
  "stats": {
    "average_rating": 4.8,
    "total_reviews": 124,
    "years_experience": 10,
    "weddings_done": 250
  },
  "price_packages": [
    {
      "package_id": 1,
      "name": "Basic Package",
      "description": "Full day coverage with 500+ edited photos",
      "price": 50000,
      "currency": "INR",
      "features": [
        "10 hours of coverage",
        "500+ high-resolution edited photos",
        "Online gallery",
        "USB drive with all photos"
      ]
    }
  ],
  "portfolio": [
    {
      "id": 1,
      "image_url": "https://cdn.weddingbazaar.com/portfolio/1.jpg",
      "title": "Traditional Hindu Wedding",
      "description": "Full day wedding coverage at The Leela, Mumbai"
    }
  ],
  "recent_reviews": [
    {
      "review_id": 1,
      "user_name": "Priya S.",
      "rating": 5,
      "comment": "Amazing work! Captured every special moment perfectly.",
      "date": "2023-05-15T10:30:00Z",
      "images": [
        "https://cdn.weddingbazaar.com/reviews/1/1.jpg"
      ]
    }
  ],
  "similar_vendors": [
    {
      "vendor_id": 457,
      "business_name": "Wedding Moments",
      "average_rating": 4.7,
      "price_range": {
        "min": 45000,
        "max": 120000,
        "currency": "INR"
      },
      "cover_image": "https://cdn.weddingbazaar.com/vendors/457/cover.jpg"
    }
  ]
}
```

## Booking Endpoints

### Check Availability
```
GET /vendors/{vendor_id}/availability
```

**Query Parameters:**
- `date` (string, required): Date in YYYY-MM-DD format
- `service_id` (number, optional): Specific service to check

**Response (200 OK):**
```json
{
  "available": true,
  "available_slots": [
    "10:00",
    "11:00",
    "14:00",
    "15:00"
  ],
  "next_available_date": "2023-12-15"
}
```

### Create Booking
```
POST /bookings
```

**Request Body:**
```json
{
  "vendor_id": 456,
  "service_id": 1,
  "event_date": "2023-12-20",
  "start_time": "10:00",
  "guest_count": 2,
  "special_requests": "Please arrive 15 minutes early",
  "billing_info": {
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@example.com",
    "phone": "+919876543210",
    "address": "123 Main St, Mumbai"
  },
  "payment_method": "credit_card",
  "card_token": "tok_visa"
}
```

**Response (201 Created):**
```json
{
  "booking_id": 789,
  "booking_reference": "WB20231201-789",
  "status": "confirmed",
  "vendor": {
    "vendor_id": 456,
    "business_name": "Dream Wedding Photography"
  },
  "service": {
    "service_id": 1,
    "name": "Basic Package",
    "price": 50000,
    "currency": "INR"
  },
  "event_date": "2023-12-20",
  "start_time": "10:00",
  "end_time": "20:00",
  "total_amount": 50000,
  "currency": "INR",
  "payment_status": "completed",
  "created_at": "2023-11-01T14:30:00Z"
}
```

## Review Endpoints

### Create Review
```
POST /reviews
```

**Request Body:**
```json
{
  "booking_id": 789,
  "rating": 5,
  "title": "Amazing photography services!",
  "comment": "The photographer captured every special moment perfectly. Highly recommended!",
  "images": [
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQ...",
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQ..."
  ]
}
```

**Response (201 Created):**
```json
{
  "review_id": 123,
  "booking_id": 789,
  "vendor_id": 456,
  "user": {
    "user_id": 123,
    "first_name": "John",
    "last_name": "D",
    "profile_image": "https://cdn.weddingbazaar.com/users/123/profile.jpg"
  },
  "rating": 5,
  "title": "Amazing photography services!",
  "comment": "The photographer captured every special moment perfectly. Highly recommended!",
  "images": [
    "https://cdn.weddingbazaar.com/reviews/123/1.jpg",
    "https://cdn.weddingbazaar.com/reviews/123/2.jpg"
  ],
  "created_at": "2023-12-25T10:15:00Z"
}
```

## Search Endpoints

### Search Vendors
```
GET /search
```

**Query Parameters:**
- `q` (string, optional): Search query
- `category` (string, optional): Category slug
- `location` (string, optional): Location ID or slug
- `min_price` (number, optional): Minimum price
- `max_price` (number, optional): Maximum price
- `rating` (number, optional): Minimum rating (1-5)
- `sort` (string, optional): Sort by (relevance, rating, price_asc, price_desc)
- `page` (number, optional): Page number (default: 1)
- `limit` (number, optional): Items per page (default: 10)

**Response (200 OK):**
```json
{
  "query": {
    "q": "wedding photographer",
    "filters": {
      "category": "photographers",
      "location": "mumbai",
      "min_price": 30000,
      "max_price": 100000,
      "rating": 4
    },
    "sort": "rating"
  },
  "results": [
    {
      "type": "vendor",
      "id": 456,
      "title": "Dream Wedding Photography",
      "description": "Professional wedding photography services with 10+ years of experience.",
      "category": "Photographers",
      "average_rating": 4.8,
      "total_reviews": 124,
      "price_range": {
        "min": 50000,
        "max": 150000,
        "currency": "INR"
      },
      "location": "Mumbai, Maharashtra",
      "image": "https://cdn.weddingbazaar.com/vendors/456/cover.jpg"
    }
  ],
  "pagination": {
    "total": 124,
    "page": 1,
    "limit": 10,
    "total_pages": 13
  },
  "facets": {
    "categories": [
      {
        "id": "photographers",
        "name": "Photographers",
        "count": 124
      },
      {
        "id": "videographers",
        "name": "Videographers",
        "count": 87
      }
    ],
    "price_ranges": [
      {
        "min": 0,
        "max": 30000,
        "count": 45
      },
      {
        "min": 30000,
        "max": 60000,
        "count": 67
      },
      {
        "min": 60000,
        "count": 12
      }
    ],
    "ratings": [
      {
        "rating": 5,
        "count": 89
      },
      {
        "rating": 4,
        "count": 35
      }
    ]
  }
}
```

## Error Responses

### 400 Bad Request
```json
{
  "error": {
    "code": "validation_error",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      },
      {
        "field": "password",
        "message": "Password must be at least 8 characters long"
      }
    ]
  }
}
```

### 401 Unauthorized
```json
{
  "error": {
    "code": "unauthorized",
    "message": "Authentication required"
  }
}
```

### 403 Forbidden
```json
{
  "error": {
    "code": "forbidden",
    "message": "You don't have permission to access this resource"
  }
}
```

### 404 Not Found
```json
{
  "error": {
    "code": "not_found",
    "message": "The requested resource was not found"
  }
}
```

### 500 Internal Server Error
```json
{
  "error": {
    "code": "internal_server_error",
    "message": "An unexpected error occurred"
  }
}
```

## Rate Limiting
- 1000 requests per minute per IP address
- 100 requests per minute per user (when authenticated)

## Versioning
API version is included in the URL path (e.g., `/v1/endpoint`).

## Webhooks
Webhooks can be configured to receive real-time updates for various events.

### Events
- `booking.created`
- `booking.updated`
- `booking.cancelled`
- `payment.completed`
- `review.created`

### Webhook Payload Example
```json
{
  "event": "booking.created",
  "data": {
    "booking_id": 789,
    "booking_reference": "WB20231201-789",
    "status": "confirmed",
    "created_at": "2023-11-01T14:30:00Z"
  },
  "webhook_id": "wh_1234567890"
}
```

## SDKs and Libraries
Official SDKs are available for:
- JavaScript/Node.js
- Python
- PHP
- Java
- Ruby

## Support
For API support, please contact api-support@weddingplatform.com
