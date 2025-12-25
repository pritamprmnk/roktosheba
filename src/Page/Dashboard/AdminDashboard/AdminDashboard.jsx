import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  DollarSign,
  Droplet
} from "lucide-react";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalFunding: 0,
    totalRequests: 0
  });

  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axiosSecure.get("/admin/stats").then(res => {
      setStats(res.data);
    });

    axiosSecure.get("/admin/recent-activities").then(res => {
      setActivities(res.data);
    });
  }, [axiosSecure]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      
      <div className="mb-6">
        <h2 className="text-3xl font-bold">
          Welcome back, {user?.displayName || "Administrator"} 👋
        </h2>
        <p className="text-gray-500">
          Here is the latest update on the blood donation activities and platform health.
        </p>
      </div>

    
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        <div className="bg-white p-5 rounded-xl shadow flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Total Users</p>
            <h3 className="text-2xl font-bold">{stats.totalUsers}</h3>
          </div>
          <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
            <Users />
          </div>
        </div>

       
        <div className="bg-white p-5 rounded-xl shadow flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Total Funding</p>
            <h3 className="text-2xl font-bold">${stats.totalFunding}</h3>
          </div>
          <div className="p-3 bg-green-100 text-green-600 rounded-lg">
            <DollarSign />
          </div>
        </div>

        
        <div className="bg-white p-5 rounded-xl shadow flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Total Blood Requests</p>
            <h3 className="text-2xl font-bold">{stats.totalRequests}</h3>
          </div>
          <div className="p-3 bg-red-100 text-red-600 rounded-lg">
            <Droplet />
          </div>
        </div>
      </div>



<div className="bg-white rounded-2xl shadow-sm  -gray-100 overflow-hidden">
  
  <div className="flex items-center justify-between px-6 py-4 ">
    <div>
      <h3 className="text-lg font-semibold text-gray-800">
        Recent Activity
      </h3>
      <p className="text-sm text-gray-500">
        Latest actions from donors & admins
      </p>
    </div>

    <Link
      to="/dashboard/all-requests"
      className="text-sm font-medium text-red-500 hover:text-red-600"
    >
      View All →
    </Link>
  </div>


  <div className="overflow-x-auto">
    <table className="w-full text-sm">
      
      <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
        <tr>
          <th className="px-6 py-4 text-left font-semibold">User / Donor</th>
          <th className="px-6 py-4 text-left font-semibold">Action</th>
          <th className="px-6 py-4 text-left font-semibold">Date</th>
          <th className="px-6 py-4 text-left font-semibold">Status</th>
        </tr>
      </thead>

      
      <tbody className="divide-y">
        {activities.length === 0 && (
          <tr>
            <td
              colSpan="4"
              className="px-6 py-10 text-center text-gray-400"
            >
              No recent activity found
            </td>
          </tr>
        )}

        {activities.map(activity => (
          <tr
            key={activity._id}
            className="hover:bg-gray-50 transition"
          >
           
            <td className="px-6 py-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold">
                {activity.userName?.charAt(0)}
              </div>
              <span className="font-medium text-gray-800">
                {activity.userName}
              </span>
            </td>

            
            <td className="px-6 py-4 text-gray-600">
              {activity.action}
            </td>

            
            <td className="px-6 py-4 text-gray-500">
              {activity.date}
            </td>

           
            <td className="px-6 py-4">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold capitalize
                  ${
                    activity.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : activity.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
              >
                {activity.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

    </div>
  );
};

export default AdminDashboard;
