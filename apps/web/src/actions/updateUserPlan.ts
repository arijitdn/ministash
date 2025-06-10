"use server";

import { db } from "@repo/db";

export const updateUserPlanAction = async (userId: string, plan: string) => {
  const user = await db.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return { success: false, error: "User not found" };
  }

  await db.user.update({
    where: { id: userId },
    data: { plan: plan as any },
  });

  return { success: true, message: "User plan updated successfully" };
};
