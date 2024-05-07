// routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// View list of bookings
router.get('/bookings', adminController.getBookings);

// View booking details
router.get('/bookings/:booking_id', adminController.getBookingDetails);

// Edit booking details
router.put('/bookings/:booking_id', adminController.editBookingDetails);

// Cancel booking
router.delete('/bookings/:booking_id', adminController.cancelBooking);

// Add additional service
router.post('/services', adminController.addAdditionalService);

// Delete additional service
router.delete('/services/:service_id', adminController.deleteAdditionalService);

// Respond to user messages
router.post('/messages/:message_id/response', adminController.respondToMessage);

module.exports = router;
