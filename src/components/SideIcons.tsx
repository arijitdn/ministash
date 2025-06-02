"use client";

import { ThemeToggle } from "./ui/ThemeToggle";
import { FileBrowserButton } from "./FileBrowserButton";
import { usePathname } from "next/navigation";

export const SideIcons = () => {
  const path = usePathname();

  return (
    <div className="fixed space-x-3 top-4 right-4">
      {path !== "/files" && <ThemeToggle />}
      {path !== "/files" && <FileBrowserButton />}
    </div>
  );
};
