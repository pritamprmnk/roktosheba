import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700",
  "in progress": "bg-blue-100 text-blue-700",
  done: "bg-green-100 text-green-700",
  canceled: "bg-gray-200 text-gray-600",
};

const AllRequest = () => {
  const axiosInstance = useAxiosSecure();
  const [requests, setRequests] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    axiosInstance
      .get(`/all-requests?page=${page}&limit=10`)
      .then((res) => {
        setRequests(res.data.data);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => console.error(err));
  }, [axiosInstance, page]);

  return (
    <div className="p-6 bg-white rounded-xl shadow space-y-6">
      <h2 className="text-2xl font-bold">All Requests</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead className="bg-gray-100">
            <tr>
              <th>Recipient</th>
              <th>Location</th>
              <th>Date & Time</th>
              <th>Blood Group</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.length > 0 ? (
              requests.map((req) => (
                <tr key={req._id}>
                  <td>{req.recipientName}</td>
                  <td>{req.district}, {req.upazila}</td>
                  <td>
                    {req.donationDate} <br />
                    <span className="text-xs text-gray-500">{req.donationTime}</span>
                  </td>
                  <td>
                    <span className="px-3 py-1 rounded-full bg-red-100 text-red-600">
                      {req.bloodGroup}
                    </span>
                  </td>
                  <td>
                    <span className={`px-3 py-1 rounded-full text-sm capitalize ${statusColors[req.status] || "bg-gray-200 text-gray-600"}`}>
                      {req.status || "pending"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-gray-500">
                  No requests found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-500">
          Page {page} of {totalPages}
        </p>
        <div className="flex gap-2">
          <button
            className="btn btn-sm"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Prev
          </button>
          <button
            className="btn btn-sm"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllRequest;
