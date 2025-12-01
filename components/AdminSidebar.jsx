"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  FaHome,
  FaPenNib,
  FaPlus,
  FaSignOutAlt,
  FaGlobe,
} from "react-icons/fa";

import { motion, spring } from "framer-motion";

const menuItems = [
  {
    name: "Dashboard",
    path: "/admin",
    icon: <FaHome />,
  },
  {
    name: "New Article",
    path: "/admin/posts/new",
    icon: <FaPlus />,
  },
];

const AdminSidebar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  const username = session?.user?.name || "Admin";
  const userInitial = username.charAt(0).toUpperCase();

  if (pathname.includes("/login")) {
    return (
      <motion.div
        initial={{ x: "-100%" }}
        animate={{
          x: 0,
          transition: {
            delay: 1.7,
            duration: 0.4,
            type: "spring",
            stiffness: 100,
            damping: 20,
          },
        }}
        className="w-64 bg-[#27272c] border-r border-accent/20 flex flex-col h-full text-white"
      >
        {/* logo - title */}
        <div className="h-20 flex items-center justify-center border-b border-accent/20">
          <h1 className="text-2xl font-bold">
            Admin<span className="text-accent">.</span>Panel
          </h1>
        </div>
        {/* go back to site */}
        <div className="p-4 border-t border-gray-800 flex flex-col gap-3">
          <Link href="/">
            <button className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-400 hover:text-white transition-all rounded-lg hover:bg-[#27272c]">
              <FaGlobe />
              Go back to Site
            </button>
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      transition={{
        duration: 0.4,
        type: "spring",
        stiffness: 100,
        damping: 20,
      }}
      className="w-64 bg-[#1c1c22] border-r border-gray-800 flex flex-col h-full text-white"
    >
      {/* logo - title */}
      <div className="h-20 flex items-center justify-center border-b border-gray-800">
        <h1 className="text-2xl font-bold">
          Admin<span className="text-accent">.</span>Panel
        </h1>
      </div>
      {/* menu links */}
      <nav className="flex-1 overflow-y-auto py-6 flex flex-col gap-2 px-4">
        {menuItems.map((item, index) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={index}
              href={item.path}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
                isActive
                  ? "bg-accent text-primary shadow-lg"
                  : "hover:bg-[#27272c] hover:text-accent"
              }`}
            >
              <div className="text-xl">{item.icon}</div>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
      {/* go back to site - logout */}
      <div className="p-4 border-t border-gray-800 flex flex-col gap-3">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-full bg-accent text-primary flex items-center justify-center font-bold text-lg shadow-md">
            {userInitial}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-white leading-none mb-1">
              {username}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-gray-400">
              Administrator
            </span>
          </div>
        </div>
        {/* view site */}
        <Link href="/">
          <button className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-400 hover:text-white transition-all rounded-lg hover:bg-[#27272c]">
            <FaGlobe />
            View Site
          </button>
        </Link>

        {/* logout */}
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-500 hover:text-red-400 hover:bg-red-500/10 transition-all rounded-lg"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </motion.div>
  );
};

export default AdminSidebar;
