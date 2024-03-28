const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  pubKey: {
    type: String,
    required: true,
    unique: true,
  },

  meetings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Meeting",
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
