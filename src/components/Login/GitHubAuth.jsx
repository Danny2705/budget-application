import React from "react";
import { auth, provider } from "../../utils/firebase";
import { signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logIn } from "../../redux/authSlice";
import toast from "react-hot-toast";

export default function GitHubAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGitHubLogin = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        if (res) {
          toast.success("Login successfully");
          dispatch(logIn({ user: res.user, token: res.user.accessToken }));

          navigate("/");
        } else {
          toast.error("There is something wrong");
        }
      })
      .catch((error) => {
        if (error.code === "auth/account-exists-with-different-credential") {
          toast.error("Account exists with different credential");
        }
        console.log(error);
      });
  };
  return (
    <button
      type='submit'
      className='bg-white py-1 flex items-center gap-3 px-3 justify-center hover:bg-slate-300 duration-300 rounded-full'
      onClick={handleGitHubLogin}
    >
      <img src='/github.png' alt='GitHub' width={20} />
      Log in with GitHub
    </button>
  );
}
