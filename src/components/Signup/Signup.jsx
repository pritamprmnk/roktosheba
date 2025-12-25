import React, { use, useEffect, useState } from 'react';
import { Await, Link, useNavigate } from 'react-router';
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import toast from 'react-hot-toast';
import axios, { Axios } from 'axios';

const Signup = () => {
  const { createUser, updateUserProfile } = use(AuthContext);
  const navigate = useNavigate();

  const [passwordError, setPasswordError] = useState("");

  const [upazilas, setUpazilas] = useState([])
  const [districts, setDistricts] = useState([])
  const [district, setDistrict] = useState("")
  const [upazila, setUpazila] = useState("")

  useEffect(()=>{
      axios.get("./upazila.json")
    .then(res=>{
      setUpazilas(res.data.upazilas)
    })

    axios.get("./districts.json")
    .then(res=>{
      setDistricts(res.data.districts)
    })
  },[])

  console.log(upazila);

  const handleSignup = async (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const photourl = event.target.photourl;
    const file = photourl.files[0]
    const email = event.target.email.value;
    const password = event.target.password.value;
    const blood = event.target.blood.value;


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
      blood,
      district,
      upazila,

    }

    console.log(formData);

    setPasswordError("");

    createUser(email, password)
      .then(() => updateUserProfile(name, mainPhotoUrl))
      .then(() => {
        toast.success("Account created successfully ");
        axios.post("https://rokto-sheba-server-mauve.vercel.app/users", formData)
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
  <span className="text-gray-700 font-medium">Blood Group</span>
  <select
    name="blood"
    defaultValue=""
    required
    className="w-full border rounded-lg px-4 py-3 mt-2 mb-4 focus:outline-none focus:border-red-400 text-gray-800"
  >
    <option value="" disabled>
      Choose Blood Group
    </option>
    <option value="A+">A+</option>
    <option value="A-">A-</option>
    <option value="B+">B+</option>
    <option value="B-">B-</option>
    <option value="AB+">AB+</option>
    <option value="AB-">AB-</option>
    <option value="O+">O+</option>
    <option value="O-">O-</option>
  </select>
</label>

<label className="block mb-3">
  <span className="text-gray-700 font-medium">District</span>
  <select
    value={district}
    onChange={(e) => setDistrict(e.target.value)}
    required
    className="w-full border rounded-lg px-4 py-3 mt-2 mb-4 focus:outline-none focus:border-red-400 text-gray-800"
  >
    <option value="" disabled>
      Select your District
    </option>
    {
      districts.map(d => (
        <option key={d.id} value={d.name}>
          {d.name}
        </option>
      ))
    }
  </select>
</label>



<label className="block mb-3">
  <span className="text-gray-700 font-medium">Upazila</span>
  <select
    value={upazila}
    onChange={(e) => setUpazila(e.target.value)}
    required
    className="w-full border rounded-lg px-4 py-3 mt-2 mb-4 focus:outline-none focus:border-red-400 text-gray-800"
  >
    <option value="" disabled>
      Select your Upazila
    </option>
    {
      upazilas.map(u => (
        <option key={u.id} value={u.name}>
          {u.name}
        </option>
      ))
    }
  </select>
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
