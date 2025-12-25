import { XCircle } from "lucide-react";
import { Link } from "react-router-dom";

const PaymentCancel = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-rose-100 px-4">
      <div className="bg-white max-w-md w-full rounded-2xl shadow-xl p-8 text-center">
        
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <XCircle className="w-20 h-20 text-red-500" />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Payment Cancelled
        </h1>

        {/* Description */}
        <p className="text-gray-600 mb-6">
          Your payment was not completed.  
          Don’t worry — no money has been charged.
        </p>

        {/* Info Box */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
          <p className="text-sm text-red-700">
             You can try again or return to the home page.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <Link
            to="/donate"
            className="btn bg-red-600 hover:bg-red-700 text-white rounded-xl"
          >
            Try Again
          </Link>

          <Link
            to="/"
            className="btn btn-outline border-red-600 text-red-600 hover:bg-red-50 rounded-xl"
          >
            Go to Home
          </Link>
        </div>

      </div>
    </div>
  );
};

export default PaymentCancel;
