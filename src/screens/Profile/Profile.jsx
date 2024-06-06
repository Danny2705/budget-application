import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import Layout from "../Layout/Layout";
import { FiEdit } from "react-icons/fi";
import { useSelector } from "react-redux";

function ProfileAvatar({image, name, email}) {
  return (
    <div>
      <Avatar
        name={name}
        src={image}
        size="100"
        round={true}
        color="#801AE5"
      />
    </div>
  );
}

export default function Profile() {
  const [name, setName] = useState("");
  const [labelName, setLabelName] = useState("");
  const [email, setEmail] = useState("");
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!name) {
      setName(user?.displayName || "");
    }
    if (!email) {
      setEmail(user?.email || "");
    }
  }, [user, name, email]);


  return (
    <Layout>
      <div className="mt-[90px]">
        <div className="flex flex-col items-center p-6">
          <div className="relative mb-4">
            <ProfileAvatar />
          </div>
          <form className="w-full max-w-sm">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder={labelName}
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
