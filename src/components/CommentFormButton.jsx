"use client";

import { useFormStatus } from "react-dom";

export function CommentFormButton() {
  const { pending, data, method, action } = useFormStatus();

  return (
    <button
      type="submit"
      className="bg-pink-300 py-2 px-3 rounded-sm"
      disabled={pending}
    >
      {pending ? "Submitting..." : "Submit"}
    </button>
  );
}
