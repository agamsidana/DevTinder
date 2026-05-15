import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { Icon } from "@iconify/react";
import RHFTextField from "../Hook/rhf-textField";
import { genderOptions } from "../utils/genderOptions";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignUpSchema } from "../schema/validators";
import RHFTextArea from "../Hook/rhf-textArea";

function Signup() {
  const navigate = useNavigate();
  const [selectedGender, setSelectedGender] = useState(null);
  const [genderError, setGenderError] = useState(false);

  const methods = useForm({
    resolver: yupResolver(SignUpSchema),
  });
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  async function handleSignUp(data) {
    const { firstName, lastName, email, password, age,about} = data;

    try {
      await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId: email,
          password,
          age,
          gender:selectedGender,
          about
        },
        { withCredentials: true },
      );
      navigate("/login");
    } catch (err) {
      console.log(err.response.data);
    }
  }

  const handleFormErrors = (message) => {
    return <span className="text-rose-500">{message}</span>;
  };

  const handleSelectedGender = (gender) => {
    setSelectedGender(gender);
  };

  const onSubmit = (data) => {
    if (!selectedGender) setGenderError(true);
    if(selectedGender) handleSignUp(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-center items-center bg-[#FFF1F2] py-4">
          <div
            className={`w-110 rounded-2xl
  bg-white
  border border-pink-100 shadow-lg rounded-2xl h-auto`}
          >
            <div className="card-body">
              <h2 className="text-2xl font-semibold text-center text-slate-900 mb-2 text-center">
                SignUp
              </h2>

              <div className="flex gap-4">
                <fieldset className="fieldset">
                  <legend className="text-slate-700">First Name</legend>
                  <div className="flex px-3 py-2 border items-center gap-2">
                    <Icon
                      icon="iconamoon:profile-fill"
                      width={20}
                      className="text-rose-500"
                    />
                    <RHFTextField
                      name="firstName"
                      placeholder="First Name"
                      style="outline-none rounded-md w-full bg-white border text-slate-700
placeholder:text-slate-400 border-none"
                    />
                  </div>
                  {errors?.firstName &&
                    handleFormErrors(errors?.firstName?.message)}
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="text-slate-700">Last Name</legend>
                  <div className="flex px-3 py-2 border items-center gap-2">
                    <Icon
                      icon="iconamoon:profile-fill"
                      width={20}
                      className="text-rose-500"
                    />
                    <RHFTextField
                      name="lastName"
                      placeholder="Last Name"
                      style="outline-none rounded-md w-full bg-white border text-slate-700
placeholder:text-slate-400 border-none"
                    />
                  </div>
                  {errors?.lastName &&
                    handleFormErrors(errors?.lastName?.message)}
                </fieldset>
              </div>

              <div className="flex gap-4">
                <fieldset className="fieldset">
                  <legend className="text-slate-700">Email Address</legend>
                  <div className="flex px-3 py-2 border items-center gap-2">
                    <Icon icon="mdi:email" width={20} className="text-rose-500" />
                    <RHFTextField
                      name="email"
                      placeholder="Email"
                      style="outline-none rounded-md w-full bg-white border text-slate-700
placeholder:text-slate-400 border-none"
                      type="email"
                    />
                  </div>
                  {errors?.email && handleFormErrors(errors?.email?.message)}
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="text-slate-700">Password</legend>
                  <div className="flex px-3 py-2 border items-center gap-2 width-full">
                    <Icon icon="mdi:lock" width={20} className="text-rose-500" />
                    <RHFTextField
                      name="password"
                      placeholder="Password"
                      style="outline-none rounded-md w-full bg-white border text-slate-700
placeholder:text-slate-400 border-none"
                      type="password"
                    />
                  </div>
                  {errors?.password &&
                    handleFormErrors(errors?.password?.message)}
                </fieldset>
              </div>

              <div className="gap-2">
                <legend className="text-slate-700">Gender</legend>
                <div className="flex justify-between">
                  {genderOptions.map((gender, idx) => {
                    const isActive = gender.value === selectedGender;
                    return (
                      <button
                        className={`btn px-6 text-slate-900 border-black ${isActive ? "bg-rose-500" : "bg-white/10"} hover:bg-black/10`}
                        type="button"
                        key={idx}
                        onClick={() => {
                          handleSelectedGender(gender.value);

                        }}
                      >
                        <Icon
                          icon={gender.icon}
                          width={20}
                          className=""
                        />
                        {gender.label}
                      </button>
                    );
                  })}
                </div>
                {genderError && (
                  <span className="text-red-500">Gender is required</span>
                )}
              </div>

              <div className="flex gap-4">
                <fieldset className="fieldset">
                  <legend className="text-slate-700">Age</legend>
                  <div className="flex px-3 py-2 border items-center gap-2 width-full">
                    <Icon icon="mdi:lock" width={20} className="text-rose-500" />
                    <RHFTextField
                      name="age"
                      placeholder="Select your age"
                      style="outline-none rounded-md w-full bg-white border text-slate-700
placeholder:text-slate-400 border-none"
                      type="number"
                    />
                  </div>
                  {errors?.age && handleFormErrors(errors?.age?.message)}
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="text-slate-700">Location</legend>
                  <div className="flex px-3 py-2 border items-center gap-2 width-full">
                    <Icon
                      icon="mdi:location"
                      width={20}
                      className="text-rose-500"
                    />
                    <RHFTextField
                      name="location"
                      placeholder="Select your location"
                      style="outline-none rounded-md w-full bg-white border text-slate-700
placeholder:text-slate-400 border-none"
                    />
                  </div>
                </fieldset>
              </div>

              <div>
                <fieldset className="fieldset">
                  <legend className="text-slate-700">Your Skills</legend>
                  <div className="flex px-3 py-2 border items-center gap-2 width-full">
                    <Icon
                      icon="mdi:location"
                      width={20}
                      className="text-rose-500"
                    />
                    <RHFTextField
                      name="skills"
                      placeholder="Select your location"
                      style="outline-none rounded-md w-full bg-white border text-slate-700
placeholder:text-slate-400 border-none"
                    />
                  </div>
                  {errors?.skills && handleFormErrors(errors?.skills?.message)}
                </fieldset>
              </div>

              <div>
                <fieldset className="fieldset">
                  <legend className="text-slate-700">About You</legend>
                  <div className="flex px-3 py-2 border  gap-2 width-full">
                    <Icon icon="mdi:pencil" width={20} className="text-rose-500" />
                    <RHFTextArea
                      name="about"
                      placeholder="Tell us about yourself..."
                      style="outline-none rounded-md w-full bg-white border text-slate-700
placeholder:text-slate-400 border-none"
                    />
                  </div>
                  {errors?.about && handleFormErrors(errors?.about?.message)}
                </fieldset>
              </div>

              <div className="justify-center card-actions">
                <button className="btn mt-1 rounded-lg font-semibold text-white  bg-rose-500 hover:bg-rose-600 transition duration-300 shadow-lg shadow-pink-500/40">
                  SignUp
                </button>
              </div>
              <div className="text-center">
                <p className="inline-block text-sm text-textSecondary mt-1 text-slate-600">
                  Existing User?
                </p>
                <p
                  className="inline-block text-rose-500 hover:text-rose-600 cursor-pointer"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Login User
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}

export default Signup;
