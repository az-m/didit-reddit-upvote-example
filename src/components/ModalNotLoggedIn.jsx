import Link from "next/link";

export default function ModalNotLoggedIn({ host }) {
  return (
    <div className="fixed inset-0 -top-5 overflow-y-auto h-full w-full flex items-center justify-center z-20">
      <div className="pt-8 pb-8 border-2 w-96 rounded-md bg-background">
        <div className="text-center">
          <h2 className="mb-5">You need to log in to vote</h2>
          <Link
            href={host}
            className="px-4 py-2 bg-button-bg text-button rounded-sm hover:bg-zinc-300"
          >
            OK
          </Link>
        </div>
      </div>
    </div>
  );
}
