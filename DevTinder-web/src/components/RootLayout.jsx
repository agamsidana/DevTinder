import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { Navbar } from "./Navbar";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

function RootLayot(){
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const fetchUser=async()=>{
        try{
            const res=await axios.get(BASE_URL+'/profile/view',{withCredentials:true});
            dispatch(addUser(res.data));
        }
        catch(err){
            if(err.status===401)  navigate('/login');
            console.log(err);
        }
    }

   useEffect(()=>{
    fetchUser();
   },[])

    return(
        <>
        <Navbar/>
        <Outlet/>
        <Footer/>
        </>
    )
}

export default RootLayot;