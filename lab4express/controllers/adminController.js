// controllers/adminController.js

const bookings = require('../data/bookings');
const additionalServices = require('../data/additionalServices');
const messages = require('../data/messages');
const availableRooms = require('../data/availableRooms');

const adminController = {
    getBookings: (req, res) => {
        res.status(200).json(bookings);
    },

    getBookingDetails: (req, res) => {
        const { booking_id } = req.params;
        const booking = bookings.find(booking => booking.id === parseInt(booking_id));
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json(booking);
    },

    editBookingDetails: (req, res) => {
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

    addAdditionalService: (req, res) => {
        const { service, description } = req.body;
        const newService = { id: additionalServices.length + 1, service, description };
        additionalServices.push(newService);
        res.status(201).json({ message: 'Additional service added successfully', service_id: newService.id });
    },

    deleteAdditionalService: (req, res) => {
        const { service_id } = req.params;
        const serviceIndex = additionalServices.findIndex(service => service.id === parseInt(service_id));
        if (serviceIndex === -1) {
            return res.status(404).json({ message: 'Service not found' });
        }
        additionalServices.splice(serviceIndex, 1);
        res.status(204).send();
    },

    respondToMessage: (req, res) => {
        const { message_id } = req.params;
        const { response } = req.body;
        const messageIndex = messages.findIndex(message => message.id === parseInt(message_id));
        if (messageIndex === -1) {
            return res.status(404).json({ message: 'Message not found' });
        }
        messages[messageIndex].response = response;
        res.status(200).json({ message: 'Response sent successfully' });
    }
};

module.exports = adminController;
