"use client";

import { saveComment } from "@/actions/comments";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { CommentFormButton } from "./CommentFormButton";

export function CommentForm({ postId, parentCommentId }) {
  const [state, dispatch] = useFormState(saveComment, {
    postId,
    parentCommentId,
  });
  const boundDispatch = dispatch.bind({ postId, parentCommentId });
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    if (state.success) {
      setOpen(false);
    }
  }, [state.success]);

  return (
    <div className="ml-4">
      <button
        onClick={() => setOpen(!isOpen)}
        className="text-foreground opacity-50"
      >
        {isOpen ? "Close" : "Reply"}
      </button>
      {isOpen ? (
        <>
          <form action={boundDispatch} className="flex flex-col space-y-3">
            <textarea
              name="comment"
              className="bg-zinc-200 p-3 rounded-sm dark:text-black"
              placeholder="Type your comment..."
            />
            <CommentFormButton />
          </form>
        </>
      ) : null}
    </div>
  );
}
