import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {  Trash2, CheckCircle, XCircle } from "lucide-react";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const DonorDashboard = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axiosSecure.get("/my-requests?limit=3").then((res) => {
      setRequests(res.data.data || []);
    });
  }, [axiosSecure]);

  const handleStatusUpdate = async (id, status) => {
    await axiosSecure.patch(`/requests/${id}`, { status });
    setRequests((prev) =>
      prev.map((r) => (r._id === id ? { ...r, status } : r))
    );
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this request?")) return;
    await axiosSecure.delete(`/requests/${id}`);
    setRequests((prev) => prev.filter((r) => r._id !== id));
  };

  if (requests.length === 0)
    return (
      <div className="p-6 min-h-screen flex items-center justify-center text-gray-500">
        No recent requests found.
      </div>
    );

  return (
    <div className="p-6 bg-gradient-to-r from-gray-50 via-white to-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-800 mb-2">
            Welcome back, {user?.displayName} 👋
          </h2>
          <p className="text-gray-500 text-sm md:text-base">
            Overview of your recent donation activities.
          </p>
        </div>

        <Link
          to="/dashboard/add-request"
          className="mt-4 md:mt-0 px-5 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg shadow-md transition-all duration-300"
        >
          + Create Request
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-xl font-semibold text-gray-700">
            Recent Donation Requests
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {[
                  "Recipient",
                  "Location",
                  "Date",
                  "Time",
                  "Blood",
                  "Status",
                  "Actions",
                ].map((head) => (
                  <th
                    key={head}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="bg-white  divide-gray-200">
              {requests.map((req) => {
                const status = req.status?.toLowerCase();
                return (
                  <tr key={req._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-700">
                      {req.recipientName}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {req.recipientDistrict}, {req.address}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {req.donationDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {req.donationTime}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 font-semibold text-sm">
                        {req.bloodGroup}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : status === "inprogress"
                            ? "bg-blue-100 text-blue-700"
                            : status === "done"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {status}
                      </span>
                      {status === "inprogress" && req.donor && (
                        <div className="text-xs mt-1 text-gray-400">
                          {req.donor.name} <br />
                          {req.donor.email}
                        </div>
                      )}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center justify-center gap-3">
                        {status === "inprogress" && (
                          <>
                            <button
                              onClick={() =>
                                handleStatusUpdate(req._id, "done")
                              }
                              className="text-green-600 hover:text-green-800 transition"
                              title="Mark as Done"
                            >
                              <CheckCircle size={18} />
                            </button>

                            <button
                              onClick={() =>
                                handleStatusUpdate(req._id, "canceled")
                              }
                              className="text-red-600 hover:text-red-800 transition"
                              title="Cancel Request"
                            >
                              <XCircle size={18} />
                            </button>
                          </>
                        )}





                        <button
                          onClick={() => handleDelete(req._id)}
                          className="text-red-500 hover:text-red-700 transition"
                          title="Delete Request"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="p-6 text-right border-t border-gray-100">
          <Link
            to="/dashboard/my-requests"
            className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg shadow-md transition-all duration-300"
          >
            View All Requests
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;
