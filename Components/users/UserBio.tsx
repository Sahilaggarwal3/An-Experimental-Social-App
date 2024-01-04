import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import Button from "../Button";
import { useMemo } from "react";
import { format } from "date-fns";
import useEditModal from "@/hooks/useEditModal";
import { BiCalendar } from "react-icons/bi";
import useFollow from "@/hooks/useFollow";

interface UserBioProps {
  userId: string;
}

const UserBio: React.FC<UserBioProps> = ({ userId }) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedUser } = useUser(userId);
  const editModal = useEditModal();

  const { toggleFollow, isFollowing } = useFollow(userId);

  const createdAt = useMemo(() => {
    if (!fetchedUser?.createdAt) {
      return null;
    }

    return format(new Date(fetchedUser.createdAt), "MMMM yyyy");
  }, [fetchedUser?.createdAt]);

  return (
    <div className="border-b-[1px] border-b-neutral-700 pb-4">
      <div className="flex justify-end p-2">
        {currentUser?.id === userId ? (
          <Button label="Edit" secondary onClick={editModal.onOpen} />
        ) : (
          <Button
            label={isFollowing ? "Unfollow" : "Follow"}
            secondary={!isFollowing}
            onClick={toggleFollow}
            outline={isFollowing}
          />
        )}
      </div>

      <div className="mt-4 px-8">
        <div className="flex flex-col">
          <p className="text-white text-3xl font-semibold">
            {fetchedUser?.name}
          </p>
          <p className="text-neutral-400 text-xs font-semibold">
            {fetchedUser?.username}
          </p>
        </div>

        <div className="flex flex-col mt-4">
          <p className="text-gray-300 mb-4">{fetchedUser?.bio}</p>

          <div className="flex flex-row items-center gap-2">
            <BiCalendar />
            <p className="text-neutral-400">Joined {createdAt}</p>
          </div>
        </div>

        <div className="flex flex-row items-center mt-4 gap-6">
          <div className="flex flex-row items-center gap-2">
            <p className="text-white">{fetchedUser?.followingIds?.length}</p>
            <p className="text-neutral-400">Following</p>
          </div>

          <div className="flex flex-row items-center gap-2">
            <p className="text-white">{fetchedUser?.followersCount || 0}</p>
            <p className="text-neutral-400">Followers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBio;
