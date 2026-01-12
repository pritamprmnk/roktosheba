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
import DashboardLayout from "./components/DashboardLayout/DashboardLayout.jsx";
import MainDashboard from "./Page/Dashboard/MainDashboard/MainDashboard.jsx";
import AddRequest from "./Page/Dashboard/AddRequest/AddRequest.jsx";
import AllUsers from "./Page/Dashboard/AllUsers/AllUsers.jsx";
import PrivetRoutes from "./Routes/PrivetRoutes.jsx";
import MyRequests from "./Page/Dashboard/MyRequests/MyRequests.jsx";
import AllRequests from "./Page/Dashboard/AllRequests/AllRequests.jsx";
import Profile from "./Page/Dashboard/Profile/Profile.jsx";

import Donate from "./Page/Donate/Donate.jsx";
import PaymentSuccess from "./Page/PaymentSuccess/PaymentSuccess.jsx";
import PaymentCancel from "./Page/PaymentCancel/PaymentCancel.jsx";
import SearchRequest from "./Page/SearchRequest/SearchRequest.jsx";
import About from "./Page/About/About.jsx";
import Contact from "./Page/Contact/Contact.jsx";
import PrivacyPolicy from "./Page/PrivacyPolicy/PrivacyPolicy.jsx";
import TermsOfService from "./Page/TermsOfService/TermsOfService.jsx";

import FAQs from "./Page/FAQs/FAQs.jsx";

import Newsletter from "./components/Newsletter/Newsletter.jsx";
import AllDonorRequest from "./Page/AllDonorRequest/AllDonorRequest.jsx";


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

    { path: "login", 
      Component: Login 
    },

    { path: "signup", 
      Component: Signup 
    },

    { path: "forgot", 
      Component: Forgot 
    },

    { path: "donate", 
      Component: Donate 
    },
    { path: "searchrequest", 
      Component: SearchRequest 
    },

    { path: "payment-success", 
      Component: PaymentSuccess 
    },
    
    { 
      path: "payment-cancel", 
      Component: PaymentCancel 
    },
    { 
      path: "about", 
      Component: About 
    },
    { 
      path: "contact", 
      Component: Contact 
    },
    { 
      path: "privacypolicy", 
      Component: PrivacyPolicy 
    },
    { 
      path: "termsofservice", 
      Component: TermsOfService 
    },
    { 
      path: "faqs", 
      Component: FAQs 
    },
    { 
      path: "newsletter", 
      Component: Newsletter
    },
    { 
      path: "alldonorrequest", 
      Component: AllDonorRequest
    },
  ],
},

  {
    path: "/dashboard",
    element: <PrivetRoutes><DashboardLayout /></PrivetRoutes>,
    children: [
      {
        index: true,
        Component: MainDashboard,
      },
      {
        path:"/dashboard/profile",
        element: <PrivetRoutes><Profile></Profile></PrivetRoutes>
      },
      {
        path:"add-request",
        element: <AddRequest></AddRequest>
      },
      {
        path:"all-users",
        element: <AllUsers></AllUsers>
      },
      {
        path:"my-requests",
        element: <MyRequests></MyRequests>
      },
      {
        path:"all-requests",
        element: <AllRequests></AllRequests>
      },
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
