const express = require("express");
const router = express.Router();
const Meeting = require("../model/Meeting");

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const meeting = await Meeting.findById(id);

    if (!meeting) {
      return res.status(404).json({ message: "Meeting not found" });
    }

    res.status(200).json(meeting);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/user/:pubkey", async (req, res) => {
  const { pubkey } = req.params;

  try {
    const meetings = await Meeting.find({ pubkey: pubkey }).sort({
      meetingTime: 1,
    });

    if (!meetings.length) {
      return res
        .status(404)
        .json({ message: "No meetings found for this user" });
    }

    res.status(200).json(meetings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", async (req, res) => {
  const { recipientPubKey, meetingTime, status } = req.body;

  if (!recipientPubKey || !meetingTime || !status) {
    return res.status(400).json({
      message: "recipientPubKey, meetingTime, and status are required",
    });
  }

  try {
    const meetingDate = new Date(meetingTime);

    const conflictingMeetings = await Meeting.find({
      recipientPubKey,
      meetingTime: {
        $gte: new Date(meetingDate.getTime() - 60 * 59 * 1000),
        $lte: new Date(meetingDate.getTime() + 60 * 59 * 1000),
      },
    });

    if (conflictingMeetings.length > 0) {
      return res.status(400).json({
        message: "At least 1 hour gap is required between meetings",
      });
    }

    const meeting = new Meeting({ recipientPubKey, meetingTime, status });
    await meeting.save();

    res.status(201).json(meeting);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/", async (req, res) => {
  const { meetingId, recipientPubKey, meetingTime, status } = req.body;

  if (!meetingId) {
    return res.status(400).json({ message: "meetingId is required" });
  }

  try {
    const meeting = await Meeting.findById(meetingId);

    if (!meeting) {
      return res.status(404).json({ message: "Meeting not found" });
    }

    if (recipientPubKey) meeting.recipientPubKey = recipientPubKey;
    if (meetingTime) meeting.meetingTime = meetingTime;
    if (status) meeting.status = status;

    await meeting.save();

    res.status(200).json(meeting);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/", async (req, res) => {
  const { meetingId } = req.body;

  if (!meetingId) {
    return res.status(400).json({ message: "meetingId is required" });
  }

  try {
    const meeting = await Meeting.findById(meetingId);

    if (!meeting) {
      return res.status(404).json({ message: "Meeting not found" });
    }

    await Meeting.findByIdAndDelete(meetingId);

    res.status(200).json({ message: "Meeting deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
