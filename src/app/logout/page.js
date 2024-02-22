import { logout } from "./actions";

export default async function LogoutPage() {
  return (
    <form>
      <button formAction={logout}>Logout</button>
    </form>
  );
}
