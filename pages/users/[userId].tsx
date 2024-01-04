import Header from "@/Components/Header";
import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";
import useUser from "@/hooks/useUser";
import UserHero from "@/Components/users/UserHero";
import UserBio from "@/Components/users/UserBio";
// import PostFeed from "@/Components/posts/PostFeed";

const UserView = () => {
  const router = useRouter();
  const { userId } = router.query;
  const { data: fetchedUser, isLoading } = useUser(userId as string);

  if (isLoading && !fetchedUser) {
    return (
      <div className="h-full flex justify-center items-center">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }

  return (
    <>
      <Header showBackArrow label="User Profile"></Header>
      <UserHero userId={userId as string} />
      <UserBio userId={userId as string} />
      {/* <PostFeed userId={userId as string} /> */}
    </>
  );
};

export default UserView;
