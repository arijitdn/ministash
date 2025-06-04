-- CreateTable
CREATE TABLE "OAuthLink" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "requirePasswordChange" BOOLEAN NOT NULL DEFAULT false,
    "restrictIp" TEXT,

    CONSTRAINT "OAuthLink_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OAuthLink_token_key" ON "OAuthLink"("token");

-- CreateIndex
CREATE UNIQUE INDEX "OAuthLink_email_key" ON "OAuthLink"("email");
