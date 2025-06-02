"use client";

import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export const LogoutButton = () => {
  return (
    <Button
      variant="ghost"
      className="w-full justify-start text-gray-400 hover:text-red-500"
      onClick={() => signOut()}
    >
      <LogOut className="mr-2 h-4 w-4" />
      Log out
    </Button>
  );
};
