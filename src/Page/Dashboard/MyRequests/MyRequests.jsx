import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Eye, Pencil, Trash2, CheckCircle, XCircle } from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyRequests = () => {
  const axiosSecure = useAxiosSecure();

  const [myRequests, setMyRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const limit = 5;

  useEffect(() => {
    axiosSecure
      .get(`/my-requests?page=${currentPage}&limit=${limit}`)
      .then((res) => {
        setMyRequests(res.data.data);
        setTotalPages(res.data.totalPages);
      });
  }, [axiosSecure, currentPage]);

  const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this request?")) return;
  try {
    await axiosSecure.delete(`/requests/${id}`);

    setMyRequests(prev => prev.filter(req => req._id !== id));
  } catch (error) {
    console.error("Failed to delete request:", error);
  }
};


  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-700 mb-2 md:mb-0">
            My Donation Requests
          </h2>

        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {[
                  "Recipient Name",
                  "Location",
                  "Date",
                  "Blood Group",
                  "Status",
                  "Actions",
                ].map((head) => (
                  <th
                    key={head}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {myRequests.map((req) => (
                <tr
                  key={req._id}
                  className="hover:bg-gray-50 transition duration-200"
                >
                  <td className="px-6 py-4 font-medium text-gray-700">
                    {req.recipientName}
                  </td>
                  <td className="px-6 py-4 text-gray-500">{req.address}</td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(req.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-semibold">
                      {req.bloodGroup}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        req.status === "inprogress"
                          ? "bg-blue-100 text-blue-700"
                          : req.status === "done"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-3">
                      {req.status === "inprogress" && (
                        <>
                          <button className="text-green-600 hover:text-green-800 transition" title="Mark Done">
                            <CheckCircle size={18} />
                          </button>
                          <button className="text-red-600 hover:text-red-800 transition" title="Cancel Request">
                            <XCircle size={18} />
                          </button>
                        </>
                      )}

                      <button
                        onClick={() => handleDelete(req._id)}
                        className="text-red-500 hover:text-red-700 transition"
                        title="Delete Request">
                        <Trash2 size={18} />
                        </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-wrap justify-end gap-2 p-6 border-t border-gray-100">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="px-4 py-1 border rounded disabled:opacity-50 hover:bg-gray-100 transition"
          >
            Prev
          </button>

          {[...Array(totalPages).keys()].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page + 1)}
              className={`px-4 py-1 border rounded font-medium transition ${
                currentPage === page + 1
                  ? "bg-red-500 text-white border-red-500"
                  : "hover:bg-gray-100"
              }`}
            >
              {page + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-4 py-1 border rounded disabled:opacity-50 hover:bg-gray-100 transition"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyRequests;
