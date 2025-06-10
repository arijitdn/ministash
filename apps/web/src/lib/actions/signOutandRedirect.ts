"use server";

import { signOut } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function signOutAndRedirect(url: string) {
  await signOut();
  redirect(url);
}
