import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserdata } from "@/redux/Userslice";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";

const EditProfile = () => {
  const dispatch = useDispatch();
  const { userdata } = useSelector((state) => state.user);

  const [firstName, setFirstName] = useState(userdata?.firstName || "");
  const [lastName, setLastName] = useState(userdata?.lastName || "");
  const [bio, setBio] = useState(userdata?.bio || "");
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("bio", bio);

      if (photo) {
        formData.append("image", photo);
      }

      const res = await axios.put(
        "http://localhost:5000/api/auth/editProfile",
        formData,
        { withCredentials: true }
      );

      dispatch(setUserdata(res.data.user));
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log(error);
      toast.error("Profile update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div
        className="min-h-screen flex items-center justify-center px-4 
                      bg-slate-50 dark:bg-neutral-900"
      >
        <form
          onSubmit={updateProfile}
          className="w-full max-w-md p-6 rounded-xl shadow-md
                     bg-white dark:bg-neutral-800"
        >
          <h1
            className="text-2xl font-bold mb-6 text-center
                         text-black dark:text-white"
          >
            Edit Profile
          </h1>

          {/* Profile Image */}
          <div className="flex flex-col items-center mb-5">
            <img
              src={userdata?.photoUrl || "/author.avif"}
              alt="profile"
              className="w-24 h-24 rounded-full object-cover mb-2 border
                         border-gray-300 dark:border-neutral-600"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
              className="text-sm text-gray-600 dark:text-gray-300 ml-28"
            />
          </div>

          {/* First Name */}
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-1
                              text-gray-700 dark:text-gray-300"
            >
              First Name
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border
                         bg-white dark:bg-neutral-700
                         border-gray-300 dark:border-neutral-600
                         text-black dark:text-white"
              required
            />
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-1
                              text-gray-700 dark:text-gray-300"
            >
              Last Name
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border
                         bg-white dark:bg-neutral-700
                         border-gray-300 dark:border-neutral-600
                         text-black dark:text-white"
              required
            />
          </div>

          {/* Bio */}
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-1
                              text-gray-700 dark:text-gray-300"
            >
              Bio
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows="3"
              className="w-full px-3 py-2 rounded-lg border
                         bg-white dark:bg-neutral-700
                         border-gray-300 dark:border-neutral-600
                         text-black dark:text-white"
            />
          </div>

          {/* Submit */}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Updating..." : "Save Changes"}
          </Button>
        </form>
      </div>
    </>
  );
};

export default EditProfile;
