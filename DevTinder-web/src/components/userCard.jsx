import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import {removeFeedById} from '../utils/feedSlice'

function UserCard({user}){
    const {_id,firstName,lastName,photo_url,age,gender,about}=user;
    const dispath=useDispatch()


    const sendRequest=async (status,id)=>{
      const res=await axios.post(`${BASE_URL}/request/send/${status}/${id}`,{},{withCredentials:true});
      dispath(removeFeedById(id));
    }


    return(
    <div className="card bg-base-300 w-96 shadow-sm">
  <figure>
    <img
      src={photo_url}
      alt="photo"
      className="h-70" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName + " " + lastName}</h2>
    {about && <p>{about}</p>}
    {age && gender && <p>{age + "," +gender}</p>}
    <div className="card-actions justify-center">
        <button className="btn btn-primary" onClick={()=>{sendRequest('ignored',_id)}}>ignored</button>
      <button className="btn btn-secondary" onClick={()=>{sendRequest('interested',_id)}}>intrested</button>
    </div>
  </div>
</div>
    )

}

export default UserCard;