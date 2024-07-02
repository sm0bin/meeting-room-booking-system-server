# Meeting Room Booking System for Co-working Spaces

## Introduction

A Meeting Room Booking System for co-working spaces to streamline room reservations. It supports user authentication, room management, slot management, and booking functionalities.

## Features

- User authentication (admin and user roles)
- CRUD operations for rooms (admin only)
- Slot management (admin only)
- Room booking (users)

## Technology Stack

- **Language:** TypeScript
- **Framework:** Express.js
- **Database:** MongoDB
- **ODM:** Mongoose

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sm0bin/meeting-room-booking-system-server.git
   cd meeting-room-booking-system
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up environment variables:**
   Create a `.env` file:
   ```plaintext
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
4. **Run the application:**
   ```bash
   npm run dev
   ```

## Models

- **User:** name, email, password, phone, address, role
- **Room:** name, roomNo, floorNo, capacity, pricePerSlot, amenities, isDeleted
- **Slot:** room, date, startTime, endTime, isBooked
- **Booking:** room, slots, user, date, totalAmount, isConfirmed, isDeleted

## API Endpoints

### User Routes

- **Sign Up:** `/api/auth/signup` (POST)
- **Login:** `/api/auth/login` (POST)

### Room Routes

- **Create Room (Admin):** `/api/rooms` (POST)
- **Get Room:** `/api/rooms/:id` (GET)
- **Get All Rooms:** `/api/rooms` (GET)
- **Update Room (Admin):** `/api/rooms/:id` (PUT)
- **Delete Room (Admin):** `/api/rooms/:id` (DELETE)

### Slot Routes

- **Create Slot (Admin):** `/api/slots` (POST)
- **Get All Available Slots:** `/api/slots/availability` (GET)

### Booking Routes

- **Create Booking (User):** `/api/bookings` (POST)
- **Get All Bookings (Admin):** `/api/bookings` (GET)
- **Get User Bookings (User):** `/api/bookings/my-bookings` (GET)
- **Update Booking (Admin):** `/api/bookings/:id` (PUT)
- **Delete Booking (Admin):** `/api/bookings/:id` (DELETE)

## Live Server

Visit the live server at: [https://booking-system-server-psi.vercel.app](https://booking-system-server-psi.vercel.app)
