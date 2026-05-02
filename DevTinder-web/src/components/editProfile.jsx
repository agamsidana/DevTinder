import { useDispatch, useSelector } from "react-redux";
import UserCard from "./userCard";
import { use, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { addUser } from "../utils/userSlice";
import Toast from "./toast";
import { Icon } from "@iconify/react";

function EditProfile() {
  const user = useSelector((state) => state.user);

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [about, setAbout] = useState(user.about);
  const [gender, setGender] = useState(user.gender);
  const [age, setAge] = useState(user.age);
  const [photo_url, setPhotoUrl] = useState(user.photo_url);
  const [isToastActive, setIsToastActive] = useState(false);
  const [isTipActive, setIsTipActive] = useState(true);

  const dispatch = useDispatch();

  async function handleEditProfile() {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          about,
          photo_url,
          gender,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res?.data?.data));
      setIsToastActive(true);

      setTimeout(() => {
        setIsToastActive(false);
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  }

  function handleTipVisiblity() {
    setIsTipActive(false);
  }

  function handleCancelBtn(){
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setAbout(user.about);
    setGender(user.gender);
    setAge(user.age);
    setPhotoUrl(user.photo_url);
  }

  return (
    <div className="flex flex-col items-center ">
      {isToastActive && <Toast title="Edit Successfull!" />}
      <div
        className={`flex justify-center gap-20 mt-${isToastActive && "20"} my-2`}
      >
        <div className="flex justify-center">
          <div className="card w-100 bg-base-100 card-md shadow-sm flex">
            <div
              className="card-body bg-black rounded-[10px] bg-slate-900/60 backdrop-blur-xl border border-slate-700 
rounded-2xl p-6 shadow-xl"
            >
              <div className="flex gap-3 items-center">
                <div className="h-9 w-9 bg-[#2A2745] rounded-full flex justify-center items-center">
                  <Icon
                    icon="iconamoon:profile-fill"
                    width={20}
                    className="text-purple-400"
                  />
                </div>
                <div>
                  <h2 className="card-title font-bold">Edit Profile</h2>
                  <p className="text-[11px]">
                    Update your details and how others see you
                  </p>
                </div>
              </div>

              <div className="flex items-end gap-2 w-full">
                <div className="h-8 w-9 bg-[#2A2745] rounded-[5px] flex justify-center items-center mb-1">
                  <Icon
                    icon="iconamoon:profile-fill"
                    width={18}
                    className="text-purple-400"
                  />
                </div>
                <fieldset className="fieldset w-full">
                  <legend className="fieldset-legend">First Name:</legend>
                  <input
                    type="email"
                    className="input input-sm   bg-slate-950 border border-slate-700 
  text-white placeholder-slate-400
  focus:outline-none focus:border-violet-500 
  focus:ring-2 focus:ring-violet-500/40 transition"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>
              </div>

              <div className="flex items-end gap-2 w-full">
                <div className="h-8 w-9 bg-[#2A2745] rounded-[5px] flex justify-center items-center mb-1">
                  <Icon
                    icon="iconamoon:profile-fill"
                    width={18}
                    className="text-purple-400"
                  />
                </div>
                <fieldset className="fieldset w-full">
                  <legend className="fieldset-legend">Last Name:</legend>
                  <input
                    type="text"
                    className="input input-sm  bg-slate-950 border border-slate-700 
  text-white placeholder-slate-400
  focus:outline-none focus:border-violet-500 
  focus:ring-2 focus:ring-violet-500/40 transition"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
              </div>

              <div className="flex items-end gap-2 w-full">
                <div className="h-8 w-9 bg-[#2A2745] rounded-[5px] flex justify-center items-center mb-1">
                  <Icon
                    icon="solar:link-bold"
                    width={18}
                    className="text-purple-400"
                  />
                </div>
                <fieldset className="fieldset w-full">
                  <legend className="fieldset-legend">PhotoUrl:</legend>
                  <input
                    type="text"
                    className="input input-sm  bg-slate-950 border border-slate-700 
  text-white placeholder-slate-400
  focus:outline-none focus:border-violet-500 
  focus:ring-2 focus:ring-violet-500/40 transition"
                    value={photo_url}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </fieldset>
              </div>

              <div className="flex items-end gap-2 w-full">
                <div className="h-8 w-9 bg-[#2A2745] rounded-[5px] flex justify-center items-center mb-1">
                  <Icon
                    icon="material-symbols-light:docs"
                    width={18}
                    className="text-purple-400"
                  />
                </div>
                <fieldset className="fieldset w-full">
                  <legend className="fieldset-legend">About:</legend>
                  <input
                    type="text"
                    className="input input-sm  bg-slate-950 border border-slate-700 
  text-white placeholder-slate-400
  focus:outline-none focus:border-violet-500 
  focus:ring-2 focus:ring-violet-500/40 transition"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </fieldset>
              </div>

              <div className="flex gap-3">
                <div className="flex items-end gap-2 w-full">
                  <div className="h-8 w-9 bg-[#2A2745] rounded-[5px] flex justify-center items-center mb-1">
                    <Icon
                      icon="uil:calender"
                      width={18}
                      className="text-purple-400"
                    />
                  </div>
                  <fieldset className="fieldset w-full">
                    <legend className="fieldset-legend">Age:</legend>
                    <input
                      type="number"
                      className="input input-sm  bg-slate-950 border border-slate-700 
  text-white placeholder-slate-400
  focus:outline-none focus:border-violet-500 
  focus:ring-2 focus:ring-violet-500/40 transition"
                      placeholder="enter your age"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </fieldset>
                </div>

                <div className="flex items-end gap-2 w-full">
                  <div className="h-8 w-9 bg-[#2A2745]rounded-[5px] flex justify-center items-center mb-1">
                    <Icon
                      icon="foundation:torsos-male-female"
                      width={18}
                      className="text-purple-400"
                    />
                  </div>
                  <fieldset className="fieldset w-full">
                    <legend className="fieldset-legend ">Gender:</legend>
                    <input
                      type="text"
                      className="input input-sm  bg-slate-950 border border-slate-700 
  text-white placeholder-slate-400
  focus:outline-none focus:border-violet-500 
  focus:ring-2 focus:ring-violet-500/40 transition"
                      placeholder="Select your Gender"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    />
                  </fieldset>
                </div>
              </div>

              <div className="justify-between card-actions">

                <button className="btn btn-sm btn-primary mt-1" onClick={handleCancelBtn}>Cancel</button>

                  <button
                  className="btn btn-sm btn-primary mt-1"
                  onClick={handleEditProfile}
                >
                  <Icon
                    icon="material-symbols:save"
                    width={18}
                    className="text-gray-700"
                  />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          className="w-90 bg-gradient-to-br from-[#1a1333] via-[#24154a] to-[#2d1b5a] border border-purple-500/20
shadow-[0_0_40px_rgba(168,85,247,0.15)] p-3 rounded-xl"
        >
          <div className="h-1/2 flex flex-col gap-3">
            <div className="flex gap-2 items-center">
              <Icon icon="iconoir:eye" width={18} className="text-purple-400" />
              <p className="text-[12px]">Profile Preview</p>
            </div>

            <div className="flex justify-center">
              <img
                src={!photo_url ? 'https://www.gravatar.com/avatar/?d=mp&s=200':photo_url}
                className="rounded-full object-cover ring-purple-600 shadow-[0_0_20px_rgba(124,58,237,0.5)] h-36 w-36"
                alt="avatar"
              />
            </div>

            <div className="flex justify-center">
              <div className="text-center">
                <p className="text-[14px]">{`${firstName} ${lastName}`}</p>
                <p className="text-[13px]">{user.emailId}</p>
              </div>
            </div>
          </div>
          <div className="h-1/2 flex flex-col gap-3">
            <div
              className="flex items-center bg-[#2a1e4d]/60
border border-purple-400/10 gap-2 p-3"
            >
              <div className="h-8 w-9 bg-[#2A2745] rounded-[5px] flex justify-center items-center mb-1">
                <Icon
                  icon="material-symbols-light:docs"
                  width={20}
                  className="text-purple-400"
                />
              </div>
              <div>
                <p className="text-[14px] text-purple-400">About</p>
                <p className="text-[12px] text-purple-100">
                  {!about ? "not specified" : about}
                </p>
              </div>
            </div>

            <div
              className=" bg-[#2a1e4d]/60
border border-purple-400/10 p-3 "
            >
              <div className="flex">
                <div className="w-1/2 flex items-center gap-2">
                  <div className="h-8 w-9 bg-[#2A2745] rounded-[5px] flex justify-center items-center mb-1">
                    <Icon
                      icon="uil:calender"
                      width={18}
                      className="text-purple-400"
                    />
                  </div>
                  <div>
                    <p className="text-[14px] text-purple-400">Age</p>
                    <p className="text-[12px] text-purple-100">
                      {!age ? "not specified" : age}
                    </p>
                  </div>
                </div>

                <div className="w-1/2 flex items-center gap-2">
                  <div className="h-8 w-9 bg-[#2A2745] rounded-[5px] flex justify-center items-center mb-1">
                    <Icon
                      icon="foundation:torsos-male-female"
                      width={18}
                      className="text-purple-400"
                    />
                  </div>

                  <div>
                    <p className="text-[14px] text-purple-400">Gender</p>
                    <p className="text-[12px] text-purple-100">
                      {!gender ? "not specified" : gender}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isTipActive && (
        <div className="bg-black rounded-[10px] bg-slate-900/60 backdrop-blur-xl border border-slate-700  shadow-xl w-215 mb-3 mt-1">
          <div className="flex justify-between p-4">
            <div className="flex items-center gap-2">
              <div>
                {" "}
                <Icon icon="icons8:idea" width={25}></Icon>
              </div>
              <div>
                <p className="text-purple-800 font-bold">Tip</p>
                <p>
                  A complete profile help others know you better.Add a photo and
                  write something about yourself!
                </p>
              </div>
            </div>
            <div>
              <Icon
                icon="charm:cross"
                className="cursor-pointer"
                onClick={handleTipVisiblity}
              ></Icon>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditProfile;
