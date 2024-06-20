import React, { useEffect, useRef, useState } from "react";
import Layout from "../Layout/Layout";
import { FiEdit } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../utils/firebase";
import {
  getAuth,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updateProfile,
} from "firebase/auth";
import { updateProfilePicture, updateUser } from "../../redux/authSlice";

export default function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [imagePercent, setImagePercent] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const fileRef = useRef(null);
  const auth = getAuth(app);

  useEffect(() => {
    if (user) {
      setName(user.displayName || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const handleFileUpload = async (file) => {
    try {
      const storage = getStorage(app);
      const fileName = `${new Date().getTime()}_${file.name}`;
      const storageRef = ref(storage, `profile/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImagePercent(Math.round(progress));
        },
        (error) => {
          console.error("Error uploading image", error.message);
          toast.error("Error uploading image");
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

            const profileData = {
              displayName: name || user.displayName,
              email: email || user.email,
              photoURL: downloadURL,
            };

            await updateProfile(auth.currentUser, profileData);

            dispatch(updateUser(profileData));
            dispatch(updateProfilePicture(downloadURL));
          } catch (error) {
            console.error("Error updating profile", error.message);
            toast.error("Error updating profile");
          }
        }
      );
    } catch (error) {
      console.error("Error uploading file", error.message);
      toast.error("Error uploading file");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const updatePasswordHandler = async () => {
    try {
      if (newPassword !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
      const userCredential = EmailAuthProvider.credential(
        user.email,
        oldPassword
      );
      await reauthenticateWithCredential(auth.currentUser, userCredential);
      await updatePassword(auth.currentUser, newPassword);
      toast.success("Updated successfully");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      navigate("/");
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        toast.error("The old password is wrong. Try again.");
      } else if (error.code === "auth/too-many-requests") {
        toast.error("Too many requests. Try again later.");
      } else if (error.code === "auth/missing-password") {
        toast.error("Missing enter old password");
      } else {
        console.error("Error updating password", error.message);
        toast.error("Error updating password");
      }
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    await updatePasswordHandler();

    if (name !== user.displayName || email !== user.email) {
      await updateProfile(auth.currentUser, {
        displayName: name,
        email,
      });
      dispatch(updateUser({ displayName: name, email: email }));
    }
  };

  return (
    <Layout>
      <div className='mt-[90px]'>
        <div className='flex flex-col items-center p-6'>
          <div className='relative mb-4'>
            <input
              type='file'
              ref={fileRef}
              hidden
              accept='image/*'
              onChange={handleFileChange}
            />
            <img
              src={user?.photoURL || "/profile.jpg"}
              alt='User Profile'
              className='w-[120px] h-[120px] mx-auto rounded-full'
            />

            <button
              onClick={() => fileRef.current.click()}
              className='absolute bottom-0 right-0 bg-white p-1 rounded-full cursor-pointer'
            >
              <FiEdit size={20} />
            </button>
          </div>
          {imagePercent > 0 && imagePercent < 100 ? (
            <span className='flex items-center justify-center text-green-600 font-josefin'>
              Uploading... {imagePercent} %
            </span>
          ) : imagePercent === 100 ? (
            <span className='flex items-center justify-center text-green-600 font-josefin'>
              Image Uploaded Successfully
            </span>
          ) : (
            ""
          )}
          <form className='w-full max-w-md' onSubmit={onSubmit}>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2'>
                Name
              </label>
              <input
                id='name'
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              />
            </div>
            <div className='mb-6'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='email'
              >
                Email
              </label>
              <input
                id='user-email'
                type='text'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              />
            </div>
            <div className='mb-6'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='old-password'
              >
                Old Password
              </label>
              <input
                id='old-password'
                type='password'
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              />
            </div>
            <div className='mb-6'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='new-password'
              >
                New Password
              </label>
              <input
                id='new-password'
                type='password'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              />
            </div>
            <div className='mb-6'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='confirm-password'
              >
                Confirm New Password
              </label>
              <input
                id='confirm-password'
                type='password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              />
            </div>
            <button
              type='submit'
              className='bg-main-neonPink w-full hover:bg-main-darkPink text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
