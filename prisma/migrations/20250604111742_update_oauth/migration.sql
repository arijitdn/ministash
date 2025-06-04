/*
  Warnings:

  - You are about to drop the column `requirePasswordChange` on the `OAuthToken` table. All the data in the column will be lost.
  - You are about to drop the column `restrictIp` on the `OAuthToken` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "OAuthToken" DROP COLUMN "requirePasswordChange",
DROP COLUMN "restrictIp",
ADD COLUMN     "ip" TEXT;
