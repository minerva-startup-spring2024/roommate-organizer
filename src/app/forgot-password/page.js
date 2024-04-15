"use client";

import HouseIcon from "@mui/icons-material/House";
import { useState } from "react";
import GreyBeatLoader from "../_components/BeatLoaders/GreyBeatLoader";
import { forgotPassword } from "./actions"; 
import "./page.css";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [formData, setFormData] = useState({ email: "" });

  const handleForgotPassword = async (event) => {
    event.preventDefault();
    setLoading(true);
    const forgotPasswordError = await forgotPassword(formData.email);
    if (forgotPasswordError) {
      setError(forgotPasswordError);
    } else {
      setError("Password reset email sent. Check your inbox.");
    }
    setLoading(false);
  };

  return (
    <div className="loginPage">
      <div className="leftSide">
        <p className="welcomeText">Set New Password</p>
        <HouseIcon style={{ fontSize: "200px", color: "#fff" }} />
      </div>
      <div className="rightSide">
        <form id="loginForm" onSubmit={handleForgotPassword}>
          <h1 className="loginTitle">Forgot Password</h1>
          <div className="inputContainer">
            <input
              className="loginInput"
              id="email"
              name="email"
              type="email"
              placeholder="Enter account email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
           
          </div>
          <div>{error}</div>
          {loading ? (
            <GreyBeatLoader />
          ) : (
            <button type="submit" className="forgotPasswordButton">
              RESET PASSWORD
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
