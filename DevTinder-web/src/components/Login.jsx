import { useState } from "react";
import axios from "axios";
import {useDispatch} from 'react-redux'
import { addUser } from "../utils/userSlice";
import {Link, useNavigate} from 'react-router-dom'
import { BASE_URL } from "../utils/constant";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLogin,setIsLogin]=useState(false);
  const dispatch=useDispatch();
  const navigate=useNavigate();

  async function handleClickLogin() {
    try {
      const res = await axios.post(BASE_URL+"/login", {
        emailId:email,
        password,
      },{withCredentials:true});
      dispatch(addUser(res.data.user));
       navigate('/feed')
    } catch (err) {
      console.log(err.response.data);
    }
  }

  async function handleClickSignUp(){
    try {
      await axios.post(BASE_URL+"/signup", {
        firstName,
        lastName,
        emailId:email,
        password,
      },{withCredentials:true});
      setIsLogin((prev)=>!prev)
    } catch (err) {
      console.log(err.response.data);
    }

  }

  return (
    <div className="flex justify-center mt-7">
      <div className="card w-80 bg-base-100 card-md shadow-sm flex">
        <div className="card-body">
          <h2 className="card-title justify-center">{isLogin?"Login":"SignUp"}</h2>

         {!isLogin && <div>

            
          <fieldset className="fieldset">
            <legend className="fieldset-legend">First Name:</legend>
            <input
              type="text"
              className="input"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </fieldset>

          
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Last Name:</legend>
            <input
              type="text"
              className="input"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </fieldset>


          </div>}

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email ID:</legend>
            <input
              type="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password:</legend>
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>

          <div className="justify-center card-actions">
            <button className="btn btn-primary" onClick={isLogin?handleClickLogin:handleClickSignUp}>
              {isLogin?"Login":"SignUp"}
            </button>
          </div>
          <div className="text-center">
            <p className="inline-block">{isLogin?"New User?":"Existing User?"}</p>
            <p className="inline-block text-blue-900 cursor-pointer" onClick={()=>setIsLogin((prev)=>!prev)}>{isLogin?"Sign Up here":"Login User"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
