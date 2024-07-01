## Main Part: (50 Marks)

## Models:

### User Model:

- `name`: The name of the user.
- `email`: The contact email address.
- `password`: The account password.
- `phone`: The contact phone number.
- `address`: The physical address.
- `role`: The role of the user, can be `user` or `admin`.

### Room Model:

- `name`: The name of the meeting room.
- `roomNo` : The unique number of the room.
- `floorNo` : The level of the meeting room where it is located.
- `capacity`: The maximum number of people the room can accommodate.
- `pricePerSlot`: The individual cost of a single slot.
- `amenities`: An array of amenities available in the room (e.g., "Projector", "Whiteboard"). Don't use enum.
- `isDeleted`: Boolean to indicates whether the room has been marked as deleted (false means it is not deleted).

### Slot Model

- `room` : Reference to the specific room being booked.
- `date`: Date of the booking.
- `startTime`: Start time of the slot.
- `endTime`: End time of the slot.
- `isBooked`: Boolean to indicate whether the slot has been marked as booked (false means it is not booked).

### Booking Model:

- `room`: Identifier for the booked room (a reference to room model).
- `slots`: An array containing the slot IDs (a reference to the booking slots).
- `user`: Identifier for the user who booked the room (a reference to the user model).
- `date`: Date of the booking.
- `totalAmount` : The total amount of the bill is calculated based on the selected number of slots.
- `isConfirmed`: Indicates the booking status, whether it's `confirmed`, `unconfirmed`, or `canceled`.
- `isDeleted`: Boolean to indicates whether the booking has been marked as deleted (false means it is not deleted).

### Slot Routes

8\. **Create Slot (Only Accessible by Admin)**

- _*Route:*_ `/api/slots`(**POST**)

**Request Headers:**

```javascript
Authorization:
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmF
tZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

You must include "Bearer" at the beginning of the token! Do not copy and apply directly from the module. If you blindly follow the modules, you will be a copy master, not a developer.
```

**Request Body:**

```json
{
  "room": "60d9c4e4f3b4b544b8b8d1c5",
  "date": "2024-06-15",
  "startTime": "09:00",
  "endTime": "14:00"
}
```

**Response Body:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Slots created successfully",
  "data": [
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c6",
      "room": "60d9c4e4f3b4b544b8b8d1c5",
      "date": "2024-06-15",
      "startTime": "09:00",
      "endTime": "10:00",
      "isBooked": false
    },
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c7",
      "room": "60d9c4e4f3b4b544b8b8d1c5",
      "date": "2024-06-15",
      "startTime": "10:00",
      "endTime": "11:00",
      "isBooked": false
    },
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c8",
      "room": "60d9c4e4f3b4b544b8b8d1c5",
      "date": "2024-06-15",
      "startTime": "11:00",
      "endTime": "12:00",
      "isBooked": false
    },
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c9",
      "room": "60d9c4e4f3b4b544b8b8d1c5",
      "date": "2024-06-15",
      "startTime": "12:00",
      "endTime": "13:00",
      "isBooked": false
    },
    {
      "_id": "60d9c4e4f3b4b544b8b8d1ca",
      "room": "60d9c4e4f3b4b544b8b8d1c5",
      "date": "2024-06-15",
      "startTime": "13:00",
      "endTime": "14:00",
      "isBooked": false
    }
  ]
}
```

**9\. Get available slots**

**Route:** `/api/slots/availability`(**GET**)

**Query Parameters:**

- `date`: The specific date for which available slots are requested (format: YYYY-MM-DD).
- `roomId`: ID of the room for which available slots are requested.

> Special Remarks

If we hit `/api/slots/availability` without any query params then we should get all the slots that are not booked ( isBooked: false)

**Request endpoint example**

`/api/slots/availability?date=2024-06-15&roomId=60d9c4e4f3b4b544b8b8d1c5`

or

`/api/slots/availability`

**Response:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Available slots retrieved successfully",
  "data": [
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c6",
      "room": {
        "_id": "60d9c4e4f3b4b544b8b8d1c5",
        "name": "Conference Room",
        "roomNo": 201,
        "floorNo": 1,
        "capacity": 20,
        "pricePerSlot": 100,
        "amenities": ["Projector", "Whiteboard"],
        "isDeleted": false
      },
      "date": "2024-06-15",
      "startTime": "09:00",
      "endTime": "10:00",
      "isBooked": false
    },
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c7",
      "room": {
        "_id": "60d9c4e4f3b4b544b8b8d1c5",
        "name": "Conference Room",
        "roomNo": 201,
        "floorNo": 1,
        "capacity": 20,
        "pricePerSlot": 100,
        "amenities": ["Projector", "Whiteboard"],
        "isDeleted": false
      },
      "date": "2024-06-15",
      "startTime": "10:00",
      "endTime": "11:00",
      "isBooked": false
    }
  ]
}
```

###

### Booking Routes

**10\. Create a Booking (Only Accessible by Authenticated User)**

- _*Route:*_ `/api/bookings` (POST)
- **Request Headers:**

```javascript
Authorization:
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmF
tZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

You must include "Bearer" at the beginning of the token! Do not copy and apply directly from the module. If you blindly follow the modules, you will be a copy master, not a developer.
```

- **Request Body:**

```json
{
  "date": "2024-06-15",
  "slots": ["60d9c4e4f3b4b544b8b8d1c6", "60d9c4e4f3b4b544b8b8d1c7"],
  "room": "60d9c4e4f3b4b544b8b8d1c5",
  "user": "60d9c4e4f3b4b544b8b8d1c4"
}
```

