const mongoose = require("mongoose");
const Message = require("./Message");

const Schema = mongoose.Schema;

const ChatSchema = new Schema({
    users: { type: Array, default: [] },
    messages: { type: Array, default: [Message] },
});

// Export model
module.exports = mongoose.model("Chat", ChatSchema);
