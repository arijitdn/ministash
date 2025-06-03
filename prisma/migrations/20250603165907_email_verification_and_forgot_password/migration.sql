-- AlterTable
ALTER TABLE "User" ADD COLUMN     "forgotPasswordToken" TEXT,
ADD COLUMN     "verificationToken" TEXT;
