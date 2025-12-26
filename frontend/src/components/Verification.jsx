import React, { useState } from "react";
import toast from "react-hot-toast";
import API from "../API";

const VerificationModal = ({ email, isOpen, onClose, onVerified }) => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length < 6) return toast.error("Enter full 6-digit code");

    setLoading(true);
    try {
      const res = await API.post("/auth/verifyemail", {
      email,  
      code,
    });

      const data =  res.data;
      if (data.success) {
        toast.success(data.message || "Email verified!");
        onVerified();
        onClose();
      } else {
        toast.error(data.message || "Verification failed");
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">

      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="relative bg-gray-900 rounded-2xl p-8 w-full max-w-md z-10 flex flex-col items-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-purple-400 text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-white mb-2">Verify Your Email</h2>
        <p className="text-gray-400 text-center mb-6">
          Enter the 6-digit code sent to <strong>{email}</strong>
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6">
          <div className="flex gap-3">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                className="w-12 h-12 text-center text-lg bg-gray-800 rounded-md border-2 border-gray-700 focus:border-purple-400 focus:ring-2 focus:ring-purple-600 transition-colors outline-none"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-4 bg-gradient-to-r from-purple-600 to-purple-400 text-white font-semibold rounded-full shadow-lg hover:shadow-purple-500/50 transition-all"
          >
            {loading ? "Verifying..." : "Verify Email"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerificationModal;
