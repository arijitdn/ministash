"use server";

export const getTotalStorageUsage = async (enhancedFiles: any) => {
  return enhancedFiles.reduce(
    (sum: number, file: any) => sum + (file.size || 0),
    0
  );
};
