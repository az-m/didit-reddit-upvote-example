import Link from "next/link";
import { db } from "@/db";

export async function UserCommentList({ userId }) {
  const { rows: comments } = await db.query(
    `SELECT a.id, a.body, a.created_at, posts.title AS post_title, posts.id AS post_id, users.name, users_c.name AS reply_to, users_p.name AS poster
     FROM comments a
     JOIN posts ON a.post_id = posts.id
     JOIN users ON a.user_id = users.id
     JOIN users AS users_p ON posts.user_id = users_p.id
     LEFT JOIN comments b ON a.parent_comment_id = b.id
     LEFT JOIN users AS users_c ON b.user_id = users_c.id
     WHERE a.user_id = $1
     ORDER BY a.created_at DESC`,
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
        {comments.map((comment) => (
          <li
            key={comment.id}
            className="p-4 flex space-x-6 hover:bg-zinc-200 rounded-lg group/text"
          >
            <div className="dark:group-hover/text:text-background">
              <Link
                href={`/post/${comment.post_id}`}
                className="lg:text-lg font-semibold hover:text-pink-500"
              >
                {comment.post_title}{" "}
                <span className="text-sm opacity-50">{comment.poster}</span>
              </Link>
              <p className="text-zinc-700 dark:text-zinc-400 text-sm lg:text-md">
                {comment.name}{" "}
                {!comment.reply_to ? `commented ` : `replied to `}
                <span className="text-foreground dark:group-hover/text:text-background">
                  {comment.reply_to}{" "}
                </span>
                <span className="text-xs">{parseDate(comment.created_at)}</span>
              </p>
              <p className="lg:text-lg">{comment.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
