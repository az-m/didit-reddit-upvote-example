import { auth } from "@/auth";
import { db } from "@/db";
import { notFound } from "next/navigation";

export default async function Profile({ params }) {
  const session = await auth();
  const thisProfile = parseInt((await params).userId);

  if (session.user.id !== thisProfile) {
    notFound();
  }

  return <></>;
}
