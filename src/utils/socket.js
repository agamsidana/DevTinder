const socket = require("socket.io");
const crypto = require("crypto");
const { Chat } = require("../models/chat");
const {ConnectionRequest}=require('../models/connectionRequest');

function generateRoomId(userId, targetId) {
  const sortedId = [userId, targetId].sort().join("_");
  return crypto.createHash("sha256").update(sortedId).digest("hex");
}

function initializeSocket(server) {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    socket.on("joinChat", ({ userId, targetId }) => {
      const roomId = generateRoomId(userId, targetId);
      socket.join(roomId);
    });

    socket.on("sendMessage", async ({ userId, targetId, text,firstName,lastName }) => {
      try {
        const roomId = generateRoomId(userId, targetId);

        //check if userId and targetUserId have a connection
        const connection=await ConnectionRequest.findOne({
          $or:[
            {fromUserId:userId},
            {fromUserId:targetId}
          ],
          $or:[
            {toUserId:userId},
            {toUserId:targetId}
          ],
          status:'accepted'
        });

        if(!connection) return;

        let chat = await Chat.findOne({
          participants: { $all: [userId, targetId] },
        });

        if (!chat) {
          chat = new Chat({
            participants: [userId, targetId],
            messages: [],
          });
        }

        chat.messages.push({
          senderId: userId,
          text: text,
        });

        await chat.save();

        io.to(roomId).emit("messageReceive", { text,userId,firstName,lastName });
      } catch (err) {
        console.log(err);
      }
    });
  });
}

module.exports = initializeSocket;
