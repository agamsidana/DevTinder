import { useEffect } from "react";
import {useParams} from 'react-router-dom'

function Chat() {
  const {targetId}=useParams();
  const user=useSelector((state)=>state.user);
  const userId=user?._id;

  
  const [messages,setMessages]=useState([]);
  const [newMessage,setNewMessage]=useState('');


  function handleSendMessage(){
     const socket=createSocketConnection();

     socket.emit('sendMessage',{userId,targetId,text:newMessage});
     setNewMessage('');
  }

  useEffect(()=>{

    if(!user) return;

    const socket=createSocketConnection();

    socket.emit('joinChat',{userId,targetId});

    socket.on('messageReceive',({text})=>{
      setMessages((messages)=>[...messages,{text}]);
    });

    return ()=>{
      socket.disconnect();
    }
  },[userId,targetId]);

  return (
    <div className="flex justify-center overflow-hidden">
      <div className="border-2 border-black h-96 w-1/2 relative">
        <div className="bg-black text-amber-50 h-10">hello</div>

        {messages.length>0 &&<div className="overflow-y-scroll h-screen">
          <div className="chat chat-start">
             <div className="chat-bubble">
              {
                messages.map((msg,idx)=><h1 key={idx}>{msg.text}</h1>)
              }
            </div>
          </div>
          <div className="chat chat-end">
            <div className="chat-bubble">You underestimate my power!</div>
          </div>
        </div>}

        <div className="join absolute bottom-0 w-full">
          <div className="w-full">
            <label className="input w-full outline-0">
              <input type="text" placeholder="enter your message" value={newMessage} onChange={(e)=>setNewMessage(e.target.value)}/>
            </label>
          </div>
          <button className="btn btn-neutral outline-0" onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import { useState } from "react";

export default Chat;
