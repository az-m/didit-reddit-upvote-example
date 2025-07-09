"use client";

import { useFormStatus } from "react-dom";

export function CommentFormButton() {
  const { pending, data, method, action } = useFormStatus();

  return (
    <button
      type="submit"
      className="bg-pink-600 py-2 px-3 rounded-sm text-button"
      disabled={pending}
    >
      {pending ? "Submitting..." : "Submit"}
    </button>
  );
}
