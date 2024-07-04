import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/authSlice";
import GoogleAuth from "../Login/GoogleAuth";
import GitHubAuth from "./GitHubAuth";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

//refernce: firebase for the password reset and youtube: https://www.youtube.com/watch?v=uA9ejPZiEOw
//chatpromt: how do i make sure that the forgot password link sends an email to the user to reset their password
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        toast.error("Please fill in all fields");
        return;
      }

      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
      setEmail("");
      setPassword("");
      if (user) {
        toast.success("Log in successfully");
        dispatch(logIn({ user: user.user, token: user.user.accessToken }));
        navigate("/");
      }
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        toast.error("Invalid credential, please try again");
      } else {
        console.log(error);
      }
    }
  };

  const handleForgotPassword = async () => {
    try {
      const actionCodeSettings = {
        url: "https://budget-application-chi.vercel.app/login",
        handleCodeInApp: true,
      };

      await sendPasswordResetEmail(auth, email, actionCodeSettings);
      toast.success("Password reset email sent! Please check your inbox.");
    } catch (error) {
      console.error(error.code, error.message);
      toast.error("Failed to send password reset email. Please try again.");
    }
  };

  return (
    <div>
      <div className='blur-circle'></div>
      <div className='max-w-[1200px] flex items-center justify-center min-h-screen mx-auto px-4'>
        <div className='bg-main-lightPurple px-4 md:py-6 rounded-xl relative w-full sm:w-auto'>
          <div className='left-circle w-[50px] h-[50px] bg-main-lightPink absolute -left-5 -top-6 -z-10 rounded-full'></div>

          <div className='form flex flex-col md:flex-row'>
            <div className='left md:px-4 z-10 w-full md:w-[250px] mt-[10px] md:mt-[30px]'>
              <h1 className='font-bold text-2xl text-center'>Welcome</h1>
              <h2 className='text-sm text-center'>Log in to get started!</h2>
              <div className='login-form bg-main-darkPurple rounded-sm md:rounded-e-[2rem] mt-4 relative left-0 md:left-2 w-full md:w-[270px]'>
                <div className='flex flex-col p-4 gap-3 md:gap-4'>
                  <form
                    className='flex flex-col gap-2 md:gap-4'
                    onSubmit={handleSubmit}
                  >
                    <div className='flex flex-col gap-1'>
                      <label className='text-pink-600'>Email:</label>
                      <input
                        type='text'
                        placeholder='budgetApp@gmail.com'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='bg-transparent border-2 rounded-sm px-2 border-main-lightPink outline-none text-white text-sm py-1 placeholder:text-[#b8b7b7]'
                      />
                    </div>
                    <div className='flex flex-col gap-1 relative'>
                      <label className='text-pink-600'>Password:</label>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='bg-transparent border-2 rounded-sm px-2 border-main-lightPink outline-none text-white text-sm py-1'
                      />
                      <span
                        className='absolute right-3 top-8 cursor-pointer'
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <FiEyeOff size={20} color='#d91c5c' />
                        ) : (
                          <FiEye size={20} color='#f910f9' />
                        )}
                      </span>
                    </div>

                    <span
                      className='text-[10px] text-white cursor-pointer ml-auto'
                      onClick={handleForgotPassword}
                    >
                      Forgot Password
                    </span>

                    <button
                      type='submit'
                      className='bg-white py-1 hover:bg-slate-300 duration-300 rounded-full mt-[10px] md:mt-[20px]'
                    >
                      Log In
                    </button>
                  </form>
                  <GoogleAuth />
                  <GitHubAuth />
                </div>
                <p className='px-4 pb-4 flex items-center justify-between'>
                  <span className='text-[10px] text-white'>
                    Don't have an account?
                  </span>
                  <span className='text-[10px] text-yellow-300'>
                    <Link to='/signup'>Sign up for free</Link>
                  </span>
                </p>
              </div>
            </div>

            <div className='right mt-4 md:mt-0'>
              <img
                src='/loginImage.jpg'
                alt='Profile'
                className='rounded-xl w-full md:w-[500px] h-auto mb-3 md:mb-0'
              />
            </div>
          </div>
          <div className='right-circle w-[50px] h-[50px] bg-main-lightPink absolute -right-5 -bottom-6 -z-10 rounded-full'></div>
        </div>
      </div>
    </div>
  );
}
