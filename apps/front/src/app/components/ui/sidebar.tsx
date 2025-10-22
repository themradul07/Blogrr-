"use client";

import React, { PropsWithChildren, ReactNode, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { cn } from "@/lib/utils";

type Props = PropsWithChildren<{
  triggerIcon: ReactNode;
  triggerClassName?: string;
}>;

const Sidebar = ({ triggerIcon, triggerClassName, children }: Props) => {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement|null>(null);

  // Close sidebar when clicking outside
  useOnClickOutside(ref as React.RefObject<HTMLElement>, () => setShow(false));

  return (
    <>
      {/* Trigger Button */}
      <button
        aria-expanded={show}
        aria-controls="sidebar"
        onClick={() => setShow((prev) => !prev)}
        className={triggerClassName}
      >
        {triggerIcon}
      </button>

      {/* Overlay (click to close) */}
      {show && (
        <div
          className="fixed inset-0 bg-black/30 z-40 transition-opacity duration-300"
          onClick={() => setShow(false)}
        />
      )}

      {/* Sidebar Drawer */}
      <div
        id="sidebar"
        ref={ref}
        onClick={(e) => {
          const target = e.target as HTMLElement;
          if (target.closest("button") || target.closest("a")) {
            setShow(false);
          }
        }}
        className={cn(
          "fixed top-0 left-0 w-64 z-50 bg-white min-h-screen rounded-r-md shadow-lg transform transition-all duration-300 ease-in-out",
          show
            ? "translate-x-0 opacity-100"
            : "-translate-x-full opacity-0 pointer-events-none"
        )}
      >
        {children}
      </div>
    </>
  );
};

export default Sidebar;
