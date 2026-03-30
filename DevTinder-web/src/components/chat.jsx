import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Chat() {
  const { targetId } = useParams();
  const user = useSelector((state) => state.user);
  const userId = user?._id;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  function handleSendMessage() {
    const socket = createSocketConnection();

    socket.emit("sendMessage", { userId, targetId, text: newMessage,firstName:user.firstName, lastName:user.lastName});
    setNewMessage("");
  }

  async function getPreviousChat() {
    try {
      const res = await axios.get(BASE_URL + "/chat/" + targetId, {
        withCredentials: true,
      });
      const prevMessages = res.data?.chat?.messages.map((msg) => {
        return {
          text: msg.text,
          firstName: msg.senderId.firstName,
          lastName: msg.senderId.lastName,
          userId: msg.senderId._id,
        };
      });
      setMessages(prevMessages);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (!user) return;

    const socket = createSocketConnection();

    socket.emit("joinChat", { userId, targetId });

    socket.on("messageReceive", ({ text,userId,firstName,lastName }) => {
      setMessages((messages) => [...messages, { text,userId,firstName,lastName }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetId]);

  useEffect(() => {
    getPreviousChat();
  }, []);

  return (
    <div className="flex justify-center">
      <div className="border-2 border-black h-96 w-1/2 relative overflow-hidden">
        <div className="bg-black text-amber-50 h-10 text-center">chat</div>

        <div className="overflow-y-scroll h-full pb-20">
          {messages.length > 0 &&
            messages.map((msg, idx) => (
              <div
                key={idx}
                className={`chat ${userId.toString() === msg.userId._toString() ? "chat-end" : "chat-start"}`}
              >
                <div className="chat-header">
                  {msg.firstName + " " + msg.lastName}
                </div>
                <div className="chat-bubble">{msg.text}</div>
              </div>
            ))}
        </div>

        <div className="join absolute bottom-0 w-full">
          <div className="w-full">
            <label className="input w-full outline-0">
              <input
                type="text"
                placeholder="enter your message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
            </label>
          </div>
          <button
            className="btn btn-neutral outline-0"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import { useState } from "react";
import { BASE_URL } from "../utils/constant";

export default Chat;
