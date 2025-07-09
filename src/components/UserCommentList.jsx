import Link from "next/link";
import { db } from "@/db";

export async function UserCommentList({ userId }) {
  const { rows: comments } = await db.query(
    `SELECT a.id, a.body, a.created_at, posts.title AS post_title, posts.id AS post_id, users1.name, users.name AS reply_to
     FROM comments a
     JOIN posts ON a.post_id = posts.id
     JOIN users AS users1 ON a.user_id = users1.id
     LEFT JOIN comments b ON a.parent_comment_id = b.id
     LEFT JOIN users ON b.user_id = users.id
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
                className="text-md font-semibold hover:text-pink-500"
              >
                {comment.post_title}
              </Link>
              <p className="text-zinc-700 dark:text-zinc-400 text-sm">
                {comment.name}{" "}
                {!comment.reply_to ? `commented ` : `replied to `}
                <span className="text-foreground dark:group-hover/text:text-background">
                  {comment.reply_to}{" "}
                </span>
                <span className="text-xs">{parseDate(comment.created_at)}</span>
              </p>
              <p>{comment.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
