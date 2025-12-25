import React, { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import toast from "react-hot-toast";
import Loader from "../../../components/Loader/Loader";

const statusBadge = {
  active: "bg-green-100 text-green-700",
  blocked: "bg-red-100 text-red-700",
};

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    setLoading(true);
    axiosSecure
      .get("/users")
      .then((res) => setUsers(res.data))
      .catch(() => toast.error("Failed to load users"))
      .finally(() => setLoading(false));
  }, [axiosSecure, user]);

  const handleStatusChange = async (email, newStatus) => {
    try {
      const res = await axiosSecure.patch(
        `/user/status?email=${email}&status=${newStatus}`
      );

      if (res.data.modifiedCount > 0) {
        setUsers((prev) =>
          prev.map((u) =>
            u.email === email ? { ...u, status: newStatus } : u
          )
        );
        toast.success(`User ${newStatus}`);
      }
    } catch {
      toast.error("Status update failed");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm  p-6">

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          All Users
        </h2>
        <p className="text-sm text-gray-500">
          Manage user roles and account status
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl ">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-4 text-left">User</th>
              <th className="px-6 py-4 text-left">Role</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody className="">
            {loading ? (
              <tr>
                <td colSpan="4" className="py-10 text-center text-gray-400">
                  <Loader></Loader>
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr
                  key={u._id}
                  className="hover:bg-gray-50 transition"
                >
                 
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={u.mainPhotoUrl}
                        alt=""
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-800">
                          {u.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {u.email}
                        </p>
                      </div>
                    </div>
                  </td>

                 
                  <td className="px-6 py-4 capitalize">
                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                      {u.role}
                    </span>
                  </td>

                 
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                        statusBadge[u.status]
                      }`}
                    >
                      {u.status}
                    </span>
                  </td>

                 
                  <td className="px-6 py-4">
                    {u.status === "active" ? (
                      <button
                        onClick={() =>
                          handleStatusChange(u.email, "blocked")
                        }
                        className="px-4 py-1.5 rounded-lg bg-red-500 text-white text-xs hover:bg-red-600"
                      >
                        Block
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          handleStatusChange(u.email, "active")
                        }
                        className="px-4 py-1.5 rounded-lg bg-green-500 text-white text-xs hover:bg-green-600"
                      >
                        Activate
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
