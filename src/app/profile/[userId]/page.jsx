import { auth } from "@/auth";
import { db } from "@/db";
import { notFound } from "next/navigation";
import { UserPostList } from "@/components/UserPostList";
import Link from "next/link";

export default async function Profile({ params, searchParams }) {
  const session = await auth();
  const thisProfile = parseInt((await params).userId);

  if (!session || session.user.id !== thisProfile) {
    notFound();
  }

  const query = await searchParams;
  console.log(query);
  let posts, comments;

  if (Object.keys(query).length === 0) {
    posts = true;
  } else {
    posts = query.posts;
  }

  comments = query.comments;

  return (
    <>
      <div className="flex justify-center gap-4 py-5 text-2xl">
        <Link href={`?posts=true`} className={posts && `text-pink-500`}>
          My Posts
        </Link>
        <Link href={`?comments=true`} className={comments && `text-pink-500`}>
          My Comments
        </Link>
      </div>
      {posts && <UserPostList userId={session.user.id} />}
    </>
  );
}
