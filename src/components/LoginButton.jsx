import { signIn } from "@/auth";

export function LoginButton() {
  async function handleLogin() {
    "use server";
    await signIn();
  }

  return (
    <form action={handleLogin} className="inline">
      <button className="bg-button-bg text-button px-3 py-2 rounded-sm">
        Login
      </button>
    </form>
  );
}
