"use server";

import { db } from "@repo/db";

export const revokeAllAccessAction = async (email: string) => {
  const user = await db.user.findFirst({
    where: { email },
  });

  if (!user) {
    return { success: false, error: "User not found" };
  }

  await db.session.deleteMany({
    where: { email },
  });

  return {
    success: true,
    message: "Access revoked successfully",
  };
};

export const revokeSessionAction = async (sessionId: string) => {
  const session = await db.session.findUnique({
    where: { id: sessionId },
  });

  if (!session) {
    return { success: false, error: "Session not found" };
  }

  await db.session.delete({
    where: { id: sessionId },
  });

  return {
    success: true,
    message: "Session revoked successfully",
  };
};
