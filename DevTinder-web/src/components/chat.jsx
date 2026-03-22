import { useEffect } from "react";

function Chat() {


  useEffect(()=>{
    const socket=createSocketConnection();
  })

  return (
    <div className="flex justify-center overflow-hidden">
      <div className="border-2 border-black h-96 w-1/2 relative">
        <div className="bg-black text-amber-50 h-10">hello</div>

        <div className="overflow-y-scroll h-screen">
          <div className="chat chat-start">
            <div className="chat-bubble">
              It's over Anakin,
              <br />I have the high ground.
            </div>
          </div>
          <div className="chat chat-end">
            <div className="chat-bubble">You underestimate my power!</div>
          </div>
        </div>

        <div className="join absolute bottom-0 w-full">
          <div className="w-full">
            <label className="input w-full outline-0">
              <input type="text" placeholder="enter your message" />
            </label>
          </div>
          <button className="btn btn-neutral outline-0">Send</button>
        </div>
      </div>
    </div>
  );
}
import { createSocketConnection } from "../utils/socket";

export default Chat;
