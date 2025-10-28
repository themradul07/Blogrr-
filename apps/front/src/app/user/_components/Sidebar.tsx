"use client";
import React from "react";
import Link from "next/link";
import {
  HomeIcon,
  HeartIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-gray-900 text-white flex flex-col justify-between">
      {/* Top Section */}
      <div className="p-6">
        <ul className="space-y-4">
          <li>
            <Link
              href="/user/posts"
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800 transition"
            >
              <HomeIcon className="h-5 w-5 text-gray-300" />
              <span>Dashboard</span>
            </Link>
          </li>

          <li>
            <Link
              href="/user/posts/liked"
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800 transition"
            >
              <HeartIcon className="h-5 w-5 text-gray-300" />
              <span>Liked blogs</span>
            </Link>
          </li>

          <li>
            <Link
              href="/api/auth/"
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800 transition"
            >
               <ArrowRightOnRectangleIcon className="h-5 w-5 text-gray-300" />
          <span>Sign Out</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Bottom Section */}
      <div className="p-6 border-t border-gray-800">
        <Link
          href="/signout"
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800 transition"
        >
         
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
