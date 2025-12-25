import { NavLink, Link } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Droplet,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext/AuthContext";

const Aside = () => {
  const { role, signOutUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  const handleLogout = () => {
    setOpen(false);
    signOutUser();
  };

  return (
    <>
      <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b sticky top-0 z-40">
        <Link to="/" className="text-xl font-extrabold text-red-500">
          Rokto<span className="text-gray-900">Sheba</span>
        </Link>
        <button onClick={() => setOpen(true)}>
          <Menu />
        </button>
      </div>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-50 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-[60]
          w-64 h-screen
          bg-white/90 backdrop-blur-xl
          border-r border-gray-200 shadow-xl
          transform transition-transform duration-300 ease-in-out
          flex flex-col
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:static lg:translate-x-0
        `}
      >
        <div className="px-6 py-6 border-b border-gray-200 flex items-center justify-between">
          <div>
            <Link to="/" className="text-2xl font-extrabold text-red-500">
              Rokto<span className="text-gray-900">Sheba</span>
            </Link>
            <p className="text-[11px] uppercase tracking-[0.2em] text-gray-400 mt-1">
              {role ? `${role} Panel` : "Panel"}
            </p>
          </div>


          <button onClick={() => setOpen(false)} className="lg:hidden">
            <X />
          </button>
        </div>

        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
          <NavItem
            to="/dashboard"
            icon={LayoutDashboard}
            onClick={() => setOpen(false)}
          >
            Dashboard
          </NavItem>

          <NavItem
            to="/dashboard/profile"
            icon={LayoutDashboard}
            onClick={() => setOpen(false)}
          >
            Profile
          </NavItem>

          {role === "Donor" && (
            <NavItem
              to="/dashboard/add-request"
              icon={Users}
              onClick={() => setOpen(false)}
            >
              Add Request
            </NavItem>
          )}

          {role === "Admin" && (
            <NavItem
              to="/dashboard/all-users"
              icon={Users}
              onClick={() => setOpen(false)}
            >
              All Users
            </NavItem>
          )}

          {role === "Donor" && (
            <NavItem
              to="/dashboard/my-requests"
              icon={Droplet}
              onClick={() => setOpen(false)}
            >
              My Requests
            </NavItem>
          )}

          {(role === "Admin" || role === "Volunteer") && (
            <NavItem
              to="/dashboard/all-requests"
              icon={Droplet}
              onClick={() => setOpen(false)}
            >
              All Requests
            </NavItem>
          )}
        </nav>

        <div className="px-3 py-4 border-t border-gray-200 bg-white">
          <button
            onClick={handleLogout}
            className="group flex items-center gap-3 w-full px-4 py-3 rounded-xl
              text-red-600 font-semibold bg-red-50
              hover:bg-red-500 hover:text-white transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Aside;

const NavItem = ({ to, icon: Icon, children, onClick }) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition
        ${
          isActive
            ? "bg-red-500 text-white shadow-md"
            : "text-gray-700 hover:bg-gray-100"
        }`
      }
    >
      <Icon size={18} />
      {children}
    </NavLink>
  );
};
