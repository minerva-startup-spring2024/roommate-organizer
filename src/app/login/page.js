import { login, signup } from "./actions";
import "./page.css";

export default function LoginPage() {
  return (
    <div className="loginPage">
      {" "}
      {/* Added class to apply page styles */}
      <h1 className="text-2xl text-center mb-6">Login</h1>
      <form id="loginForm">
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="loginInput"
        />
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="loginInput"
        />
        <button className="loginButton" formAction={login}>
          Log in
        </button>
        <button className="loginButton" formAction={signup}>
          Sign up
        </button>
      </form>
    </div>
  );
}
