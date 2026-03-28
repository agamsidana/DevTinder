const express = require("express");
const { userAuth } = require("../middlewares/userauth");
const { Chat } = require("../models/chat");

const chatRouter = express.Router();

chatRouter.get("/chat/:targetId", userAuth, async (req, res) => {
  const { targetId } = req.params;
  const userId = req.user._id;

  let chat = await Chat.findOne({
    participants: { $all: [userId, targetId] },
  });

  if (!chat) {
    chat = new Chat({
      participants: [userId, targetId],
      messages: [],
    });
    await chat.save();
  }

  res.json({ chat });
});

module.exports = chatRouter;
