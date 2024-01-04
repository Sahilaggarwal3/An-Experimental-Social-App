import Form from "@/Components/Form";
import Header from "@/Components/Header";
import CommentFeed from "@/Components/posts/CommentFeed";
import PostItem from "@/Components/posts/PostItem";
import usePost from "@/hooks/usePost";
import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";

const PostView = () => {
  const router = useRouter();

  const { postId } = router.query;

  const { data: fetchedPost, isLoading } = usePost(postId as string);

  if (!fetchedPost && isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <ClipLoader color="black" size={80} />
      </div>
    );
  }

  return (
    <>
      <Header label="Ignite Your Posts" showBackArrow />
      <PostItem data={fetchedPost} />
      <Form
        placeholder="Ignite your reply"
        isComment
        postId={postId as string}
      />
      <CommentFeed comments={fetchedPost?.comments} />
    </>
  );
};

export default PostView;
