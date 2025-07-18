import { auth } from "@/auth";
import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { LoginButton } from "@/components/LoginButton";
import Link from "next/link";

export default async function Home() {
  const session = await auth();

  async function savePost(formData) {
    "use server";
    const content = formData.get("content");
    const title = formData.get("title");
    const userId = session?.user?.id;
    if (!userId) {
      throw new Error("You need to login");
    }

    await db.query(
      "INSERT INTO posts (title, body, user_id) VALUES ($1, $2, $3)",
      [title, content, userId]
    );

    revalidatePath("/");
    redirect("/");
  }

  if (!session) {
    return (
      <div className="max-w-(--breakpoint-lg) mx-auto p-4 mt-10">
        You need to login to create a post <LoginButton />
      </div>
    );
  }

  return (
    <div className="max-w-(--breakpoint-lg) mx-auto p-4 bg-zinc-800 dark:border dark:border-zinc-300 mt-10 rounded-xl text-foreground-on-dark">
      <div className="grid grid-cols-2">
        <h2 className="text-3xl mb-4">Add a new post</h2>
        <Link href="/" className="justify-self-end font-bold">
          X
        </Link>
      </div>
      <form action={savePost} className="flex flex-col space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Post title..."
          className="px-3 py-2 rounded-sm"
        />
        <textarea
          name="content"
          className="px-3 py-2 rounded-sm"
          placeholder="Post content"
        />
        <button className="bg-green-400 px-4 py-2 text-xl text-black rounded-sm">
          Submit post
        </button>
      </form>
    </div>
  );
}
