// models/messageModel.js
class Message {
    constructor(id, user_id, message, timestamp) {
        this.id = id;
        this.user_id = user_id;
        this.message = message;
        this.timestamp = timestamp;
    }
}

module.exports = Message;
