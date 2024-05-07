const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

let bookings = [
    { id: 1, user_id: 1, service: 'Room service', details: 'Breakfast in bed' },
    { id: 2, user_id: 2, service: 'Laundry', details: 'Washing clothes' }
];

let additionalServices = [
    { id: 1, service: 'Spa', description: 'Massage and relaxation services' },
    { id: 2, service: 'Restaurant', description: 'Fine dining experience' }
];

let messages = [
    { id: 1, user_id: 'user1', message: 'Welcome to our hotel!', timestamp: '2024-04-22T12:00:00Z' },
    { id: 2, user_id: 'user2', message: 'Enjoy your stay!', timestamp: '2024-04-22T13:00:00Z' }
];


let availableRooms = [
    { id: 1, type: 'Single', price: 100 },
    { id: 2, type: 'Double', price: 150 },
    { id: 3, type: 'Suite', price: 250 }
];

// Admin functionalities
// View list of bookings
app.get('/api/admin/bookings', (req, res) => {
    res.status(200).json(bookings);
});

// View booking details
app.get('/api/admin/bookings/:booking_id', (req, res) => {
    const { booking_id } = req.params;
    const booking = bookings.find(booking => booking.id === parseInt(booking_id));
    if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json(booking);
});

// Edit booking details
app.put('/api/admin/bookings/:booking_id', (req, res) => {
    const { booking_id } = req.params;
    const { service, details } = req.body;
    const bookingIndex = bookings.findIndex(booking => booking.id === parseInt(booking_id));
    if (bookingIndex === -1) {
        return res.status(404).json({ message: 'Booking not found' });
    }
    bookings[bookingIndex].service = service;
    bookings[bookingIndex].details = details;
    res.status(200).json({ message: 'Booking details updated successfully' });
});

// Cancel booking
app.delete('/api/admin/bookings/:booking_id', (req, res) => {
    const { booking_id } = req.params;
    const bookingIndex = bookings.findIndex(booking => booking.id === parseInt(booking_id));
    if (bookingIndex === -1) {
        return res.status(404).json({ message: 'Booking not found' });
    }
    bookings.splice(bookingIndex, 1);
    res.status(204).send();
});

// Add additional service
app.post('/api/admin/services', (req, res) => {
    const { service, description } = req.body;
    const newService = { id: additionalServices.length + 1, service, description };
    additionalServices.push(newService);
    res.status(201).json({ message: 'Additional service added successfully', service_id: newService.id });
});

// Delete additional service
app.delete('/api/admin/services/:service_id', (req, res) => {
    const { service_id } = req.params;
    const serviceIndex = additionalServices.findIndex(service => service.id === parseInt(service_id));
    if (serviceIndex === -1) {
        return res.status(404).json({ message: 'Service not found' });
    }
    additionalServices.splice(serviceIndex, 1);
    res.status(204).send();
});

// Respond to user messages
app.post('/api/admin/messages/:message_id/response', (req, res) => {
    const { message_id } = req.params;
    const { response } = req.body;
    const messageIndex = messages.findIndex(message => message.id === parseInt(message_id));
    if (messageIndex === -1) {
        return res.status(404).json({ message: 'Message not found' });
    }
    messages[messageIndex].response = response;
    res.status(200).json({ message: 'Response sent successfully' });
});
// Admin functionalities end

// User functionalities
// Book a room
app.post('/api/user/bookings', (req, res) => {
    const { user_id, service, details } = req.body;
    const booking = { id: bookings.length + 1, user_id, service, details };
    bookings.push(booking);
    res.status(201).json({ message: 'Booking placed successfully', booking_id: booking.id });
});

// Change booking details
app.put('/api/user/bookings/:booking_id', (req, res) => {
    const { booking_id } = req.params;
    const { service, details } = req.body;
    const bookingIndex = bookings.findIndex(booking => booking.id === parseInt(booking_id));
    if (bookingIndex === -1) {
        return res.status(404).json({ message: 'Booking not found' });
    }
    bookings[bookingIndex].service = service;
    bookings[bookingIndex].details = details;
    res.status(200).json({ message: 'Booking details updated successfully' });
});

// Cancel booking
app.delete('/api/user/bookings/:booking_id', (req, res) => {
    const { booking_id } = req.params;
    const bookingIndex = bookings.findIndex(booking => booking.id === parseInt(booking_id));
    if (bookingIndex === -1) {
        return res.status(404).json({ message: 'Booking not found' });
    }
    bookings.splice(bookingIndex, 1);
    res.status(204).send();
});

// Order additional service
app.post('/api/user/services', (req, res) => {
    const { service, details } = req.body;
    // Assuming we add the service to the array of additional services
    const newService = { id: additionalServices.length + 1, service, details };
    additionalServices.push(newService);
    res.status(200).json({ message: 'Additional service ordered successfully', service_id: newService.id });
});

// View hotel information
app.get('/api/user/hotel/info', (req, res) => {
    // Assuming we retrieve hotel information from somewhere and send it as response
    const hotelInfo = { hotel_name: 'Hotel Example', rules: 'No smoking', contact: { phone: '1234567890', email: 'info@example.com' } };
    res.status(200).json(hotelInfo);
});

// View available rooms
app.get('/api/user/hotel/rooms', (req, res) => {
    res.status(200).json(availableRooms);
});

// User functionalities end


// Run the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
