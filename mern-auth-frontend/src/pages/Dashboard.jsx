import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("🔹 Retrieved Token from Local Storage:", token);

        if (!token) {
          console.log(" No token found, redirecting to login...");
          navigate("/");
          return;
        }

        // Send request with Authorization header
        const response = await axios.get("http://localhost:5000/api/user", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        console.log("User Data Fetched Successfully:", response.data);
        setUser(response.data);

      } catch (error) {
        console.error("Error Fetching User Data:", error.response?.data || error.message);
        navigate("/");
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token on logout
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-box">
        <h2>Dashboard</h2>
        {user ? (
          <>
            <p>Welcome, <b>{user.username}</b>! 🎉</p>
            <p>Email: {user.email}</p>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
