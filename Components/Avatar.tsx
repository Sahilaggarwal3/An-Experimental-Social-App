import useUser from "@/hooks/useUser";
import { useRouter } from "next/router";
import Image from "next/image";
import { useCallback } from "react";

interface AvatarProps {
  userId: string;
  isLarge?: boolean;
  hasborder?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ userId, isLarge, hasborder }) => {
  const router = useRouter();

  const { data: fethedUser } = useUser(userId);

  const clickHandler = useCallback(
    (event: any) => {
      event.stopPropagation();
      const url = `/users/${userId}`;

      router.push(url);
    },
    [router, userId]
  );

  return (
    <div
      className={`
    ${hasborder ? "border-4 border-black" : ""}
    ${isLarge ? "h-32" : "h-12"}
    ${isLarge ? "w-32" : "w-12"}
    rounded-full
    hover:opacity-90
    transition
    cursor-pointer
    relative
  `}
    >
      <Image
        fill
        style={{
          objectFit: "cover",
          borderRadius: "100%",
        }}
        src={fethedUser?.profileImage || "/images/placeholder.png"}
        alt="Avatar"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        onClick={clickHandler}
      />
    </div>
  );
};

export default Avatar;
