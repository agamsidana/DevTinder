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
    <div className="flex flex-col items-center bg-[#FFF1F2]">
      {isToastActive && <Toast title="Edit Successfull!" />}
      <div
        className={`flex justify-center gap-20 mt-${isToastActive && "20"} my-2`}
      >
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-center ">
              <div className="card w-100  card-md shadow-sm flex">
                <div
                  className="card-body rounded-[10px] bg-white backdrop-blur-xl border border-slate-700 p-6 shadow-xl"
                >
                  <div className="flex gap-3 items-center">
                    <div className="h-9 w-9 bg-pink-50 rounded-full border border-pink-100 flex justify-center items-center">
                      <Icon
                        icon="iconamoon:profile-fill"
                        width={20}
                        className="text-rose-500"
                      />
                    </div>
                    <div>
                      <h2 className="card-title font-bold text-slate-900">Edit Profile</h2>
                      <p className="text-[11px] text-slate-700">
                        Update your details and how others see you
                      </p>
                    </div>
                  </div>

                  <div className={`flex ${errors.firstName ? 'items-center' : 'items-end'} gap-2 w-full`}>
                    <div className="h-8 w-9 bg-pink-50 rounded-[5px] flex border border-pink-100 justify-center items-center mb-1">
                      <Icon
                        icon="iconamoon:profile-fill"
                        width={18}
                        className="text-rose-500"
                      />
                    </div>
                    <fieldset className="fieldset w-full">
                      <legend className="fieldset-legend text-slate-700">First Name:</legend>
                      <RHFTextField name="firstName" style="bg-white input border border-pink-200 text-slate-700 focus:border-rose-400
focus:ring-4
focus:ring-rose-100"/>
                      {errors?.firstName && handleFormErrors(errors.firstName.message)}
                    </fieldset>
                  </div>

                  <div className={`flex ${errors.lastName ? 'items-center' : 'items-end'} gap-2 w-full`}>
                    <div className="h-8 w-9 bg-pink-50 rounded-[5px] flex border border-pink-100 justify-center items-center mb-1">
                      <Icon
                        icon="iconamoon:profile-fill"
                        width={18}
                        className="text-rose-500"
                      />
                    </div>
                    <fieldset className="fieldset w-full">
                      <legend className="fieldset-legend text-slate-700">Last Name:</legend>
                      <RHFTextField name="lastName" style="bg-white input border border-pink-200 text-slate-700 focus:border-rose-400
focus:ring-4
focus:ring-rose-100" />
                      {errors?.lastName && handleFormErrors(errors.lastName.message)}
                    </fieldset>
                  </div>

                  <div className="flex items-end gap-2 w-full">
                    <div className="h-8 w-9 bg-pink-50 rounded-[5px] flex border border-pink-100 justify-center items-center mb-1">
                      <Icon
                        icon="solar:link-bold"
                        width={18}
                        className="text-rose-500"
                      />
                    </div>
                    <fieldset className="fieldset w-full">
                      <legend className="fieldset-legend text-slate-700">PhotoUrl:</legend>
                      <RHFTextField name="photo_url" style="bg-white input border border-pink-200 text-slate-700 focus:border-rose-400
focus:ring-4
focus:ring-rose-100"/>
                    </fieldset>
                  </div>

                  <div className={`flex ${errors.about ? 'items-center' : 'items-end'} gap-2 w-full`}>
                    <div className="h-8 w-9 bg-pink-50 rounded-[5px] flex border border-pink-100 justify-center items-center mb-1">
                      <Icon
                        icon="material-symbols-light:docs"
                        width={18}
                        className="text-rose-500"
                      />
                    </div>
                    <fieldset className="fieldset w-full">
                      <legend className="fieldset-legend text-slate-700">About:</legend>
                      <RHFTextArea name="about" style="bg-white input border border-pink-200 text-slate-700 focus:border-rose-400
focus:ring-4
focus:ring-rose-100"></RHFTextArea>
                       {errors?.about && handleFormErrors(errors.about.message)}
                    </fieldset>
                  </div>


                    <div className={`flex ${errors.age ? 'items-center' :'items-end'} gap-2 w-full`}>
                      <div className="h-8 w-9 bg-pink-50 rounded-[5px] flex border border-pink-100 justify-center items-center mb-1">
                        <Icon
                          icon="uil:calender"
                          width={18}
                          className="text-rose-500"
                        />
                      </div>
                      <fieldset className="fieldset w-full">
                        <legend className="fieldset-legend text-slate-700">Age:</legend>
                        <RHFTextField name="age" type="number" style="bg-white input border border-pink-200 text-slate-700 focus:border-rose-400
