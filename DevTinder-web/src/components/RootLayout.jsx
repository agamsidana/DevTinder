import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { Navbar } from "./Navbar";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { isPremium } from "../utils/verify-paymentSlice";

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

    const verifyPayment=async()=>{
        try{
            const res=await axios.get(BASE_URL+'/payment-verify',{withCredentials:true});
            dispatch(isPremium(res.data));

        }
        catch(err){
            console.log(err)
        }
    }

   useEffect(()=>{
    fetchUser();
    verifyPayment();
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