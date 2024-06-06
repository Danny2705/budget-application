import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import Layout from "../Layout/Layout";
import { FiEdit } from "react-icons/fi";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function ProfileAvatar({ image, name }) {
  return (
    <div>
      <Avatar name={name} src={image} size="100" round={true} color="#801AE5" />
    </div>
  );
}

export default function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (!name) {
      setName(user?.displayName);
    }
    if (!email) {
      setEmail(user?.email);
    }
  }, []);

  const onSave = (event) => {
    event.preventDefault();
    setIsSaved(true);
    toast.success("Change Successful");
    navigate("/")
    // Here you can add the code to save the updated name and email, for example, making an API call to update the user info in the backend.
  };

  return (
    <Layout>
      <div className="mt-[90px]">
        <div className="flex flex-col items-center p-6">
          <div className="relative mb-4">
            {!isSaved ? (
              <ProfileAvatar name={user.displayName} image={image} />
            ) : (
              <ProfileAvatar name={name} image={image} />
            )}
            <label
              htmlFor="imageUpload"
              className="absolute bottom-0 right-0 bg-white p-1 rounded-full cursor-pointer"
            >
              <FiEdit size={20} />
            </label>
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              onChange={(event) => handleImageUpload(event)}
              style={{ display: "none" }}
            />
          </div>
          <form className="w-full max-w-sm" onSubmit={onSave}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
