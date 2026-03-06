import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./userCard";

function Feed(){
    const dispatch=useDispatch();
    const {feed}=useSelector((state)=>state);
    const getFeed=async ()=>{
        if(feed.length) return;
        const res=await axios.get(BASE_URL+"/feed",{withCredentials:true});
        dispatch(addFeed(res?.data?.data));
    }

    useEffect(()=>{
        getFeed();
    },[]);

    return(
      <div className="my-6 flex justify-center">
        {feed.length>0 && <UserCard user={feed[0]} isButtons={true}/>}
      </div>
    )
}

export default Feed;