// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Book a room
router.post('/bookings', userController.bookRoom);

// Change booking details
router.put('/bookings/:booking_id', userController.changeBookingDetails);

// Cancel booking
router.delete('/bookings/:booking_id', userController.cancelBooking);

// Order additional service
router.post('/services', userController.orderAdditionalService);

// View hotel information
router.get('/hotel/info', userController.viewHotelInfo);

// View available rooms
router.get('/hotel/rooms', userController.viewAvailableRooms);

module.exports = router;
