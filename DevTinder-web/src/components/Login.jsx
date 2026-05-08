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
        <div className="flex justify-center items-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 h-[90vh]">
          <div
            className={`w-80 rounded-2xl
  bg-[#6623a1]
  border border-white/10
   h-70 h-fit`}
          >
            <div className="card-body h-fit">
              <h2 className="text-2xl font-semibold text-center text-white mb-2 justify-center">
                Login
              </h2>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Email ID:</legend>
                <div className="flex px-3 py-2 border items-center gap-2">
                  <Icon icon="mdi:email" width={20} className="text-white" />
                  <RHFTextField
                    name="email"
                    placeholder="enter your email address"
                    style="outline-none text-white rounded-md w-full"
                  />
                </div>
                {errors?.email && handleFormErrors(errors.email.message)}
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Password:</legend>
                <div className="flex px-3 py-2 border items-center gap-2 width-full">
                  <Icon icon="mdi:lock" width={20} className="text-white" />
                  <RHFTextField
                    name="password"
                    placeholder="enter your password"
                    style="outline-none text-white rounded-md w-full"
                  />
                </div>
                {errors?.password && handleFormErrors(errors.password.message)}
              </fieldset>

              <div className="justify-center card-actions">
                <button className="btn mt-1 rounded-lg font-semibold text-white bg-pink-500 hover:bg-pink-600 transition duration-300 shadow-lg shadow-pink-500/40">
                  Login
                </button>
              </div>
              <div className="text-center">
                <p className="inline-block text-sm text-textSecondary mt-1">
                  New User?
                </p>
                <p
                  className="inline-block text-pink-500 cursor-pointer"
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
