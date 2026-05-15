import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { removeFeedById } from "../utils/feedSlice";
import { Icon } from "@iconify/react";
import { motion } from "motion/react"
import { useEffect } from "react";

function UserCard({ user,handleUserCardExit,isInterestedDisabled,isIgnoredDisabled,setIsInterestedDisabled,SetIsIgnoredDisabled }) {
  const { _id, firstName, lastName, photo_url, age, gender, about } = user;
  const dispatch = useDispatch();

  const sendRequest = async (status, id) => {

    setIsInterestedDisabled(true);
    SetIsIgnoredDisabled(true);

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

   finally{
    setIsInterestedDisabled(false);
    SetIsIgnoredDisabled(false);
   }
  };

  return (

    <div
      className="w-96 bg-white border border-pink-100 rounded-2xl shadow-xl flex flex-col items-center p-3"
    >
      <img
        src={photo_url}
        alt="photo_url"
        className="rounded-full h-36 w-36 border-4 border-pink-200"
      />
      <h1 className="text-center text-slate-900 font-semibold tracking-wide">{`${firstName} ${lastName}`}</h1>

      <div className="flex gap-1.5 text-slate-700">
        <div className="flex gap-1 items-center">
           <Icon
            icon="uil:calender"
            width={20}
            className="text-rose-500 hover:text-rose-600"
          />
          <p >{`Age: ${age}`}</p>
        </div>
        <div className="flex items-center gap-1">
            <Icon
            icon="iconamoon:profile-fill"
            width={20}
            className="text-rose-500 hover:text-rose-600"
          />
          <p>{`Gender: ${gender}`}</p>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-1 p-2 text-rose-500">
        <p
          className="rounded-xl bg-rose-50 border border-rose-100 px-1.5"
        >
          React Js
        </p>
        <p
          className="rounded-xl bg-rose-50 border border-rose-100 px-1.5"
        >
          JavaScript
        </p>
        <p
          className="rounded-xl bg-rose-50 border border-rose-100 px-1.5"
        >
          Node.Js
        </p>
        <p
          className="rounded-xl bg-rose-50 border border-rose-100 px-1.5"
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
          className="px-6 py-2.5 rounded-lg font-semibold
  bg-white border border-pink-200 text-rose-500
  hover:bg-rose-50
  active:scale-95
  transition-all duration-200 flex items-center gap-1 text-center cursor-pointer"
          onClick={() => {
            sendRequest("ignored", _id);
          }}
          disabled={isIgnoredDisabled}
        >
          <Icon
            icon="bitcoin-icons:cross-filled"
            width={20}
            className="text-rose-500 hover:text-rose-600"
          />
          Ignore
        </button>
        <button
          className="px-6 py-2.5 rounded-lg font-semibold bg-rose-500 hover:bg-rose-600 text-white
shadow-md shadow-rose-200
  transition-all duration-200 flex items-center gap-1 text-center cursor-pointer"
              disabled={isInterestedDisabled}
               onClick={() => {
                 sendRequest("interested", _id);
                 setIsInterestedDisabled(true);
              }}
        >
          <Icon
            icon="line-md:heart-filled"
            width={20}
            className="text-rose-200 hover:text-rose-300"
          />
          Interested
        </button>
      </div>
    </div>
  );
}

export default UserCard;
