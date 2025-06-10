"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { FolderOpen, User } from "lucide-react";

export const SideIcons = () => {
  const path = usePathname();
  const router = useRouter();

  return (
    <div className="absolute space-x-3 top-4 right-4">
      {path !== "/files" && (
        <Button
          variant="outline"
          size="icon"
          onClick={() => router.push("/profile")}
          className="cursor-pointer"
        >
          <User />
        </Button>
      )}
      {path !== "/files" && (
        <Button
          variant="outline"
          onClick={() => router.push("/files")}
          className="cursor-pointer"
        >
          <FolderOpen />
          <span>Files</span>
        </Button>
      )}
    </div>
  );
};
