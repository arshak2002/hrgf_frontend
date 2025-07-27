import { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}users/me/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch user:", err.response?.data || err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="profile-container">Loading...</div>;

  if (!user) return <div className="profile-container">Failed to load profile</div>;

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      <div className="profile-card">
        <p><strong>Name:</strong> {user.first_name || user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        {user.phone && <p><strong>Phone:</strong> {user.phone}</p>}
        <p><strong>Joined on:</strong> {new Date(user.date_joined).toLocaleDateString()}</p>
      </div>
    </div>
  );
}
