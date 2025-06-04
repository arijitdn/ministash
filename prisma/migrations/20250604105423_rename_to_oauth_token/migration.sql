/*
  Warnings:

  - You are about to drop the `OAuthLink` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "OAuthLink";

-- CreateTable
CREATE TABLE "OAuthToken" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "requirePasswordChange" BOOLEAN NOT NULL DEFAULT false,
    "restrictIp" TEXT,

    CONSTRAINT "OAuthToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OAuthToken_token_key" ON "OAuthToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "OAuthToken_email_key" ON "OAuthToken"("email");
