import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import toast from "react-hot-toast";
import Loader from "../../../components/Loader/Loader";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700",
  "in progress": "bg-blue-100 text-blue-700",
  done: "bg-green-100 text-green-700",
  canceled: "bg-gray-200 text-gray-600",
};

const AllRequests = () => {
  const axiosSecure = useAxiosSecure();

  const [requests, setRequests] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [editingRequest, setEditingRequest] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axiosSecure.get(
          `/all-requests?page=${page}&limit=10&search=${search}&status=${status}`
        );
        setRequests(res.data.data);
        setTotalPages(res.data.totalPages);
      } catch {
        toast.error("Failed to fetch requests");
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchData, 300);
    return () => clearTimeout(timer);
  }, [axiosSecure, page, search, status]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this request?")) return;
    try {
      const res = await axiosSecure.delete(`/requests/${id}`);
      if (res.data.deletedCount > 0) {
        setRequests((prev) => prev.filter((r) => r._id !== id));
        toast.success("Request deleted");
      }
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleStatusChange = async (req, newStatus) => {
    try {
      await axiosSecure.patch(`/requests/${req._id}`, {
        status: newStatus,
      });

      setRequests((prev) =>
        prev.map((r) =>
          r._id === req._id ? { ...r, status: newStatus } : r
        )
      );

      toast.success("Status updated");
    } catch {
      toast.error("Status update failed");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { _id, createdAt, ...updateData } = editingRequest;

      await axiosSecure.patch(`/requests/${_id}`, updateData);

      setRequests((prev) =>
        prev.map((r) =>
          r._id === _id ? { ...r, ...updateData } : r
        )
      );

      toast.success("Request updated");
      setEditingRequest(null);
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
     
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          All Donation Requests
        </h1>
        <p className="text-sm text-gray-500">
          Manage and oversee all blood donation requests
        </p>
      </div>

      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search recipient or district..."
          className="w-full md:w-1/2 px-4 py-2.5 rounded-xl  bg-gray-50 focus:ring-2 focus:ring-red-400 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="w-full md:w-1/4 px-4 py-2.5 rounded-xl  bg-gray-50 focus:ring-2 focus:ring-red-400 outline-none"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="in progress">In Progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      
      <div className="overflow-x-auto rounded-xl ">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-4 text-left">Recipient</th>
              <th className="px-6 py-4 text-left">Location</th>
              <th className="px-6 py-4 text-left">Date</th>
              <th className="px-6 py-4 text-left">Blood</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {loading ? (
              <tr>
                <td colSpan="6" className="py-10 text-center text-gray-400">
                  <Loader></Loader>
                </td>
              </tr>
            ) : (
              requests.map((req) => (
                <tr key={req._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">
                    {req.requesterName}
                  </td>
                  <td className="px-6 py-4">{req.district}</td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(req.createdAt).toLocaleDateString()}
                    <div className="text-xs">
                      {new Date(req.createdAt).toLocaleTimeString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-semibold">
                      {req.bloodGroup}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={req.status}
                      onChange={(e) =>
                        handleStatusChange(req, e.target.value)
                      }
                      className={`px-3 py-1 rounded-full text-xs font-semibold capitalize border outline-none ${statusColors[req.status]}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="in progress">In Progress</option>
                      <option value="done">Done</option>
                      <option value="canceled">Canceled</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 flex gap-3 text-lg">
                    <button
                      onClick={() => setEditingRequest(req)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(req._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>

                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    
      <div className="flex justify-between items-center mt-6">
        <p className="text-sm text-gray-500">
          Page {page} of {totalPages}
        </p>
        <div className="flex gap-2">
          <button
            className="px-4 py-2 rounded-lg border text-sm disabled:opacity-50"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Prev
          </button>
          <button
            className="px-4 py-2 rounded-lg border text-sm disabled:opacity-50"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>

      
      {editingRequest && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 relative">
            <button
              onClick={() => setEditingRequest(null)}
              className="absolute top-4 right-4 text-gray-400"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-5">
              Edit Donation Request
            </h2>

            <form onSubmit={handleUpdate} className="space-y-4">
              <input
                type="text"
                value={editingRequest.requesterName}
                onChange={(e) =>
                  setEditingRequest({
                    ...editingRequest,
                    requesterName: e.target.value,
                  })
                }
                className="w-full px-4 py-2 rounded-lg border bg-gray-50"
                placeholder="Recipient Name"
                required
              />

              <input
                type="text"
                value={editingRequest.district}
                onChange={(e) =>
                  setEditingRequest({
                    ...editingRequest,
                    district: e.target.value,
                  })
                }
                className="w-full px-4 py-2 rounded-lg border bg-gray-50"
                placeholder="District"
                required
              />

              <input
                type="text"
                value={editingRequest.bloodGroup}
                onChange={(e) =>
                  setEditingRequest({
                    ...editingRequest,
                    bloodGroup: e.target.value,
                  })
                }
                className="w-full px-4 py-2 rounded-lg border bg-gray-50"
                placeholder="Blood Group"
                required
              />

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingRequest(null)}
                  className="px-4 py-2 rounded-lg bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-red-500 text-white"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllRequests;
