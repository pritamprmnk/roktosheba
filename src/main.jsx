import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Toaster } from "react-hot-toast"; 
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./layout/Root.jsx";
import Home from "./components/Home/Home.jsx";
import Login from "./components/Login/Login.jsx";
import Signup from "./components/Signup/Signup.jsx";
import AuthProvider from "./Context/AuthContext/AuthProvider.jsx";
import { AuthContext } from "./Context/AuthContext/AuthContext.jsx";


import { useContext } from "react";

import ErrorPage from "./Page/ErrorPage.jsx";
import Forgot from "./components/Forgot/Forgot.jsx";

function MyPostsWrapper() {
  const { user } = useContext(AuthContext);
  return <MyPosts userEmail={user?.email} />;
}

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "login", Component: Login },
      { path: "signup", Component: Signup },
      {path: "forgot", Component: Forgot }








    ],
  },

  {
    path: "*",
    Component: ErrorPage,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>

      <Toaster
        position="top-center"
        reverseOrder={false}
      />  

      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
