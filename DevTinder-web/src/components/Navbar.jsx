import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";
import { removeUser } from "../utils/userSlice";

export function Navbar() {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispath = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispath(removeUser());
      navigate("/login");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div
      className="navbar bg-white border-b border-pink-100 shadow-sm sticky top-0 z-1"
    >
      <div className="flex-1 items-center">
        <a href="/feed" className="text-slate-900 btn btn-ghost">
        <div className="flex text-xl"> 
            <span className="text-slate-900">Dev</span>
            <span className="text-rose-500">Tinder</span>
        </div>
        </a>
     
      </div>
      {user && (
        <div className="flex gap-1 items-center text-slate-700">
          <p>Welcome,{user.firstName}</p>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar mx-2"
            >
              <div className="w-10 rounded-full">
                <img alt="user photo" src={user.photo_url} />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-white  rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li className="hover:bg-gray-200">
                <Link to="/profile" className="justify-between">
                  Profile
                </Link>
              </li>
              <li className="hover:bg-gray-200">
                <Link to="/connections">Connections</Link>
              </li>

              <li className="hover:bg-gray-200">
                <Link to="/requests">Requests</Link>
              </li>

              <li className="hover:bg-gray-200">
                <Link to="/premium">Premium</Link>
              </li>

              <li className="hover:bg-gray-200">
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
