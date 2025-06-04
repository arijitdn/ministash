"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";
import { resetPasswordAction } from "@/lib/actions/resetPassword";
import { redirect } from "next/navigation";

const resetPasswordSchema = z.object({
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z
    .string()
    .min(6, "Confirm Password must be at least 6 characters"),
});

export const ResetPassword = ({
  email,
  token,
}: {
  email: string;
  token: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  async function handleResetPassword(
    data: z.infer<typeof resetPasswordSchema>
  ) {
    if (data.newPassword !== data.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    setIsLoading(true);
    const response = await resetPasswordAction(token, data.newPassword);

    if (!response.success) {
      setIsLoading(false);
      return toast.error(response.error || "Failed to reset password");
    }

    setIsLoading(false);
    form.reset();
    toast.success("Password reset successfully");
    redirect("/auth/signin");
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <Image
              src="/icon.svg"
              alt="MiniStash"
              height={1000}
              width={1000}
              className="h-10 w-10"
            />
            <span className="text-2xl font-bold">MiniStash</span>
          </Link>
        </div>

        <Card className="bg-zinc-800/50 border-zinc-700">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Reset your password</CardTitle>
            <CardDescription className="text-zinc-400">
              Enter new password for{" "}
              <span className="font-semibold">{email}</span>.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form
              className="space-y-4"
              onSubmit={form.handleSubmit(handleResetPassword)}
            >
              <div className="space-y-4">
                <Label htmlFor="newPassword">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your new password"
                  className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500"
                  disabled={isLoading}
                  {...form.register("newPassword")}
                />
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your new password"
                  className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500"
                  disabled={isLoading}
                  {...form.register("confirmPassword")}
                />
              </div>

              <Button
                disabled={isLoading}
                className="w-full bg-red-600 hover:bg-red-700 h-12"
              >
                Reset Password
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
