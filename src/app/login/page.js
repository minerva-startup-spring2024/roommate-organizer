import { login, signup } from "./actions";
import "./page.css";
import HouseIcon from "@mui/icons-material/House";

export default function LoginPage() {
  return (
    <div className="loginPage">
      <div className="leftSide">
        <p className="welcomeText">ROOMMATE ORGANIZER</p>
        <HouseIcon style={{ fontSize: "200px", color: "#fff" }} />
      </div>
      <div className="rightSide">
        <form id="loginForm">
          <h1 className="loginTitle">Get Started</h1>
          <div className="inputContainer">
            <input
              className="loginInput"
              id="fullname"
              name="fullname"
              type="text"
              placeholder="Full Name"
              required
            />
            {/* Add an icon inside the input or as a sibling element */}
          </div>
          <div className="inputContainer">
            <input
              className="loginInput"
              id="email"
              name="email"
              type="email"
              placeholder="Email ID"
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
              required
            />
            {/* Add an icon inside the input or as a sibling element */}
          </div>
          <button className="signUpButton" onClick={signup}>
            SIGN UP
          </button>
          <div className="alreadyUser">
            Already a user?{" "}
            <button className="loginButton" onClick={login}>
              LOG IN
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
