// controllers/userController.js

const bookings = require('../data/bookings');
const additionalServices = require('../data/additionalServices');
const messages = require('../data/messages');
const availableRooms = require('../data/availableRooms');

const userController = {
    bookRoom: (req, res) => {
        const { user_id, service, details } = req.body;
        const booking = { id: bookings.length + 1, user_id, service, details };
        bookings.push(booking);
        res.status(201).json({ message: 'Booking placed successfully', booking_id: booking.id });
    },

    changeBookingDetails: (req, res) => {
        const { booking_id } = req.params;
        const { service, details } = req.body;
        const bookingIndex = bookings.findIndex(booking => booking.id === parseInt(booking_id));
        if (bookingIndex === -1) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        bookings[bookingIndex].service = service;
        bookings[bookingIndex].details = details;
        res.status(200).json({ message: 'Booking details updated successfully' });
    },

    cancelBooking: (req, res) => {
        const { booking_id } = req.params;
        const bookingIndex = bookings.findIndex(booking => booking.id === parseInt(booking_id));
        if (bookingIndex === -1) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        bookings.splice(bookingIndex, 1);
        res.status(204).send();
    },

    orderAdditionalService: (req, res) => {
        const { service, details } = req.body;
        const newService = { id: additionalServices.length + 1, service, details };
        additionalServices.push(newService);
        res.status(200).json({ message: 'Additional service ordered successfully', service_id: newService.id });
    },

    viewHotelInfo: (req, res) => {
        const hotelInfo = { hotel_name: 'Hotel Example', rules: 'No smoking', contact: { phone: '1234567890', email: 'info@example.com' } };
        res.status(200).json(hotelInfo);
    },

    viewAvailableRooms: (req, res) => {
        res.status(200).json(availableRooms);
    }
};

module.exports = userController;
