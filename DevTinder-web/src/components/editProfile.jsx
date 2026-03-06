import { useDispatch, useSelector } from "react-redux";
import UserCard from "./userCard";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { addUser } from "../utils/userSlice";
import Toast from "./toast";

function EditProfile(){
    const user=useSelector(state=>state.user);

    const [firstName,setFirstName]=useState(user.firstName);
    const [lastName,setLastName]=useState(user.lastName);
    const [about,setAbout]=useState(user.about);
    const [gender,setGender]=useState(user.gender);
    const [age,setAge]=useState(user.age);
    const [photo_url,setPhotoUrl]=useState(user.photo_url);
    const [isToastActive,setIsToastActive]=useState(false);

    const dispatch=useDispatch();

   async function handleEditProfile(){
        try{
            const res=await axios.patch(BASE_URL+'/profile/edit',{
                firstName,
                lastName,
                age,
                about,
                photo_url,
                gender
            },{withCredentials:true});
            dispatch(addUser(res?.data?.data));
            setIsToastActive(true);

            setTimeout(()=>{
              setIsToastActive(false);
            },2000)
        }
        catch(err){
            console.log(err);
        }
    }


    return(
   <> 
    {isToastActive && <Toast title="Edit Successfull!"/>}
    <div className={`flex justify-center gap-20 mt-${isToastActive ? '20':'14'}`}>   
    <div className="flex justify-center">
      <div className="card w-80 bg-base-100 card-md shadow-sm flex">
        <div className="card-body">
          <h2 className="card-title justify-center">Edit Profile</h2>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">First Name:</legend>
            <input
              type="email"
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

          <fieldset className="fieldset">
            <legend className="fieldset-legend">PhotoUrl:</legend>
            <input
              type="text"
              className="input"
              value={photo_url}
              onChange={(e) => setPhotoUrl(e.target.value)}
            />
          </fieldset>


            <fieldset className="fieldset">
            <legend className="fieldset-legend">About:</legend>
            <input
              type="text"
              className="input"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </fieldset>

            <fieldset className="fieldset">
            <legend className="fieldset-legend">Age:</legend>
            <input
              type="text"
              className="input"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </fieldset>

            <fieldset className="fieldset">
            <legend className="fieldset-legend">Gender:</legend>
            <input
              type="text"
              className="input"
              value={gender}
            onChange={(e) => setGender(e.target.value)}
            />
          </fieldset>

          <div className="justify-center card-actions">
            <button className="btn btn-primary" onClick={handleEditProfile}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
    <UserCard user={{firstName,lastName,gender,age,about,photo_url}} isButtons={false}/>
  </div> 
  </>  
    )
}

export default EditProfile;