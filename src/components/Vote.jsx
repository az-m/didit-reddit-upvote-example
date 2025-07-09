import { db } from "@/db";
import auth from "../app/middleware";
import { revalidatePath } from "next/cache";
import { VoteButtons } from "./VoteButtons";
import { redirect } from "next/navigation";

async function getExistingVote(userId, postId) {
  const { rows: existingVotes } = await db.query(
    "SELECT * FROM votes WHERE user_id = $1 AND post_id = $2 LIMIT 1",
    [userId, postId]
  );

  return existingVotes?.[0];
}

async function handleVote(userId, postId, host, newVote) {
  // Check if the user has already voted on this post
  if (!userId) {
    // throw new Error("Cannot vote without being logged in");
    redirect(`${host}?err=true`);
  }

  const existingVote = await getExistingVote(userId, postId);

  if (existingVote) {
    if (existingVote.vote === newVote) {
      // User is toggling their vote, so remove it
      await db.query("DELETE FROM votes WHERE id = $1", [existingVote.id]);
    } else {
      // Update the existing vote
      await db.query("UPDATE votes SET vote = $1 WHERE id = $2", [
        newVote,
        existingVote.id,
      ]);
    }
  } else {
    // Insert a new vote
    await db.query(
      "INSERT INTO votes (user_id, post_id, vote, vote_type) VALUES ($1, $2, $3, 'post')",
      [userId, postId, newVote]
    );
  }

  revalidatePath(`/post/${postId}`);
}

export async function Vote({ postId, votes, host }) {
  const session = await auth();
  const existingVote = await getExistingVote(session?.user?.id, postId);

  async function upvote() {
    "use server";
    await handleVote(session?.user?.id, postId, host, 1);
  }

  async function downvote() {
    "use server";
    await handleVote(session?.user?.id, postId, host, -1);
  }

  return (
    <>
      <form className="flex items-center space-x-3 pl-3">
        <VoteButtons
          upvote={upvote}
          downvote={downvote}
          votes={votes}
          existingVote={existingVote}
        />
      </form>
    </>
  );
}
