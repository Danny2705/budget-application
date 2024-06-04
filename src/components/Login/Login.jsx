import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../utils/firebase";
import { signInWithEmailAndPassword} from "firebase/auth";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/authSlice";
import GoogleAuth from "../Login/GoogleAuth";
import GitHubAuth from "./GitHubAuth";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";


//refernce: firebase for the password reset and youtube: https://www.youtube.com/watch?v=uA9ejPZiEOw

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        url: 'http://localhost:3000',
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
      <div className="blur-circle"></div>
      <div className="max-w-[1200px] flex items-center justify-center h-[100vh] mx-auto">
        <div className=" bg-main-lightPurple px-4 py-6 rounded-xl relative">
          <div className="left-circle w-[50px] h-[50px] bg-main-lightPink absolute -left-5 -top-6 -z-10 rounded-full"></div>

          <div className="form flex">
            <div className="left px-4 z-10 w-[250px] mt-[30px]">
              <h1 className="font-bold text-2xl text-center">Welcome</h1>
              <h2 className="text-sm text-center">Log in to get started!</h2>
              <div className="login-form bg-main-darkPurple rounded-e-[2rem] mt-4 absolute left-6 w-[270px]">
                <div className="flex flex-col p-4 gap-4">
                  <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-1">
                      <label className="text-pink-600">Email:</label>
                      <input
                        type="text"
                        placeholder="budgetApp@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-transparent border-2 rounded-sm px-2 border-main-lightPink outline-none text-white text-sm py-1 placeholder:text-[#b8b7b7]"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-pink-600">Password:</label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-transparent border-2 rounded-sm px-2 border-main-lightPink outline-none text-white text-sm py-1"
                      />
                    </div>

                    <span className='text-[10px] text-white cursor-pointer ml-auto'
                     onClick={handleForgotPassword}>
                    Forgot Password
                  </span>

                    <button
                      type="submit"
                      className="bg-white py-1 hover:bg-slate-300 duration-300 rounded-full mt-[20px]"
                    >
                      Log In
                    </button>
                  </form>
                  <GoogleAuth />
                  <GitHubAuth />
                </div>
                <p className="px-4 pb-4 flex items-center justify-between">
                  <span className="text-[10px] text-white">
                    Don't have an account?
                  </span>
                  <span className="text-[10px] text-yellow-300">
                    <Link to="/signup">Sign up for free</Link>
                  </span>
                </p>
              </div>
            </div>

            <div className="right">
              <img
                src="/loginImage.jpg"
                alt="Profile"
                width={500}
                height={500}
                className="rounded-xl"
              />
            </div>
          </div>
          <div className="right-circle w-[50px] h-[50px] bg-main-lightPink absolute -right-5 -bottom-6 -z-10 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
