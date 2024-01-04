import { FaFeather } from "react-icons/fa";
import { useRouter } from "next/router";
import useLoginModal from "@/hooks/useLoginModal";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useCallback } from "react";

const SidebarTweetButton = () => {
  const router = useRouter();

  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();

  const clickHandler = useCallback(() => {
    if (!currentUser) {
      loginModal.onOpen();
    }

    router.push("/");
  }, [currentUser, loginModal, router]);

  return (
    <div onClick={clickHandler}>
      <div
        className="
        mt-6
        lg:hidden
        h-14
        w-14
        p-4
        flex
        items-center
        justify-center
        rounded-full
        bg-sky-500
        hover:bg-opacity-80
        transition
        cursor-pointer
        "
      >
        <FaFeather size={24} color="white" />
      </div>

      <div
        className="
        mt-6
        hidden
        lg:block
        py-2
        px-4
        rounded-full
        bg-sky-500
        hover:bg-opacity-90
        cursor-pointer
        transition
        "
      >
        <p className="hidden lg:block text-center text-xl text-white">Ignite your Post</p>
      </div>
    </div>
  );
};

export default SidebarTweetButton;
