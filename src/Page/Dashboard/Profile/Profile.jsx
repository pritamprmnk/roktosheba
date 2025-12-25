import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import {
  User,
  Mail,
  Phone,
  Droplet,
  MapPin,
  Lock,
  Edit2,
  Save,
  X
} from "lucide-react";
import toast from "react-hot-toast";
import Loader from "../../../components/Loader/Loader";

const Profile = () => {
  const auth = getAuth();

  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const token = await user.getIdToken();
        const res = await fetch(
          `https://rokto-sheba-server-mauve.vercel.app/users/${user.email}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch user data");

        const data = await res.json();
        setUserData(data);
        setFormData(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserData();
  }, [auth]);

  const handleSave = async () => {
    try {
      setLoading(true);
      const user = auth.currentUser;
      const token = await user.getIdToken();

      const res = await fetch(
        `https://rokto-sheba-server-mauve.vercel.app/users/${user.email}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) throw new Error("Update failed");

      setUserData(formData);
      setIsEditing(false);
      toast.success("Profile updated successfully!");

    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile!");

    } finally {
      setLoading(false);
    }
  };

  if (!userData) return <p className="p-6"> <Loader></Loader> </p>;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-red-100 overflow-hidden shadow-sm">
        
        <div className="bg-[#FFF0F0] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img
              src={userData.mainPhotoUrl || "https://via.placeholder.com/120"}
              alt="User"
              className="w-28 h-28 rounded-full border-4 border-white object-cover"
            />

            <div className="text-center md:text-left">
              <h1 className="text-2xl font-bold text-gray-900">
                {userData.name}
              </h1>

              <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-2">
                <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">
                  Active
                </span>
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <Droplet className="w-3 h-3" /> {userData.blood}
                </span>
              </div>
            </div>
          </div>

          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-[#CC1B36] hover:bg-[#b0172e] text-white px-6 py-2.5 rounded-lg flex items-center gap-2 font-semibold"
            >
              <Edit2 className="w-4 h-4" /> Edit Profile
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                disabled={loading}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg flex items-center gap-2 font-semibold"
              >
                <Save className="w-4 h-4" />
                {loading ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setFormData(userData);
                }}
                className="bg-gray-200 hover:bg-gray-300 px-5 py-2 rounded-lg flex items-center gap-2 font-semibold"
              >
                <X className="w-4 h-4" /> Cancel
              </button>
            </div>
          )}
        </div>

        <div className="p-6 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            <InputField
              label="Full Name"
              icon={<User className="w-4 h-4 text-red-500" />}
              value={formData.name || ""}
              disabled={!isEditing}
              onChange={(v) => setFormData({ ...formData, name: v })}
            />

            <InputField
              label="Email"
              icon={<Mail className="w-4 h-4 text-red-500" />}
              value={formData.email || ""}
              disabled
              locked
            />

            <InputField
              label="Phone"
              icon={<Phone className="w-4 h-4 text-red-500" />}
              value={formData.phone || ""}
              disabled={!isEditing}
              onChange={(v) => setFormData({ ...formData, phone: v })}
            />

            <InputField
              label="Blood Group"
              icon={<Droplet className="w-4 h-4 text-red-500" />}
              value={formData.blood || ""}
              disabled={!isEditing}
              onChange={(v) => setFormData({ ...formData, blood: v })}
            />

            <InputField
              label="District"
              icon={<MapPin className="w-4 h-4 text-red-500" />}
              value={formData.district || ""}
              disabled={!isEditing}
              onChange={(v) => setFormData({ ...formData, district: v })}
            />

            <InputField
              label="Upazila"
              icon={<MapPin className="w-4 h-4 text-red-500" />}
              value={formData.upazila || ""}
              disabled={!isEditing}
              onChange={(v) => setFormData({ ...formData, upazila: v })}
            />

          </div>
        </div>
      </div>
    </div>
  );
};

const InputField = ({ label, icon, value, disabled, onChange, locked }) => (
  <div className="space-y-2">
    <label className="flex items-center gap-2 text-sm font-bold text-gray-900">
      {icon} {label}
      {locked && <Lock className="w-3.5 h-3.5 text-gray-400 ml-auto" />}
    </label>
    <input
      type="text"
      value={value}
      disabled={disabled}
      onChange={(e) => onChange?.(e.target.value)}
      className={`w-full p-3 rounded-lg border
        ${disabled ? "bg-gray-100 text-gray-600" : "bg-white"}
      `}
    />
  </div>
);

export default Profile;
