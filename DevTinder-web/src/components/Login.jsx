import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";
import { Icon } from "@iconify/react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleClickLogin() {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId: email,
          password,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res.data.user));
      navigate("/feed");
    } catch (err) {
      console.log(err.response.data);
    }
  }

  async function handleClickSignUp() {
    try {
      await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId: email,
          password,
        },
        { withCredentials: true },
      );
      setIsLogin((prev) => !prev);
    } catch (err) {
      console.log(err.response.data);
    }
  }

  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 h-[90vh]">
      <div className={`w-80 rounded-2xl
  bg-[#6623a1]
  border border-white/10
   h-70 h-fit`}>
        <div className="card-body h-fit">
          <h2 className="text-2xl font-semibold text-center text-white mb-2 justify-center">
            {isLogin ? "Login" : "SignUp"}
          </h2>

          {!isLogin && (
            <>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name:</legend>
                <div className="flex px-3 py-2 border items-center gap-2">
                  <Icon
                    icon="iconamoon:profile-fill"
                    width={20}
                    className="text-white"
                  />
                  <input
                    type="text"
                    placeholder="First Name"
                    className="outline-none text-white rounded-md w-full"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name:</legend>
                <div className="flex px-3 py-2 border items-center gap-2">
                  <Icon
                    icon="iconamoon:profile-fill"
                    width={20}
                    className="text-white"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="outline-none text-white rounded-md w-full"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </fieldset>
            </>
          )}

          <fieldset className="fieldset">
            <legend className="fieldset-legend">
              Email ID:
            </legend>
            <div className="flex px-3 py-2 border items-center gap-2">
              <Icon icon="mdi:email" width={20} className="text-white" />
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="outline-none text-white rounded-md w-full"
              />
            </div>
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password:</legend>
            <div className="flex px-3 py-2 border items-center gap-2 width-full">
              <Icon icon="mdi:lock" width={20} className="text-white" />
              <input
                type="password"
                placeholder="Password"
                className="outline-none text-white rounded-md w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </fieldset>

          <div className="justify-center card-actions">
            <button
              className="btn mt-1 rounded-lg font-semibold text-white bg-pink-500 hover:bg-pink-600 transition duration-300 shadow-lg shadow-pink-500/40"
              onClick={isLogin ? handleClickLogin : handleClickSignUp}
            >
              {isLogin ? "Login" : "SignUp"}
            </button>
          </div>
          <div className="text-center">
            <p className="inline-block text-sm text-textSecondary mt-1">
              {isLogin ? "New User?" : "Existing User?"}
            </p>
            <p
              className="inline-block text-pink-500 cursor-pointer"
              onClick={() => setIsLogin((prev) => !prev)}
            >
              {isLogin ? "Sign Up here" : "Login User"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
