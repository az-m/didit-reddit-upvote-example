import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-self-center mt-50">
      <p className="text-3xl">User profiles are private.</p>
      <Link href="/" className="hover:text-pink-500">
        Go home
      </Link>
    </div>
  );
}
