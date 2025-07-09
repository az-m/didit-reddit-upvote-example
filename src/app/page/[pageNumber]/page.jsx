import { PostList } from "@/components/PostList";
import ModalNotLoggedIn from "@/components/ModalNotLoggedIn";

export default async function PageNumberRoute({ params, searchParams }) {
  const err = (await searchParams).err;

  return (
    <div>
      <PostList currentPage={parseInt(params.pageNumber, 10)} host="/page/" />
      {err && <ModalNotLoggedIn host="/" />}
    </div>
  );
}
