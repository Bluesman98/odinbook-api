const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    author: { type: String, required: true },
    text: { type: String, required: true },
    date: { type: String, required: false, default: new Date() },
    read_by: { type: Array, required: false, default: [] },
});

// Export model
module.exports = mongoose.model("Message", MessageSchema);