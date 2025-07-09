import { signOut } from "@/auth";

export function LogoutButton() {
  async function handleLogout() {
    "use server";
    await signOut();
  }

  return (
    <form action={handleLogout} className="inline">
      <button className="bg-button-bg text-button px-3 py-2 rounded-sm">
        Logout
      </button>
    </form>
  );
}
