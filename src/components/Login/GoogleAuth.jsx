import React from "react";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../../utils/firebase";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { logIn } from "../../redux/authSlice";
import toast from "react-hot-toast";

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      if (result) {
        toast.success("Login successfully");
        dispatch(logIn({ user: result.user, token: result.user.accessToken }));

        navigate("/");
      } else {
        toast.error("There is something wrong");
      }
    } catch (error) {
      console.log("Could not log in with Google", error);
    }
  };
  return (
    <button
      type='submit'
      onClick={handleGoogleClick}
      className='bg-white py-1 flex items-center gap-3 px-3 justify-center hover:bg-slate-300 duration-300 rounded-full'
    >
      <img src='/google.png' alt='Google' width={20} />
      Continue with Google
    </button>
  );
}
