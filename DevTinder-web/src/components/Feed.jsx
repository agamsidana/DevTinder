import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";
import { addFeed } from "../utils/feedSlice";
import { useEffect, useState } from "react";
import UserCard from "./userCard";
import { AnimatePresence, motion } from "motion/react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

function Feed() {

  const [isInterestedDisabled,setIsInterestedDisabled]=useState(false);
  const [isIgnoredDisabled,SetIsIgnoredDisabled]=useState(false);

  const dispatch = useDispatch();
  const { feed } = useSelector((state) => state);
  const exitCardAnimation = useRef(null);

  const getFeed = async () => {
    if (feed.length) return;
    const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
    dispatch(addFeed(res?.data?.data));
  };

  useEffect(() => {
    if (!feed.length) getFeed();
  }, [feed]);

  function handleUserCardExit(type) {
    exitCardAnimation.current = type;
  }

  return (
    <div className="flex justify-center items-center bg-[#FFF1F2] min-h-[79vh]">
      {feed.length > 0 ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={feed[0]._id}
            custom={exitCardAnimation}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={(direction) => ({
              opacity: 0,
              x: direction.current === "interested" ? 300 : -300,
              rotate: direction.current === "interested" ? 15 : -15,
              scale: 0.8,
            })}
            transition={{ duration: 0.45 }}
          >
            <UserCard
              user={feed[0]}
              isButtons={true}
              handleUserCardExit={handleUserCardExit}
              isInterestedDisabled={isInterestedDisabled}
              isIgnoredDisabled={isIgnoredDisabled}
              setIsInterestedDisabled={setIsInterestedDisabled}
              SetIsIgnoredDisabled={SetIsIgnoredDisabled}
            />
          </motion.div>
        </AnimatePresence>
      ) : (
        <div className="flex flex-col gap-1.5 justify-center h-full items-center">
          <h1 className="text-4xl font-bold text-slate-900">You're all caught up!</h1>
          <p className="text-[14px] text-slate-700">
            No more developers profile to show. 
          </p>
          <p className="text-[14px] text-slate-700">Check back later for new connections.</p>
          <Link to="/feed" className="btn bg-rose-500 hover:bg-rose-600" onClick={()=>{
            window.location.reload()
          }}>
            <Icon icon="material-symbols-light:refresh-rounded" width={24} className="text-white" />
            Refresh
          </Link>
        </div>
      )}
    </div>
  );
}

export default Feed;
