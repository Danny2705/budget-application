import React, { useEffect, useRef, useState } from "react";
import Layout from "../Layout/Layout";
import { FiEdit, FiEye, FiEyeOff } from "react-icons/fi";
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
  updateEmail,
} from "firebase/auth";
import { updateProfilePicture, updateUser } from "../../redux/authSlice";
import { motion } from "framer-motion";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [imagePercent, setImagePercent] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [uploadedImageURL, setUploadedImageURL] = useState(null);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewURL(URL.createObjectURL(file));
      uploadImage(file);
      setImagePercent(0);
    }
  };

  const uploadImage = async (file) => {
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
          setUploadedImageURL(downloadURL);
          toast.success("Image uploaded successfully");
        } catch (error) {
          console.error("Error getting download URL", error.message);
          toast.error("Error getting download URL");
        }
      }
    );
  };

  const updatePasswordHandler = async () => {
    if (!oldPassword) {
      toast.error("Missing old password");
      return false;
    }

    try {
      if (newPassword !== confirmPassword) {
        toast.error("Passwords do not match");
        return false;
      }

      const userCredential = EmailAuthProvider.credential(
        user.email,
        oldPassword
      );
      await reauthenticateWithCredential(auth.currentUser, userCredential);
      await updatePassword(auth.currentUser, newPassword);

      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      return true;
    } catch (error) {
      console.error("Error updating password", error.message);
      if (error.code === "auth/invalid-credential") {
        toast.error("Incorrect old password");
      } else if (error.code === "auth/too-many-requests") {
        toast.error("Too many requests. Try again later.");
      } else {
        toast.error("Error updating password");
      }
      return false;
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const isNameEmailChanged =
      name !== user.displayName || email !== user.email;

    if (!oldPassword) {
      toast.error("Missing old password to proceed.");
      return;
    }

    const passwordUpdated = await updatePasswordHandler();

    if (!passwordUpdated) {
      return;
    }

    // Update profile data object
    let profileData = {
      displayName: name || user.displayName,
      email: email || user.email,
      photoURL: uploadedImageURL || user.photoURL,
    };

    if (isNameEmailChanged) {
      await updateProfile(auth.currentUser, {
        displayName: name,
        email,
      });
      dispatch(updateUser({ displayName: name, email: email }));
      toast.success("Profile updated successfully");
      navigate("/");
    } else {
      navigate("/");
    }

    // Update profile picture if a new image is selected
    if (selectedFile) {
      if (uploadedImageURL) {
        profileData.photoURL = uploadedImageURL;
        try {
          await updateProfile(auth.currentUser, profileData);
          dispatch(updateUser(profileData));
          dispatch(updateProfilePicture(uploadedImageURL));
          toast.success("Profile updated successfully");
          navigate("/");
        } catch (error) {
          console.error("Error updating profile picture", error.message);
          toast.error("Error updating profile picture");
        }
      } else {
        toast.error("Image upload in progress, please wait...");
      }
    }

    // Navigate away after successful updates
    if (newPassword && confirmPassword) {
      toast.success("Password updated successfully");
      navigate("/");
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
              src={previewURL || user?.photoURL || "/profile.jpg"}
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
              Image uploaded successfully
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
            <div className='mb-3'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='old-password'
              >
                Old Password
              </label>
              <div className='relative'>
                <input
                  id='old-password'
                  type={showOldPassword ? "text" : "password"}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10'
                />
                <button
                  type='button'
                  className='absolute inset-y-0 right-0 flex items-center px-3 py-2 bg-transparent text-gray-500 hover:text-gray-700'
                  onClick={() => setShowOldPassword(!showOldPassword)}
                >
                  {showOldPassword ? (
                    <FiEyeOff size={20} color='#d91c5c' />
                  ) : (
                    <FiEye size={20} color='#f910f9' />
                  )}
                </button>
              </div>
            </div>

            <p
              className='text-white text-[0.75rem] text-right cursor-pointer duration-200 hover:text-main-neonPink mb-3'
              onClick={() => setShowChangePassword(!showChangePassword)}
            >
              Change password
            </p>
            {showChangePassword && (
              <motion.div
                className='overflow-hidden'
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div className='mb-6'>
                  <label
                    className='block text-gray-700 text-sm font-bold mb-2'
                    htmlFor='new-password'
                  >
                    New Password
                  </label>
                  <div className='relative'>
                    <input
                      id='new-password'
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10'
                    />
                    <button
                      type='button'
                      className='absolute inset-y-0 right-0 flex items-center px-3 py-2 bg-transparent text-gray-500 hover:text-gray-700'
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? (
                        <FiEyeOff size={20} color='#d91c5c' />
                      ) : (
                        <FiEye size={20} color='#f910f9' />
                      )}
                    </button>
                  </div>
                </div>
                <div className='mb-6'>
                  <label
                    className='block text-gray-700 text-sm font-bold mb-2'
                    htmlFor='confirm-password'
                  >
                    Confirm New Password
                  </label>
                  <div className='relative'>
                    <input
                      id='confirm-password'
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10'
                    />
                    <button
                      type='button'
                      className='absolute inset-y-0 right-0 flex items-center px-3 py-2 bg-transparent text-gray-500 hover:text-gray-700'
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <FiEyeOff size={20} color='#d91c5c' />
                      ) : (
                        <FiEye size={20} color='#f910f9' />
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
            <button
              type='submit'
              className='bg-main-neonPink w-full hover:bg-main-darkPink text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              disabled={imagePercent > 0 && imagePercent < 100}
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
