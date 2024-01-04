import { SiSparkpost } from "react-icons/si";

import { useRouter } from "next/router";

const SidebarLogo = () => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push("/")}
      className="rounded-full h-14 w-14 p-4 flex items-center justify-center hover:bg-blue-300 hover:bg-opacity-10 cursor-pointer"
    >
      <SiSparkpost size={40} color="white" />
    </div>
  );
};

export default SidebarLogo;