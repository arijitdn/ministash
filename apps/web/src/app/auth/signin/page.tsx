"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import Image from "next/image";
import { ContinueWithGoogle } from "@/components/ContinueWithGoogle";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { signInAction } from "@/actions/signIn";
import { signInSchema } from "@/lib/zod/schema";
import { useState } from "react";

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function validateCredentials(data: z.infer<typeof signInSchema>) {
    setIsLoading(true);

    const res = await signInAction(data);

    if (!res.success) {
      setIsLoading(false);
      return toast.error(res.error);
    }

    toast.success(res.message);
    setIsLoading(false);
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
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
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription className="text-zinc-400">
              Sign in to your MiniStash account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Google Sign In Button */}
            <ContinueWithGoogle />

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full bg-zinc-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-zinc-800 px-2 text-zinc-400">
                  Or continue with email
                </span>
              </div>
            </div>

            {/* Email Sign In Form */}
            <form
              className="space-y-4"
              onSubmit={form.handleSubmit(validateCredentials)}
            >
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500"
                  disabled={isLoading}
                  {...form.register("email")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500"
                  disabled={isLoading}
                  {...form.register("password")}
                />
              </div>

              <div className="flex items-center justify-between">
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-red-400 hover:text-red-300"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                className="w-full bg-red-600 hover:bg-red-700 h-12"
                disabled={isLoading}
              >
                {isLoading ? "Authenticating..." : "Sign In"}
              </Button>
            </form>

            <div className="text-center text-sm text-zinc-400">
              Don't have an account?{" "}
              <Link
                href="/auth/signup"
                className="text-red-400 hover:text-red-300 font-medium"
              >
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-zinc-500">
          <p>
            By signing in, you agree to our{" "}
            <Link href="/terms" className="text-zinc-400 hover:text-white">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-zinc-400 hover:text-white">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
