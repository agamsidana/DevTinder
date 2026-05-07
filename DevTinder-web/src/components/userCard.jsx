import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { removeFeedById } from "../utils/feedSlice";
import { Icon } from "@iconify/react";
import { motion } from "motion/react"

function UserCard({ user, isButtons,handleUserCardExit }) {
  const { _id, firstName, lastName, photo_url, age, gender, about } = user;
  const dispatch = useDispatch();

  const sendRequest = async (status, id) => {

    try{
    await axios.post(
      `${BASE_URL}/request/send/${status}/${id}`,
      {},
      { withCredentials: true },
    );

    handleUserCardExit(status);
    dispatch(removeFeedById(id));

   }
   catch(err){
    console.log(err);
   }
  };

  return (

    <div
      className="w-96 bg-gradient-to-br from-[#2A0B5E] via-[#4A0F7A] to-[#6B0F7F]
border border-white/10
rounded-2xl
shadow-[0_20px_60px_rgba(168,85,247,0.35)] flex flex-col items-center p-3"
    >
      <img
        src={photo_url}
        alt="photo_url"
        className="rounded-full object-cover ring-purple-600 shadow-[0_0_40px_rgba(236,72,153,0.25)] h-36 w-36"
      />
      <h1 className="text-center text-white font-semibold tracking-wide">{`${firstName} ${lastName}`}</h1>

      <div className="flex gap-1.5  text-white/70">
        <div className="flex gap-1 items-center">
           <Icon
            icon="uil:calender"
            width={20}
            className="text-white/70 hover:text-pink-400"
          />
          <p >{`Age: ${age}`}</p>
        </div>
        <div className="flex items-center gap-1">
            <Icon
            icon="iconamoon:profile-fill"
            width={20}
            className="text-white/70 hover:text-pink-400"
          />
          <p>{`Gender: ${gender}`}</p>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-1 p-2">
        <p
          className="rounded-xl bg-gradient-to-r from-white/10 to-white/5
border border-white/10 px-1.5"
        >
          React Js
        </p>
        <p
          className="rounded-xl bg-gradient-to-r from-white/10 to-white/5
border border-white/10 px-1.5"
        >
          JavaScript
        </p>
        <p
          className="rounded-xl bg-gradient-to-r from-white/10 to-white/5
border border-white/10 px-1.5"
        >
          Node.Js
        </p>
        <p
          className="rounded-xl bg-gradient-to-r from-white/10 to-white/5
border border-white/10 px-1.5"
        >
          TypeScript
        </p>
      </div>

      <div className="p-4">
        <hr className="border-white/20" />

        <p className="text-center text-[12px] text-white/70 leading-relaxed ">{about}</p>
      </div>

      <div className="flex justify-between w-[90%]">
        <button
          className="px-6 py-2.5 rounded-lg font-semibold text-white/90
  bg-white/5
  border border-white/20
  hover:bg-white/10
  active:scale-95
  backdrop-blur-md
  transition-all duration-200 flex items-center gap-1 text-center cursor-pointer"
          onClick={() => {
            sendRequest("ignored", _id);
          }}
        >
          <Icon
            icon="bitcoin-icons:cross-filled"
            width={20}
            className="text-white/70 hover:text-pink-400"
          />
          Ignore
        </button>
        <button
          className="px-6 py-2.5 rounded-lg font-semibold text-white
  bg-gradient-to-r from-[#EC4899] to-[#F43F5E]
  hover:from-[#DB2777] hover:to-[#E11D48]
  active:scale-95
  shadow-[0_8px_20px_rgba(236,72,153,0.45)]
  transition-all duration-200 flex items-center gap-1 text-center cursor-pointer"
               onClick={() => {
                 sendRequest("interested", _id);
              }}
        >
          <Icon
            icon="line-md:heart-filled"
            width={20}
            className="text-white/70 hover:text-pink-400"
          />
          Interested
        </button>
      </div>
    </div>
  );
}

export default UserCard;
