const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  post_id: {type: String, required: true},
  author_id: { type: String, required: true, maxLength: 100 },
  content: { type: String, required: true, maxLength: 100 },
  date: { type: Date },
});

// Export model
module.exports = mongoose.model("Comment", CommentSchema);