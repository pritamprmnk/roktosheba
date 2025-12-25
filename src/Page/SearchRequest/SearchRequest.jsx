import axios from "axios";
import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { FaTint } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import { MdLocalHospital, MdCalendarToday, MdPerson } from "react-icons/md";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const SearchRequest = () => {
  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const axiosInstance = useAxios();

  useEffect(() => {
    axios.get("/districts.json").then(res => setDistricts(res.data.districts || []));
    axios.get("/upazila.json").then(res => setUpazilas(res.data.upazilas || []));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const bloodGroup = e.target.blood.value;

    setHasSearched(true);
    setLoading(true);
    setResults([]);

    axiosInstance
      .get(
        `/search-requests?bloodGroup=${bloodGroup}&district=${district}&upazila=${upazila}`
      )
      .then(res => {
        setResults(res.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 bg-gradient-to-b from-red-50/40 to-white">
 
      <h2 className="text-3xl md:text-4xl font-extrabold text-center text-red-600 mb-12">
        Find Blood Donation Requests
      </h2>


      <form
        onSubmit={handleSearch}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-xl"
      >
        <select name="blood" required className="select select-bordered rounded-xl">
          <option value="">Blood Group</option>
          {bloodGroups.map(bg => (
            <option key={bg} value={bg}>{bg}</option>
          ))}
        </select>

        <select
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          className="select select-bordered rounded-xl"
        >
          <option value="">District</option>
          {districts.map(d => (
            <option key={d.id} value={d.name}>{d.name}</option>
          ))}
        </select>

        <select
          value={upazila}
          onChange={(e) => setUpazila(e.target.value)}
          className="select select-bordered rounded-xl"
        >
          <option value="">Upazila</option>
          {upazilas.map(u => (
            <option key={u.id} value={u.name}>{u.name}</option>
          ))}
        </select>

        <button
          disabled={loading}
          className="bg-red-500 text-white p-3 rounded-lg font-semibold hover:bg-red-600"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>


      {loading && (
        <div className="text-center mt-14">
          <span className="loading loading-spinner loading-lg text-error"></span>
        </div>
      )}

      {!hasSearched && !loading && (
        <p className="text-center mt-14 text-gray-400">
          Select blood group & location, then click search
        </p>
      )}

      {!loading && hasSearched && results.length === 0 && (
        <div className="text-center mt-14 text-gray-500">
          <p className="text-xl font-semibold">No requests found</p>
          <p className="text-sm mt-2">Try different filters</p>
        </div>
      )}

      {results.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {results.map(item => (
            <div
              key={item._id}
              className="group bg-white rounded-3xl border border-gray-100 p-6 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-500">
                  <FaTint />
                </div>
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-red-500 transition">
                  {item.recipientName}
                </h3>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <p className="flex items-center gap-2">
                  <MdPerson className="text-red-400" />
                  <span className="font-semibold text-gray-800">Requester:</span>
                  {item.requesterName}
                </p>

                <p className="flex items-center gap-2">
                  <HiLocationMarker className="text-red-400" />
                  {item.district}, {item.upazila}
                </p>

                <p className="flex items-center gap-2">
                  <MdLocalHospital className="text-red-400" />
                  {item.hospital}
                </p>

                <p className="flex items-center gap-2">
                  <MdCalendarToday className="text-red-400" />
                  {item.donationDate}
                </p>
              </div>

              <div className="mt-6">
                <span
                  className={`px-4 py-1 text-xs font-semibold rounded-full capitalize
                    ${
                      item.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : item.status === "inprogress"
                        ? "bg-blue-100 text-blue-700"
                        : item.status === "done"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                >
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchRequest;
