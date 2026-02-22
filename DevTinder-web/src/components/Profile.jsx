import { useSelector } from "react-redux";
import EditProfile from "./editProfile";

function Profile(){
    const user=useSelector(state=>state.user);
    return(
        <div>
            {user && <EditProfile/>}
        </div>
    )
}

export default Profile;