"use client";

import HouseIcon from "@mui/icons-material/House";
import { useState } from "react";
import { signup } from "./actions";
import "./page.css";

export default function LoginPage() {
  const [error, setError] = useState();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSignUp = async (event) => {
    event.preventDefault();
    const signUpError = await signup(formData);
    if (signUpError) {
      setError(signUpError);
    }
  };

  return (
    <div className="loginPage">
      <div className="leftSide">
        <p className="welcomeText">WELCOME!</p>
        <HouseIcon style={{ fontSize: "200px", color: "#fff" }} />
      </div>
      <div className="rightSide">
        <form id="loginForm" onSubmit={handleSignUp}>
          <h1 className="loginTitle">Get Started</h1>
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
            SIGN UP
          </button>
          {/* <div className="alreadyUser">
            Already a user?{" "}
            <Link className="loginLink" href="/login">
              LOG IN
            </Link>
          </div> */}
        </form>
      </div>
    </div>
  );
}
