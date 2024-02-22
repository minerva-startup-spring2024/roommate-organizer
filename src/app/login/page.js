import { login, signup } from "./actions";

export default function LoginPage() {
  return (
    <>
      <h1 className="text-2xl text-center mb-6">Login</h1>
      <form>
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required />
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required />
        <button formAction={login}>Log in</button>
        <button formAction={signup}>Sign up</button>
      </form>
    </>
  );
}
