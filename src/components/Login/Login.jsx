import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { signInUser, } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogIn = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    signInUser(email, password)
      .then(() => {
        event.target.reset();
        navigate("/");
      })
      .catch(() => {
        setError("Invalid email or password!");
      });
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        <h2 className="text-2xl font-bold text-center mb-2 text-red-500">
          Login to Your Account
        </h2>

        {error && (
          <p className="text-red-500 text-center mb-3">{error}</p>
        )}

        <form onSubmit={handleLogIn}>
          <label className="text-gray-700 font-medium">Email</label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            className="w-full border rounded-lg px-4 py-3 mt-2 mb-4 focus:outline-none focus:border-red-400 text-gray-800"
            required
          />

          <label className="text-gray-700 font-medium">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="w-full border rounded-lg px-4 py-3 mt-2 mb-4 focus:outline-none focus:border-red-400 text-gray-800"
            required
          />

                <Link
                    className="text-sm text-teal-600 mb-4 mt-2 inline-block"
                    to="/forgot"
                    state={{}}>Forgot Password?
                </Link>


          <button
            type="submit"
            className="w-full mt-2 bg-red-500 text-white p-3 rounded-lg font-semibold hover:bg-red-600 transition"
          >
            Login
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="px-2 text-gray-500 text-sm">Or continue with</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <p className="text-center text-sm text-gray-500 mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-red-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
