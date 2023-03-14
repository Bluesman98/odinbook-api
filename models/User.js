const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  img_url:  { type: String, default: "https://cdn-icons-png.flaticon.com/512/6306/6306965.png" },
  friend_list: { type: Array, default: [] },
  friend_requests: { type: Array, default: [] },
  facebook_id :  { type: String },
});

// Export model
module.exports = mongoose.model("User", UserSchema);
