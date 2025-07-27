import { useState } from "react";
import axios from "axios";
import "./Register.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirstname] = useState("");

  const handleRegister = async () => {
    await axios.post(`${process.env.REACT_APP_BACKEND_URL}users/register/`, {
      email,
      first_name,
      password,
    });
    window.location.href = "/login";
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Register</h2>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="First name"
          value={first_name}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
}