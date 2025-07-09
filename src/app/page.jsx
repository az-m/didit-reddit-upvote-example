import { PostList } from "../components/PostList";
import ModalNotLoggedIn from "@/components/ModalNotLoggedIn";

export default async function Home({ searchParams }) {
  const err = (await searchParams).err;
  return (
    <>
      <PostList host="/" />
      {err && <ModalNotLoggedIn host="/" />}
    </>
  );
}
