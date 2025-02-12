import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages
    setError("");

    try {
      console.log(" Sending Password Reset Request:", email);

      // Send email request to backend
      const response = await axios.post("http://localhost:5000/api/forgot-password", { email });

      setMessage(response.data.message);
    } catch (err) {
      console.error(" Forgot Password Error:", err.response?.data || err.message);
      setError("Failed to send reset link. Try again.");
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <h2>Reset Password</h2>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleForgotPassword}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Send Reset Link</button>
        </form>
        <p className="login-link">
          <span onClick={() => navigate("/")}>Back to Login</span>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
