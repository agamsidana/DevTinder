import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./userCard";
import { AnimatePresence, motion } from "motion/react";
import { useRef } from "react";

function Feed() {
  const dispatch = useDispatch();
  const { feed } = useSelector((state) => state);
  const exitCardAnimation = useRef(null);

  const getFeed = async () => {
    if (feed.length) return;
    const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
    dispatch(addFeed(res?.data?.data));
  };

  useEffect(() => {
    getFeed();
  }, []);

  function handleUserCardExit(type) {
    exitCardAnimation.current = type;
  }

  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-[#1E1B4B] via-[#6D28D9] to-[#EC4899] min-h-[79vh]">
      <AnimatePresence mode="wait">
        {feed.length > 0 && (
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
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Feed;
