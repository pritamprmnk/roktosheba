import React, { useContext } from "react";

import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import AdminDashboard from "../AdminDashboard/AdminDashboard";
import DonorDashboard from "../DonorDashboard/DonorDashboard";
import VolunteerDashboard from "../VolunteerDashboard/VolunteerDashboard";

const MainDashboard = () => {
  const { role } = useContext(AuthContext);

  if (role === "Admin") {
    return <AdminDashboard />;
  }

  if (role === "Volunteer") {
    return <VolunteerDashboard />;
  }

  // Default: Donor
  return <DonorDashboard />;
};

export default MainDashboard;
