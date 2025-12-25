import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddRequest = () => {
  const { user } = useContext(AuthContext);

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");
  const [blood, setBlood] = useState("");

  useEffect(() => {
    axios.get("/districts.json").then(res => {
      setDistricts(res.data.districts);
    });

    axios.get("/upazila.json").then(res => {
      setUpazilas(res.data.upazilas);
    });
  }, []);


  const axiosSecure = useAxiosSecure()

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    const donationRequest = {
      requesterName: user?.displayName,
      requesterEmail: user?.email,
      recipientName: form.recipientName.value,
      district,
      upazila,
      hospital: form.hospital.value,
      address: form.address.value,
      bloodGroup: blood,
      donationDate: form.date.value,
      donationTime: form.time.value,
      message: form.message.value,
      status: "pending",
    };

    
     
      const formData = {
    requesterName: user?.displayName,
    requesterEmail: user?.email,
    recipientName: form.recipientName.value,
    district,
    upazila,
    hospital: form.hospital.value,
    address: form.address.value,
    bloodGroup: blood,
    donationDate: form.date.value,
    donationTime: form.time.value,
    message: form.message.value,
    status: "pending",
  };

  axiosSecure.post("/request", formData)
    .then((res) => {
      if (res.data.insertedId || res.data.success) {
        toast.success("Donation request submitted successful");

       
        form.reset();
        setDistrict("");
        setUpazila("");
        setBlood("");
      }
    })
    .catch((err) => {
      console.error(err);
      toast.error("Failed to submit request");
    });
};

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-red-500 mb-6">
        Create Donation Request
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-gray-700">
              Requester Name
            </label>
            <input
              type="text"
              value={user?.displayName || ""}
              readOnly
              className="w-full mt-2 px-4 py-3 rounded-lg border bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">
              Requester Email
            </label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="w-full mt-2 px-4 py-3 rounded-lg border bg-gray-100 cursor-not-allowed"
            />
          </div>
        </div>

        
        <div>
          <label className="block font-medium text-gray-700">
            Recipient Name
          </label>
          <input
            type="text"
            name="recipientName"
            required
            placeholder="Recipient full name"
            className="w-full mt-2 px-4 py-3 rounded-lg border focus:border-red-400 outline-none"
          />
        </div>

       
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-gray-700">
              Recipient District
            </label>
            <select
              value={district}
              onChange={(e) => {
                setDistrict(e.target.value);
                setUpazila("");
              }}
              required
              className="w-full mt-2 px-4 py-3 rounded-lg border focus:border-red-400 outline-none"
            >
              <option value="" disabled>
                Select your District
              </option>
              {districts.map(d => (
                <option key={d.id} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium text-gray-700">
              Recipient Upazila
            </label>
            <select
              value={upazila}
              onChange={(e) => setUpazila(e.target.value)}
              required
              className="w-full mt-2 px-4 py-3 rounded-lg border focus:border-red-400 outline-none"
            >
              <option value="" disabled>
                Select your Upazila
              </option>
              {upazilas.map(u => (
                <option key={u.id} value={u.name}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        
        <div>
          <label className="block font-medium text-gray-700">
            Hospital Name
          </label>
          <input
            type="text"
            name="hospital"
            required
            placeholder="Dhaka Medical College Hospital"
            className="w-full mt-2 px-4 py-3 rounded-lg border focus:border-red-400 outline-none"
          />
        </div>

        
        <div>
          <label className="block font-medium text-gray-700">
            Full Address
          </label>
          <input
            type="text"
            name="address"
            required
            placeholder="Zahir Raihan Rd, Dhaka"
            className="w-full mt-2 px-4 py-3 rounded-lg border focus:border-red-400 outline-none"
          />
        </div>

       
        <div>
          <label className="block font-medium text-gray-700">
            Blood Group
          </label>
          <select
            value={blood}
            onChange={(e) => setBlood(e.target.value)}
            required
            className="w-full mt-2 px-4 py-3 rounded-lg border focus:border-red-400 outline-none"
          >
            <option value="" disabled>
              Select blood group
            </option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>

        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-gray-700">
              Donation Date
            </label>
            <input
              type="date"
              name="date"
              required
              className="w-full mt-2 px-4 py-3 rounded-lg border focus:border-red-400 outline-none"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">
              Donation Time
            </label>
            <input
              type="time"
              name="time"
              required
              className="w-full mt-2 px-4 py-3 rounded-lg border focus:border-red-400 outline-none"
            />
          </div>
        </div>

       
        <div>
          <label className="block font-medium text-gray-700">
            Request Message
          </label>
          <textarea
            name="message"
            rows="4"
            required
            placeholder="Explain why blood is needed..."
            className="w-full mt-2 px-4 py-3 rounded-lg border focus:border-red-400 outline-none"
          />
        </div>

        
        <button
          type="submit"
          className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold transition"
        >
          Request Donation
        </button>
      </form>
    </div>
  );
};

export default AddRequest;
