const socket = require("socket.io");
const crypto = require('crypto');

function generateRoomId(userId,targetId){

  const sortedId=[userId,targetId].sort().join("_");
  return crypto.createHash('sha256').update(sortedId).digest('hex');
  
}

function initializeSocket(server) {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {

    socket.on('joinChat',({userId,targetId})=>{
      const roomId=generateRoomId(userId,targetId)
      socket.join(roomId);
    });

    socket.on('sendMessage',({userId,targetId,text})=>{
     const roomId=generateRoomId(userId,targetId)
     io.to(roomId).emit('messageReceive',{text});
    });

  });
}

module.exports = initializeSocket;
