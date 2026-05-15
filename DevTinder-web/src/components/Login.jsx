import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";
import { Icon } from "@iconify/react";
import RHFTextField from "../hook/rhf-textField";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from "../schema/validators";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
  });
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  async function handleClickLogin(data) {
    const { email, password } = data;
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

  const handleFormErrors = (message) => {
    return <span className="text-rose-500">{message}</span>;
  };

  const onSubmit = (data) => {
    console.log(data);
    handleClickLogin(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-center items-center bg-[#FFF1F2] h-[90vh]">
          <div
            className={`w-80 bg-white border border-pink-100 rounded-2xl shadow-lg
   h-fit`}
          >
            <div className="card-body h-fit">
              <h2 className="text-2xl font-semibold text-center text-slate-900 mb-2 justify-center">
                Login
              </h2>

              <fieldset className="fieldset">
                <legend className="fieldset-legend text-slate-700">Email ID:</legend>
                <div className="flex px-3 py-2 border items-center gap-2">
                  <Icon icon="mdi:email" width={20} className="text-rose-500" />
                  <RHFTextField
                    name="email"
                    placeholder="enter your email address"
                    style="outline-none rounded-md w-full bg-white border text-slate-700
placeholder:text-slate-400 border-none"
                  />
                </div>
                {errors?.email && handleFormErrors(errors.email.message)}
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend text-slate-700">Password:</legend>
                <div className="flex px-3 py-2 border items-center gap-2 width-full">
                  <Icon icon="mdi:lock" width={20} className="text-rose-500" />
                  <RHFTextField
                    name="password"
                    placeholder="enter your password"
                    style="outline-none rounded-md w-full bg-white border text-slate-700
placeholder:text-slate-400 border-none"
                  />
                </div>
                {errors?.password && handleFormErrors(errors.password.message)}
              </fieldset>

              <div className="justify-center card-actions">
                <button
                  className="btn mt-1 rounded-lg bg-rose-500 hover:bg-rose-600 text-white shadow-md shadow-rose-200"
                >
                  Login
                </button>
              </div>
              <div className="text-center">
                <p className="inline-block text-sm text-slate-600 text-textSecondary mt-1">
                  New User?
                </p>
                <p
                  className="inline-block text-rose-500 hover:text-rose-600 cursor-pointer"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up here
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}

export default Login;
