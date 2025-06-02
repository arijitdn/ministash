"use client";

import { FolderOpen } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export const FileBrowserButton = () => {
  const router = useRouter();

  return (
    <Button variant="outline" onClick={() => router.push("/files")}>
      <FolderOpen />
      <span>Files</span>
    </Button>
  );
};
