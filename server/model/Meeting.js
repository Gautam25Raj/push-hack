const mongoose = require("mongoose");

const MeetingSchema = new mongoose.Schema({
  recipientPubKey: {
    type: String,
    required: true,
  },

  meetingTime: {
    type: Date,
    required: true,
  },

  status: {
    type: String,
    enum: ["not attended", "attend", "attended"],
    default: "not attended",
  },
});

module.exports = mongoose.model("Meeting", MeetingSchema);
