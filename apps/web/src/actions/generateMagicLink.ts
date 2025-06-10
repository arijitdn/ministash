"use server";

import { db } from "@repo/db";

export const generateMagicLinkAction = async (email: string) => {
  const user = await db.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    return {
      success: false,
      error: "User not found",
    };
  }

  const data = await db.oAuthToken.findFirst({
    where: {
      email,
    },
  });

  if (data) {
    return {
      success: true,
      token: data.token,
    };
  }

  const token = crypto.randomUUID();
  await db.oAuthToken.create({
    data: {
      email,
      token,
    },
  });

  return {
    success: true,
    token,
  };
};
