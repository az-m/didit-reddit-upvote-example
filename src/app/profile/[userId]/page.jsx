import { auth } from "@/auth";
import { db } from "@/db";
import { notFound } from "next/navigation";
import { UserPostList } from "@/components/UserPostList";

export default async function Profile({ params }) {
  const session = await auth();
  const thisProfile = parseInt((await params).userId);

  if (!session || session.user.id !== thisProfile) {
    notFound();
  }

  return (
    <>
      <UserPostList userId={session.user.id} />
    </>
  );
}
