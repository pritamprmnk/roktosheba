import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { user, signOutUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const handlesignout = () => {
    signOutUser();
    setDropdown(false);
  };

  const navLinkClass =
    "block px-3 py-2 text-gray-700 font-medium hover:text-red-600";

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/assets/blood.png"
            alt="roktosheba"
            className="w-9 h-9"
          />
          <h1 className="text-2xl font-bold">
            <span className="text-red-600">Rokto</span>Sheba
          </h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>

          {user && (
            <>

              <NavLink to="/dashboard" className={navLinkClass}>
                Dashboard
              </NavLink>
            </>
          )}
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-4 relative">
          {!user ? (
            <>
              <Link to="/login" className="font-medium text-gray-700">
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setDropdown(!dropdown)}
                className="flex items-center gap-2"
              >
                <img
                  src={user.mainPhotoUrl || "https://i.ibb.co/4pDNDk1/avatar.png"}
                  className="w-9 h-9 rounded-full"
                />
                <span className="font-medium">{user.displayName}</span>
              </button>

              {dropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={handlesignout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-6 pb-4 space-y-2">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>

          {user && (
            <>
              <NavLink to="/alltickets" className={navLinkClass}>
                All Tickets
              </NavLink>
              <NavLink to="/dashboard" className={navLinkClass}>
                Dashboard
              </NavLink>
            </>
          )}

          {!user ? (
            <>
              <Link to="/login" className={navLinkClass}>
                Login
              </Link>
              <Link to="/signup" className={navLinkClass}>
                Register
              </Link>
            </>
          ) : (
            <>
              <Link to="/myprofile" className={navLinkClass}>
                My Profile
              </Link>
              <button
                onClick={handlesignout}
                className="block w-full text-left px-3 py-2 text-red-600"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
