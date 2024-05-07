// models/bookingModel.js
class Booking {
    constructor(id, user_id, service, details) {
        this.id = id;
        this.user_id = user_id;
        this.service = service;
        this.details = details;
    }
}

module.exports = Booking;
