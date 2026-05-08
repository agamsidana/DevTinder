import { useDispatch, useSelector } from "react-redux";
import UserCard from "./userCard";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { addUser } from "../utils/userSlice";
import Toast from "./toast";
import { Icon } from "@iconify/react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UpdateProfileSchema } from "../schema/validators";
import RHFTextField from "../hook/rhf-textField";
import RHFTextArea from "../hook/rhf-textArea";

function EditProfile() {
  const user = useSelector((state) => state.user);

  const [isToastActive, setIsToastActive] = useState(false);
  const [isTipActive, setIsTipActive] = useState(true);

  const methods = useForm({
    resolver: yupResolver(UpdateProfileSchema),
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      about: user?.about,
      age: user?.age,
      gender: user.gender,
      photo_url: user?.photo_url,
    },
  });
  const {
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = methods;

  const firstName = watch("firstName");
  const lastName = watch("lastName");
  const about = watch("about");
  const gender = watch("gender");
  const age = watch("age");
  const photo_url = watch("photo_url");

  const dispatch = useDispatch();

  async function handleEditProfile(data) {
    const { firstName, lastName, age, about, photo_url, gender } = data;

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

  const onSubmit = (data) => {
    handleEditProfile(data);
  };

  const handleFormErrors = (message) => {
    return <span className="text-rose-500">{message}</span>;
  };

  function handleTipVisiblity() {
    setIsTipActive(false);
  }

  function handleCancelBtn() {
    reset();
  }

  return (
    <div className="flex flex-col items-center ">
      {isToastActive && <Toast title="Edit Successfull!" />}
      <div
        className={`flex justify-center gap-20 mt-${isToastActive && "20"} my-2`}
      >
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
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

                  <div className={`flex ${errors.firstName ? 'items-center' : 'items-end'} gap-2 w-full`}>
                    <div className="h-8 w-9 bg-[#2A2745] rounded-[5px] flex justify-center items-center mb-1">
                      <Icon
                        icon="iconamoon:profile-fill"
                        width={18}
                        className="text-purple-400"
                      />
                    </div>
                    <fieldset className="fieldset w-full">
                      <legend className="fieldset-legend">First Name:</legend>
                      <RHFTextField name="firstName" />
                      {errors?.firstName && handleFormErrors(errors.firstName.message)}
                    </fieldset>
                  </div>

                  <div className={`flex ${errors.lastName ? 'items-center' : 'items-end'} gap-2 w-full`}>
                    <div className="h-8 w-9 bg-[#2A2745] rounded-[5px] flex justify-center items-center mb-1">
                      <Icon
                        icon="iconamoon:profile-fill"
                        width={18}
                        className="text-purple-400"
                      />
                    </div>
                    <fieldset className="fieldset w-full">
                      <legend className="fieldset-legend">Last Name:</legend>
                      <RHFTextField name="lastName" />
                      {errors?.lastName && handleFormErrors(errors.lastName.message)}
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
                      <RHFTextField name="photo_url" />
                    </fieldset>
                  </div>

                  <div className={`flex ${errors.about ? 'items-center' : 'items-end'} gap-2 w-full`}>
                    <div className="h-8 w-9 bg-[#2A2745] rounded-[5px] flex justify-center items-center mb-1">
                      <Icon
                        icon="material-symbols-light:docs"
                        width={18}
                        className="text-purple-400"
                      />
                    </div>
                    <fieldset className="fieldset w-full">
                      <legend className="fieldset-legend">About:</legend>
                      <RHFTextArea name="about"></RHFTextArea>
                       {errors?.about && handleFormErrors(errors.about.message)}
                    </fieldset>
                  </div>


                    <div className={`flex ${errors.age ? 'items-center' :'items-end'} gap-2 w-full`}>
                      <div className="h-8 w-9 bg-[#2A2745] rounded-[5px] flex justify-center items-center mb-1">
                        <Icon
                          icon="uil:calender"
                          width={18}
                          className="text-purple-400"
                        />
                      </div>
                      <fieldset className="fieldset w-full">
                        <legend className="fieldset-legend">Age:</legend>
                        <RHFTextField name="age" type="number" />
                        {errors?.age && handleFormErrors(errors.age.message)}
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
                        <RHFTextField name="gender" />
                      </fieldset>
                    </div>

                  <div className="justify-between card-actions">
                    <button
                      className="btn btn-sm btn-primary mt-1"
                      onClick={handleCancelBtn}
                      type="button"
                    >
                      Cancel
                    </button>

                    <button
                      className="btn btn-sm btn-primary mt-1"
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
          </form>
        </FormProvider>

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
                src={photo_url}
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
                <p className="text-[12px] text-purple-100 break-all">
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
