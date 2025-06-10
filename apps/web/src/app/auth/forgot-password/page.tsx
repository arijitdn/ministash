"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { sendResetPasswordLinkAction } from "@/actions/resetPassword";
import { resetPasswordSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function resetPassword(data: z.infer<typeof resetPasswordSchema>) {
    setLoading(true);

    const response = await sendResetPasswordLinkAction(data);

    if (!response.success) {
      toast.error(
        response.error || "An error occurred while resetting your password."
      );
      setLoading(false);
    }

    if (response.success) {
      toast.success("Password reset link sent to your email.");
      form.reset();
      setLoading(false);
    }
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
              Enter your email address and we'll send you a link to reset your
              password
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form
              className="space-y-4"
              onSubmit={form.handleSubmit(resetPassword)}
            >
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  disabled={loading}
                  placeholder="Enter your email"
                  className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500"
                  {...form.register("email")}
                />
              </div>

              <Button
                className="w-full bg-red-600 hover:bg-red-700 h-12"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>

            <div className="text-center">
              <Link
                href="/auth/signin"
                className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
