import React, { use, useState } from 'react';
import { Await, Link, useNavigate } from 'react-router';
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import toast from 'react-hot-toast';
import axios, { Axios } from 'axios';

const Signup = () => {
  const { createUser, signInWithGoogle, updateUserProfile } = use(AuthContext);
  const navigate = useNavigate();

  const [passwordError, setPasswordError] = useState("");

  const handleSignup = async (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const photourl = event.target.photourl;
    const file = photourl.files[0]
    const email = event.target.email.value;
    const password = event.target.password.value;


    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setPasswordError("Password must contain at least one uppercase letter");
      return;
    }
    if (!/[a-z]/.test(password)) {
      setPasswordError("Password must contain at least one lowercase letter");
      return;
    }

    const res = await axios.post(`https://api.imgbb.com/1/upload?key=06d66bd73a7d10b876fded8b788a7629`, {image:file},{
      headers:{
        "Content-Type":"multipart/form-data"
      }
    })

    const mainPhotoUrl = res.data.data.display_url

    const formData = {
      name,
      email,
      password,
      mainPhotoUrl,

    }

    setPasswordError("");

    createUser(email, password)
      .then(() => updateUserProfile(name, mainPhotoUrl))
      .then(() => {
        toast.success("Account created successfully ");
        axios.post("http://localhost:5000/users", formData)
        .then(res=>{
          console.log(res.data);
        })
        .catch(err=>{
          console.log(err);
        })
        event.target.reset();
        navigate("/");
      })
      .catch((error) => {
        let message = error.message;

        if (error.code === "auth/email-already-in-use") {
          message = "This email is already registered";
        } else if (error.code === "auth/invalid-email") {
          message = "Invalid email address";
        }

        toast.error(message);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(() => {
        toast.success("Logged in with Google");
        navigate("/");
      })
      .catch(() => {
        toast.error("Google login failed");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        <h2 className="text-2xl font-bold text-center mb-2 text-red-600">
          Create Your Account
        </h2>

        {passwordError && (
          <p className="text-red-500 text-center mb-3">
            {passwordError}
          </p>
        )}

        <form onSubmit={handleSignup}>
          <label className="block mb-3">
            <span className="text-gray-700 font-medium">Full Name</span>
            <input
              type="text"
              name="name"
              placeholder='Enter your name'
              required
              className="w-full border rounded-lg px-4 py-3 mt-2 mb-4 focus:outline-none focus:border-red-400 text-gray-800"
            />
          </label>

          <label className="block mb-3">
            <span className="text-gray-700 font-medium">Photo</span>
            <input
              type="file"
              name="photourl"
              placeholder='Upload your photo url'
              required
              className="w-full border rounded-lg px-4 py-3 mt-2 mb-4 focus:outline-none focus:border-red-400 text-gray-800"
            />
          </label>

          <label className="block mb-3">
            <span className="text-gray-700 font-medium">Email</span>
            <input
              type="email"
              name="email"
              placeholder='Enter your email'
              required
              className="w-full border rounded-lg px-4 py-3 mt-2 mb-4 focus:outline-none focus:border-red-400 text-gray-800"
            />
          </label>

          <label className="block mb-3">
            <span className="text-gray-700 font-medium">Password</span>
            <input
              type="password"
              name="password"
              placeholder='Enter your password'
              required
              className="w-full border rounded-lg px-4 py-3 mt-2 mb-4 focus:outline-none focus:border-red-400 text-gray-800"
            />
          </label>

          <button className="w-full bg-red-600 text-white p-3 rounded-lg font-semibold hover:bg-red-700">
            Sign Up
          </button>
        </form>

        <div className="my-4 text-center text-gray-400">OR</div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full border py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100"
        >
          <img src="/assets/google.png" className="w-5" alt="Google" />
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
