import React, { useContext } from 'react';
import useAxios from '../../hooks/useAxios';
import { AuthContext } from '../../Context/AuthContext/AuthContext';

const Donate = () => {
    const axiosInstance = useAxios();
    const { user } = useContext(AuthContext);

    const handleCheckout = (e) => {
        e.preventDefault();
        const donateAmount = e.target.donateAmount.value;
        const donorEmail = user?.email;
        const donorName = user?.displayName;

        const formData = { donateAmount, donorEmail, donorName };

        axiosInstance.post("/create-payment-checkout", formData)
            .then(res => {
                console.log(res.data);
                window.location.href = res.data.url;
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-white  to-gray-50 p-4">
            <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-10 max-w-md w-full">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Donate</h2>
                <p className="text-center text-gray-600 mb-6">
                    Your donation helps us continue our mission. Enter the amount and donate securely.
                </p>
                <form onSubmit={handleCheckout} className="flex flex-col gap-4">
                    <input
                        type="text"
                        name="donateAmount"
                        placeholder="Amount ৳"
                        className="input px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-400 focus:outline-none"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-red-600 text-white p-3 rounded-lg font-semibold hover:bg-red-700"
                    >
                        Donate Now
                    </button>
                </form>
                <p className="text-center text-gray-500 mt-6 text-sm">
                    Secure payments powered by Stripe
                </p>
            </div>
        </div>
    );
};

export default Donate;
