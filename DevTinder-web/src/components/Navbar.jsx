import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constant';
import { removeUser } from '../utils/userSlice';

export function Navbar(){
  const user=useSelector((store)=>store.user);
  const navigate=useNavigate();
  const dispath=useDispatch();

  const handleLogout=async()=>{
    try{
    await axios.post(BASE_URL+'/logout',{},{withCredentials:true});
    dispath(removeUser());
    navigate('/login')
    }
    catch(err){
      console.log(err.message);
    }
  }

    return(
    <div className="navbar bg-base-q00 shadow-sm">
  <div className="flex-1">
    <Link to='/' className="btn btn-ghost text-xl">DevTinder</Link>
  </div>
  {user && <div className="flex gap-1 items-center">
    <p>Welcome,{user.firstName}</p>
     <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar mx-2">
        <div className="w-10 rounded-full">
          <img
            alt="user photo"
            src={user.photo_url} />
        </div>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile" className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><a>Settings</a></li>
        <li><a onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>
  </div>}
</div>
)
}
