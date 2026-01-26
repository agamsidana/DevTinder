import { useState } from "react";
import axios from "axios";
import {useDispatch} from 'react-redux'
import { addUser } from "../utils/userSlice";
import {useNavigate} from 'react-router-dom'
import { BASE_URL } from "../utils/constant";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  return (
    <div className="flex justify-center mt-7">
      <div className="card w-80 bg-base-100 card-md shadow-sm flex">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>

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
            <button className="btn btn-primary" onClick={handleClickLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
