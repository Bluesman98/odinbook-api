const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  author_id:{type: String, required:true},
  content: { type: String, required: true},
  date: { type: Date, required: true},
  likes: { type: Array, default: [] },
});

// Export model
module.exports = mongoose.model("Post", PostSchema);