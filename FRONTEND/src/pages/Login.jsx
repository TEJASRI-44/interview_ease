import { useState } from "react";
import React from "react";
import axios from "axios";
import "../styles/Login.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 

    try {
      const response = await axios.post(
        `http://localhost:8080/api/users/login?email=${form.email}&password=${form.password}`
      );

      if (response.status === 200 && response.data === "Login successful!") { 
        alert("Login Successful!");

        // If using JWT authentication, store the token
        // localStorage.setItem("token", response.data.token);

       // Redirect to another page (e.g., dashboard)
       
       setTimeout(() => {
        window.location.href = "/Roleselection";
      }, 1000);
      } else {
        alert("Invalid Email or Password");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert(error.response?.data || "Error during login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          value={form.email} 
          onChange={handleChange} 
          required
        />
        
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          value={form.password} 
          onChange={handleChange} 
          required
        />
        
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
