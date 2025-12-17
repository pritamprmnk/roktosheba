import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../Firebase/firebase.init";

const Signup = () => {
  const { createUser, signInWithGoogle } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validatePassword = (password) => {
    if (!/[A-Z]/.test(password)) return "At least one uppercase letter required";
    if (!/[a-z]/.test(password)) return "At least one lowercase letter required";
    if (password.length < 6) return "Password must be at least 6 characters";
    return "";
  };

  const handleSignup = async (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const photo = event.target.photo.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    const validationError = validatePassword(password);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const result = await createUser(email, password);
      const user = result.user;
        console.log("USER CREATED:", result.user);

      await updateProfile(user, {
        displayName: name,
        photoURL: photo,
      });
        console.log("PROFILE UPDATED");


      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        photoURL: photo,
      });
        console.log("FIRESTORE SAVED");


      navigate("/");
      
    } catch (error) {
  console.error("SIGNUP ERROR:", error.message);
  setError(error.message);
    }
  };

  const handleGoogleSignup = () => {
    signInWithGoogle()
      .then(() => navigate("/"))
      .catch(() => setError("Google signup failed!"));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        <h2 className="text-2xl font-bold text-center mb-2 text-red-500">
          Create Your Account
        </h2>

        {error && (
          <p className="text-red-500 text-center mb-3">{error}</p>
        )}

        <form onSubmit={handleSignup}>
          <label className="block mb-3">
            <span className="text-gray-700 font-medium">Full Name</span>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              required
              className="w-full border rounded-lg px-4 py-3 mt-2 mb-4 focus:outline-none focus:border-red-400 text-gray-800"
            />
          </label>

          <label className="block mb-3">
            <span className="text-gray-700 font-medium">Photo URL</span>
            <input
              type="text"
              name="photo"
              placeholder="Upload your photo url"
              required
              className="w-full border rounded-lg px-4 py-3 mt-2 mb-4 focus:outline-none focus:border-red-400 text-gray-800"
            />
          </label>

          <label className="block mb-3">
            <span className="text-gray-700 font-medium">Email Address</span>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="w-full border rounded-lg px-4 py-3 mt-2 mb-4 focus:outline-none focus:border-red-400 text-gray-800"
            />
          </label>

          <label className="block mb-3">
            <span className="text-gray-700 font-medium">Password</span>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              required
              className="w-full border rounded-lg px-4 py-3 mt-2 mb-4 focus:outline-none focus:border-red-400 text-gray-800"
            />
          </label>

          <button className="w-full mt-2 bg-red-500 text-white p-3 rounded-lg font-semibold hover:bg-red-600 transition">
            Sign Up
          </button>
        </form>

        <div className="my-4 text-center text-gray-400">OR</div>

        <button
          onClick={handleGoogleSignup}
          className="w-full border py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 text-black"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            className="w-5"
            alt="Google"
          />
          Login with Google
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-red-600">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Signup;
