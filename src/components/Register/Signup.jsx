import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../utils/firebase";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";

//reference: firebase for the email verification and youtube: https://www.youtube.com/watch?v=0HJ9wPq0B54
export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!username || !email || !password) {
        toast.error("Please fill in all fields");
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await updateProfile(user, { displayName: username });
      setUsername("");
      setEmail("");
      setPassword("");

      if (user) {
        toast.success(
          "Sign up successful! Please check your email for verification."
        );
        const actionCodeSettings = {
          url: "https://budget-application-chi.vercel.app/login",
          handleCodeInApp: true,
        };
        await sendEmailVerification(auth.currentUser, actionCodeSettings);
      }

      if (user) {
        toast.success("Register successfully");
        navigate("/login");
      }
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email is already in use");
      } else if (error.code === "auth/invalid-email") {
        toast.error("Please enter the email");
      } else if (error.code === "auth/weak-password") {
        toast.error("Password must be at least 6 characters");
      } else {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <div className='blur-circle'></div>
      <div className='max-w-[1200px] flex items-center justify-center min-h-screen mx-auto px-4'>
        <div className='bg-main-lightPurple px-4 py-6 rounded-xl relative w-full sm:w-auto'>
          <div className='left-circle w-[50px] h-[50px] bg-main-lightPink absolute -left-5 -top-6 -z-10 rounded-full'></div>
          <div className='form flex flex-col md:flex-row'>
            <div className='left md:px-4 z-10 w-full md:w-[250px] md:mt-[30px]'>
              <h1 className='font-bold text-2xl text-center'>Welcome</h1>
              <h2 className='text-sm text-center'>Sign Up Account For Free</h2>
              <div className='login-form bg-main-darkPurple rounded-sm md:rounded-e-[2rem] mt-4 relative left-0 md:left-2 w-full md:w-[270px]'>
                <form
                  className='p-4 flex flex-col gap-3'
                  onSubmit={handleSubmit}
                >
                  <div className='flex flex-col gap-1'>
                    <label className='text-pink-600'>Username:</label>
                    <input
                      type='text'
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder='budget app'
                      className='bg-transparent border-2 rounded-sm px-2 border-main-lightPink outline-none text-white py-1 text-sm placeholder:text-[#b8b7b7]'
                    />
                  </div>
                  <div className='flex flex-col gap-1'>
                    <label className='text-pink-600'>Email:</label>
                    <input
                      type='text'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder='budgetApp@gmail.com'
                      className='bg-transparent border-2 rounded-sm px-2 border-main-lightPink outline-none text-white py-1 text-sm placeholder:text-[#b8b7b7]'
                    />
                  </div>
                  <div className='flex flex-col gap-1 relative'>
                    <label className='text-pink-600'>Password:</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className='bg-transparent border-2 rounded-sm px-2 border-main-lightPink outline-none text-white py-1 text-sm'
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
                  <button
                    type='submit'
                    className='bg-white py-1 hover:bg-slate-300 duration-300 rounded-full mt-[20px]'
                  >
                    Sign Up
                  </button>
                </form>
                <p className='px-4 pb-4 flex items-center justify-between'>
                  <span className='text-[10px] text-white'>
                    Already have an account?
                  </span>
                  <span className='text-[10px] text-yellow-300'>
                    <Link to='/login'>Sign in</Link>
                  </span>
                </p>
              </div>
            </div>
            <div className='right mt-4 md:mt-0'>
              <img
                src='/loginImage.jpg'
                alt='Profile'
                className='rounded-xl w-full md:w-[500px] h-auto'
              />
            </div>
          </div>
          <div className='right-circle w-[50px] h-[50px] bg-main-lightPink absolute -right-5 -bottom-6 -z-10 rounded-full'></div>
        </div>
      </div>
    </div>
  );
}