focus:ring-4
focus:ring-rose-100"/>
                        {errors?.age && handleFormErrors(errors.age.message)}
                      </fieldset>
                    </div>

                    <div className="flex items-end gap-2 w-full">
                      <div className="h-8 w-9 bg-pink-50 border border-pink-100 rounded-[5px] flex justify-center items-center mb-1">
                        <Icon
                          icon="foundation:torsos-male-female"
                          width={18}
                          className="text-rose-500"
                        />
                      </div>
                      <fieldset className="fieldset w-full">
                        <legend className="fieldset-legend text-slate-700">Gender:</legend>
                        <RHFTextField name="gender" style="bg-white input border border-pink-200 text-slate-700 focus:border-rose-400
focus:ring-4
focus:ring-rose-100" />
                      </fieldset>
                    </div>

                  <div className="justify-between card-actions">
                    <button
                      className="btn btn-sm bg-white border border-pink-200 text-rose-500 hover:bg-rose-50 mt-1 transition-all duration-200"
                      onClick={handleCancelBtn}
                      type="button"
                    >
                      Cancel
                    </button>

                    <button
                      className="btn btn-sm bg-rose-500 hover:bg-rose-600 text-white shadow-md shadow-rose-200 mt-1 transition-all duration-200"
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
          className="w-90 bg-white border border-slate-700 p-3 rounded-xl"
        >
          <div className="h-1/2 flex flex-col gap-3">
            <div className="flex gap-2 items-center">
              <Icon icon="iconoir:eye" width={18} className="text-rose-500" />
              <p className="text-[12px] text-slate-900">Profile Preview</p>
            </div>

            <div className="flex justify-center">
              <img
                src={photo_url}
                className="rounded-full object-cover ring-rose-600 border-4 border-slate-600 h-36 w-36"
                alt="avatar"
              />
            </div>

            <div className="flex justify-center">
              <div className="text-center">
                <p className="text-[14px] text-slate-900 font-medium">{`${firstName} ${lastName}`}</p>
                <p className="text-[13px] text-slate-500">{user.emailId}</p>
              </div>
            </div>
          </div>
          <div className="h-1/2 flex flex-col gap-3">
            <div
              className="flex items-center bg-pink-50 border border-pink-100 gap-2 p-3"
            >
              <div className="h-8 w-9 rounded-[5px] bg-pink-50 border border-pink-100 flex justify-center items-center mb-1">
                <Icon
                  icon="material-symbols-light:docs"
                  width={20}
                  className="text-rose-500"
                />
              </div>
              <div>
                <p className="text-[14px] text-rose-500">About</p>
                <p className="text-[12px] text-slate-600 break-all">
                  {!about ? "not specified" : about}
                </p>
              </div>
            </div>

            <div
              className=" bg-pink-50 border border-pink-100 p-3 "
            >
              <div className="flex">
                <div className="w-1/2 flex items-center gap-2">
                  <div className="h-8 w-9 bg-pink-50 border border-pink-100 rounded-[5px] flex justify-center items-center mb-1">
                    <Icon
                      icon="uil:calender"
                      width={18}
                      className="text-rose-500"
                    />
                  </div>
                  <div>
                    <p className="text-[14px] text-rose-500">Age</p>
                    <p className="text-[12px] text-slate-600">
                      {!age ? "not specified" : age}
                    </p>
                  </div>
                </div>

                <div className="w-1/2 flex items-center gap-2">
                  <div className="h-8 w-9 bg-pink-50 border border-pink-100 rounded-[5px] flex justify-center items-center mb-1">
                    <Icon
                      icon="foundation:torsos-male-female"
                      width={18}
                      className="text-rose-500"
                    />
                  </div>

                  <div>
                    <p className="text-[14px] text-rose-500">Gender</p>
                    <p className="text-[12px] text-slate-600">
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
        <div className= "bg-pink-50 border border-pink-200 rounded-[10px] backdrop-blur-xl  shadow-xl w-215 mb-3 mt-1">
          <div className="flex justify-between p-4">
            <div className="flex items-center gap-2">
              <div>
                {" "}
                <Icon icon="icons8:idea" width={25} className="text-rose-500"></Icon>
              </div>
              <div>
                <p className="text-rose-500 font-bold">Tip</p>
                <p className="text-slate-600">
                  A complete profile help others know you better.Add a photo and
                  write something about yourself!
                </p>
              </div>
            </div>
            <div>
              <Icon
                icon="charm:cross"
                className="cursor-pointer text-rose-400"
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
