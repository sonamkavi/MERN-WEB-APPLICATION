import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      console.log(" Sending Login Request:", { email, password });

      // Send login request to backend
      const response = await axios.post(
        "http://localhost:5000/api/login",
        { email, password },
        { withCredentials: true }
      );

      console.log(" Login Successful, Token Received:", response.data.token);

      //  Store token & user data in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      //  Redirect to Dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error(" Login Error:", err.response?.data || err.message);
      setError("Invalid credentials, please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <div className="login-links">
          <p className="forgot-password" onClick={() => navigate("/forgot-password")}>
            Forgot Password?
          </p>
          <p className="signup-link">
            Don't have an account? <span onClick={() => navigate("/register")}>Sign Up</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
