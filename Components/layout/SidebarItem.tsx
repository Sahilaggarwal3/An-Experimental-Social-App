import useLoginModal from "@/hooks/useLoginModal";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { IconType } from "react-icons";
import useCurrentUser from "@/hooks/useCurrentUser";
import { BsDot } from "react-icons/bs";

interface SidebarItemProps {
  label: string;
  href: string;
  icon: IconType;
  onClick?: () => void;
  alert?: boolean;
  auth?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  href,
  icon: Icon,
  onClick,
  auth,
  alert,
}) => {
  const { data: currentUser } = useCurrentUser();
  const router = useRouter();
  const loginModal = useLoginModal();

  const clickHandler = useCallback(() => {
    if (onClick) {
      return onClick();
    } else if (auth && !currentUser) {
      loginModal.onOpen();
    } else if (href) {
      router.push(href);
    }
  }, [onClick, router, href]);

  return (
    <div onClick={clickHandler} className="flex flex-row items-center">
      <div
        className="
    relative
    rounded-full
    h-14
    w-14
    flex
    items-center
    justify-center
    p-4
    hover:bg-slate-300
    hover:bg-opacity-5
    cursor-pointer
    lg:hidden
    "
      >
        <Icon size={28} color="white" />
        {alert ? (
          <BsDot size={65} className="text-black absolute -top-3 left-0" />
        ) : null}
      </div>

      <div
        className="relative hidden lg:flex
      items-center gap-4 p-4 rounded-full hover:bg-slate-300 hover:bg-opacity-5 cursor-pointer"
      >
        <Icon size={24} color="white" />

        <p className="hidden lg:block text-xl ">{label}</p>
        {alert ? (
          <BsDot size={65} className="text-black absolute -top-3 left-0" />
        ) : null}
      </div>
    </div>
  );
};

export default SidebarItem;
