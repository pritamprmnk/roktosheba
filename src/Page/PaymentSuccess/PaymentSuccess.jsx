import { CheckCircle } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { useEffect } from "react";

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("session_id");

    const axiosInstance = useAxios();
    useEffect(()=>{
        axiosInstance.post(`/success-payment?session_id=${sessionId}`)
        .then(res=>{
            console.log(res.data)
        })
    },[axiosInstance, sessionId])
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 px-4">
      <div className="bg-white max-w-md w-full rounded-2xl shadow-xl p-8 text-center">
        
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <CheckCircle className="w-20 h-20 text-green-500" />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Payment Successful
        </h1>

        {/* Description */}
        <p className="text-gray-600 mb-6">
          Thank you for your generous donation.  
          Your payment has been processed successfully.
        </p>

        {/* Info Card */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
          <p className="text-sm text-green-700">
             Your contribution helps save lives through blood donation.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <Link
            to="/"
            className="btn bg-green-600 hover:bg-green-700 text-white rounded-xl"
          >
            Go to Home
          </Link>

          <Link
            to="/donate"
            className="btn btn-outline border-green-600 text-green-600 hover:bg-green-50 rounded-xl"
          >
            Donate Again
          </Link>
        </div>

      </div>
    </div>
  );
};

export default PaymentSuccess;
