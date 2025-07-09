import Link from "next/link";
import { Vote } from "./Vote";
import { db } from "@/db";

export async function UserPostList({ userId }) {
  const { rows: posts } = await db.query(
    `SELECT posts.id, posts.title, posts.body, posts.created_at, users.name, 
    COALESCE(SUM(votes.vote), 0) AS vote_total
     FROM posts
     JOIN users ON posts.user_id = users.id
     LEFT JOIN votes ON votes.post_id = posts.id
     WHERE users.id = $1
     GROUP BY posts.id, users.name
     ORDER BY created_at DESC`,
    [userId]
  );

  function parseDate(d) {
    let date = new Date(d);
    if (d) {
      const dd = date.getDate();
      const mm = date.getMonth() + 1;
      const yyyy = date.getFullYear();
      date = `${yyyy}-${mm}-${dd}`;
    } else {
      date = "";
    }
    return date;
  }

  return (
    <>
      <ul className="max-w-(--breakpoint-lg) mx-auto p-4 mb-4">
        {posts.map((post) => (
          <li
            key={post.id}
            className="py-4 flex space-x-6 hover:bg-zinc-200 rounded-lg dark:hover:text-background"
          >
            <Vote postId={post.id} votes={post.vote_total} />
            <div>
              <Link
                href={`/post/${post.id}`}
                className="text-3xl hover:text-pink-500"
              >
                {post.title}
              </Link>
              <p className="text-zinc-700 dark:text-zinc-400">
                posted by {post.name}{" "}
                <span className="text-xs">{parseDate(post.created_at)}</span>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
