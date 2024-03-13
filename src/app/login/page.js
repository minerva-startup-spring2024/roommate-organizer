"use client";

import HouseIcon from "@mui/icons-material/House";
import Link from "next/link";
import { useState } from "react";
import { login } from "./actions";
import "./page.css";

export default function LoginPage() {
  const [error, setError] = useState();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleLogin = async (event) => {
    event.preventDefault();
    const loginError = await login(formData);
    if (loginError) {
      setError(loginError);
    }
  };

  return (
    <div className="loginPage">
      <div className="leftSide">
        <p className="welcomeText">ROOMMATE ORGANIZER</p>
        <HouseIcon style={{ fontSize: "200px", color: "#fff" }} />
      </div>
      <div className="rightSide">
        <form id="loginForm" onSubmit={handleLogin}>
          <h1 className="loginTitle">Sign In</h1>
          <div className="inputContainer">
            <input
              className="loginInput"
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
            {/* Add an icon inside the input or as a sibling element */}
          </div>
          <div className="inputContainer">
            <input
              className="loginInput"
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
            {/* Add an icon inside the input or as a sibling element */}
          </div>
          <div>{error}</div>
          <button type="submit" className="signUpButton">
            LOG IN
          </button>
          <div className="alreadyUser">
            Not yet a user?{" "}
            <Link className="loginLink" href="sign-up">
              SIGN UP
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
