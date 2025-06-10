"use server";

import { db } from "@repo/db";

export const updateCustomTierLimitsAction = async (
  userId: string,
  storageLimit?: number | null,
  filesLimit?: number | null,
  fileUploadLimit?: number | null,
  price?: number | null
) => {
  const user = await db.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return { success: false, error: "User not found" };
  }

  await db.user.update({
    where: { id: userId },
    data: {
      storageLimit: storageLimit ?? user.storageLimit,
      filesLimit: filesLimit ?? user.filesLimit,
      fileUploadLimit: fileUploadLimit ?? user.fileUploadLimit,
      price: price ?? user.price,
    },
  });

  return {
    success: true,
    message: "User custom tier limits updated successfully",
  };
};
