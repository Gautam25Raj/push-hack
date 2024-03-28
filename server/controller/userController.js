const express = require("express");
const router = express.Router();

const User = require("../model/User");
const Meeting = require("../model/Meeting");

router.get("/:pubKey", async (req, res) => {
  const { pubKey } = req.params;

  try {
    const user = await User.findOne({ pubKey }).populate("meetings");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", async (req, res) => {
  const { pubKey } = req.body;

  if (!pubKey) {
    return res.status(400).json({ message: "pubKey is required" });
  }

  try {
    const existingUser = await User.findOne({ pubKey });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this pubKey already exists" });
    }

    const user = new User({ pubKey });
    await user.save();

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/addMeeting", async (req, res) => {
  const { pubKey, meetingId } = req.body;

  if (!pubKey || !meetingId) {
    return res
      .status(400)
      .json({ message: "pubKey and meetingId are required" });
  }

  try {
    const user = await User.findOne({ pubKey });
    const meeting = await Meeting.findById(meetingId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!meeting) {
      return res.status(404).json({ message: "Meeting not found" });
    }

    if (user.meetings.some((meet) => meet._id.toString() === meetingId)) {
      return res.status(400).json({ message: "Meeting already added" });
    }

    user.meetings.push(meeting);
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/", async (req, res) => {
  const { pubKey, meetingId } = req.body;

  if (!pubKey || !meetingId) {
    return res
      .status(400)
      .json({ message: "pubKey and meetingId are required" });
  }

  try {
    const user = await User.findOne({ pubKey });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const meetingExists = user.meetings.some(
      (meeting) => meeting._id.toString() === meetingId
    );

    if (!meetingExists) {
      return res
        .status(404)
        .json({ message: "Meeting not found in user's meetings" });
    }

    user.meetings.pull({ _id: meetingId });
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
