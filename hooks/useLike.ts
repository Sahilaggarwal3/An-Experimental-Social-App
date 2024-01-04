import { useCallback, useMemo } from "react";
import useCurrentUser from "./useCurrentUser";
import usePost from "./usePost";
import usePosts from "./usePosts";
import toast from "react-hot-toast";
import axios from "axios";
import useLoginModal from "./useLoginModal";

const useLike = ({ userId, postId }: { userId?: string; postId: string }) => {
  const { data: currentUser } = useCurrentUser();

  const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
  const { mutate: mutateFetchedPosts } = usePosts(userId);

  const loginModal = useLoginModal();

  const hasLiked = useMemo(() => {
    const list = fetchedPost?.likedIds || [];

    return list.includes(currentUser?.id);
  }, [currentUser?.id, fetchedPost?.likedIds]);

  const toggleLike = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    try {
      if (hasLiked) {
        await axios.delete("/api/like", { data: { postId } });
      } else {
        await axios.post("/api/like", { postId });
      }

      mutateFetchedPost();
      mutateFetchedPosts();
      toast.success("Success");
    } catch (error) {
      toast.error("Something went wrong");
    }
  }, [
    mutateFetchedPost,
    mutateFetchedPosts,
    currentUser,
    hasLiked,
    postId,
    loginModal,
  ]);

  return { toggleLike, hasLiked };
};

export default useLike;
