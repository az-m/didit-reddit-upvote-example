import auth from "../app/middleware";
import { LoginButton } from "./LoginButton";
import { LogoutButton } from "./LogoutButton";
import Link from "next/link";

export async function UserInfo() {
  const session = await auth();

  return (
    <div>
      {session ? (
        <div>
          <Link href={`/profile/${session.user.id}`}>
            {session.user.name}{" "}
            <span className="text-xs text-zinc-400 mr-3">
              #{session.user.id}
            </span>
          </Link>
          <LogoutButton />
        </div>
      ) : (
        <div>
          <span className="mr-4">Welcome, Guest!</span>
          <LoginButton />
        </div>
      )}
    </div>
  );
}
