import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import usePosts from "@/hooks/usePosts";
import useRegisterModal from "@/hooks/useRegisterModal";
import axios from "axios";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import Button from "./Button";
import Avatar from "./Avatar";
import usePost from "@/hooks/usePost";

interface FormProps {
  placeholder: string;
  postId?: string;
  isComment?: boolean;
}

const Form: React.FC<FormProps> = ({ placeholder, postId, isComment }) => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const { data: currentUser } = useCurrentUser();
  const { mutate: mutatePosts } = usePosts();
  const { mutate: mutatePost } = usePost(postId as string);

  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      const url = isComment ? `/api/comments?postId=${postId}` : "/api/posts"

      await axios.post(url, { body });

      toast.success("Post Created");

      setBody("");
      mutatePosts();
      mutatePost();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [body, mutatePosts, isComment, postId, mutatePost]);

  const keyHandler = (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="border-b-[1px] border-neutral-800 py-2 px-5">
      {currentUser ? (
        <div className="flex flex-row gap-4">
          <div>
            <Avatar userId={currentUser?.id} />
          </div>

          <div className="w-full">
            <textarea
              disabled={isLoading}
              onChange={(e) => setBody(e.target.value)}
              placeholder={placeholder}
              onKeyUp={keyHandler}
              value={body}
              className=" 
              w-full
             bg-sky-900
              mt-3
              text-white
              outline-none
              text-[20px]
              resize-none
             "
            ></textarea>

            <div className="mt-4 flex justify-end">
              <Button
                disabled={isLoading || !body}
                label="Post"
                onClick={onSubmit}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="py-8">
          <h1 className="text-white text-center text-2xl font-semibold mb-4">
            Welcome to SparkPost : Experimental Social Platform
          </h1>

          <div className="flex flex-row items-center justify-center gap-4">
            <Button label="Login" onClick={loginModal.onOpen} />
            <Button label="Register" onClick={registerModal.onOpen} secondary />
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