- **Response:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Booking created successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c9",
    "date": "2024-06-15",
    "slots": [
      {
        "_id": "60d9c4e4f3b4b544b8b8d1c6",
        "room": "60d9c4e4f3b4b544b8b8d1c5",
        "date": "2024-06-15",
        "startTime": "09:00",
        "endTime": "10:00",
        "isBooked": true
      },
      {
        "_id": "60d9c4e4f3b4b544b8b8d1c7",
        "room": "60d9c4e4f3b4b544b8b8d1c5",
        "date": "2024-06-15",
        "startTime": "10:00",
        "endTime": "11:00",
        "isBooked": true
      }
    ],
    "room": {
      "_id": "60d9c4e4f3b4b544b8b8d1c5",
      "name": "Conference Room",
      "roomNo": 201,
      "floorNo": 1,
      "capacity": 20,
      "pricePerSlot": 100,
      "amenities": ["Projector", "Whiteboard"],
      "isDeleted": false
    },
    "user": {
      "_id": "60d9c4e4f3b4b544b8b8d1c4",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "phone": "1234567890",
      "address": "123 Main St, Anytown, USA",
      "role": "user"
    },
    "totalAmount": 200,
    "isConfirmed": "unconfirmed",
    "isDeleted": false
  }
}
```

**11\. Get All Bookings (Only Accessible by Admin)**

- _*Route:*_ `/api/bookings` (GET)
- **Request Headers:**

```javascript
Authorization:
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmF
tZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

You must include "Bearer" at the beginning of the token! Do not copy and apply directly from the module. If you blindly follow the modules, you will be a copy master, not a developer.
```

- **Response:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "All bookings retrieved successfully",
  "data": [
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c9",
      "date": "2024-06-15",
      "slots": [
        {
          "_id": "60d9c4e4f3b4b544b8b8d1c6",
          "room": "60d9c4e4f3b4b544b8b8d1c5",
          "date": "2024-06-15",
          "startTime": "09:00",
          "endTime": "10:00",
          "isBooked": true
        },
        {
          "_id": "60d9c4e4f3b4b544b8b8d1c7",
          "room": "60d9c4e4f3b4b544b8b8d1c5",
          "date": "2024-06-15",
          "startTime": "10:00",
          "endTime": "11:00",
          "isBooked": true
        }
      ],
      "room": {
        "_id": "60d9c4e4f3b4b544b8b8d1c5",
        "name": "Conference Room",
        "roomNo": 201,
        "floorNo": 1,
        "capacity": 20,
        "pricePerSlot": 100,
        "amenities": ["Projector", "Whiteboard"],
        "isDeleted": false
      },
      "user": {
        "_id": "60d9c4e4f3b4b544b8b8d1c4",
        "name": "John Doe",
        "email": "john.doe@example.com",
        "phone": "1234567890",
        "address": "123 Main St, Anytown, USA",
        "role": "user"
      },
      "totalAmount": 200,
      "isConfirmed": "unconfirmed",
      "isDeleted": false
    }
    // other bookings ( If any )
  ]
}
```

**12\. Get User's Bookings (Only Accessible by Authenticated User)**

- _*Route:*_ `/api/my-bookings`(**GET**)
- **Request Headers:**

```javascript
Authorization:
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmF
tZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

You must include "Bearer" at the beginning of the token!
```

- **Response:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "User bookings retrieved successfully",
  "data": [
    {
      "_id": "60d9c4e4f3b4b544b8b8d1ca",
      "date": "2024-06-15",
      "slots": [
        {
          "_id": "60d9c4e4f3b4b544b8b8d1c6",
          "room": "60d9c4e4f3b4b544b8b8d1c5",
          "date": "2024-06-15",
          "startTime": "09:00",
          "endTime": "10:00",
          "isBooked": true
        },
        {
          "_id": "60d9c4e4f3b4b544b8b8d1c7",
          "room": "60d9c4e4f3b4b544b8b8d1c5",
          "date": "2024-06-15",
          "startTime": "10:00",
          "endTime": "11:00",
          "isBooked": true
        }
      ],
      "room": {
        "_id": "60d9c4e4f3b4b544b8b8d1c5",
        "name": "Conference Room",
        "roomNo": 201,
        "floorNo": 1,
        "capacity": 20,
        "pricePerSlot": 100,
        "amenities": ["Projector", "Whiteboard"],
        "isDeleted": false
      },
      "totalAmount": 200,
      "isConfirmed": "unconfirmed",
      "isDeleted": false
    }
  ]
}
```

**13\. Update Booking (Only Accessible by Admin)**

- _*Route:*_ `/api/bookings/:id` (PUT)
- **Request Headers:**

```javascript
Authorization:
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmF
tZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

You must include "Bearer" at the beginning of the token! Do not copy and apply directly from the module. If you blindly follow the modules, you will be a copy master, not a developer.
```

- **Request Body:**

```json
{
  "isConfirmed": "confirmed"
}
```

**Response:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Booking updated successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1ca",
    "date": "2024-06-15",
    "slots": ["60d9c4e4f3b4b544b8b8d1c6", "60d9c4e4f3b4b544b8b8d1c7"],
    "totalAmount": 200,
    "room": "60d9c4e4f3b4b544b8b8d1c5",
    "user": "60d9c4e4f3b4b544b8b8d1c4",
    "isConfirmed": "confirmed",
    "isDeleted": false
  }
}
```

### **5\. Zod Validation:**

The API employs Zod for input validation, ensuring data consistency. When validation fails, a 400 Bad Request status code is returned, accompanied by detailed error messages specifying the erroneous fields and reasons.
