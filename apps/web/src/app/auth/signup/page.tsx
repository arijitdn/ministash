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
import Link from "next/link";
import Image from "next/image";
import { ContinueWithGoogle } from "@/components/ContinueWithGoogle";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpAction } from "@/actions/signup";
import { toast } from "sonner";
import { signUpSchema } from "@/lib/zodSchema";
import { useState } from "react";

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  async function registerUser(data: z.infer<typeof signUpSchema>) {
    setIsLoading(true);
    const res = await signUpAction(data);

    if (!res.success) {
      setIsLoading(false);
      return toast.error(res.message);
    }

    toast.success(res.message);
    form.reset();
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
            <CardTitle className="text-2xl">Create your account</CardTitle>
            <CardDescription className="text-zinc-400">
              Get started with MiniStash today
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Google Sign Up Button */}
            <ContinueWithGoogle />

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full bg-zinc-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-zinc-800 px-2 text-zinc-400">
                  Or sign up with email
                </span>
              </div>
            </div>

            {/* Email Sign Up Form */}
            <form
              className="space-y-4"
              onSubmit={form.handleSubmit(registerUser)}
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First name</Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    disabled={isLoading}
                    className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500"
                    {...form.register("firstName")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    disabled={isLoading}
                    className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500"
                    {...form.register("lastName")}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  disabled={isLoading}
                  className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500"
                  {...form.register("email")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a strong password"
                  disabled={isLoading}
                  className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500"
                  {...form.register("password")}
                />
              </div>

              <Button
                className="w-full bg-red-600 hover:bg-red-700 h-12"
                disabled={isLoading}
              >
                {isLoading ? "Authenticating..." : "Create Account"}
              </Button>
            </form>

            <div className="text-center text-sm text-zinc-400">
              Already have an account?{" "}
              <Link
                href="/auth/signin"
                className="text-red-400 hover:text-red-300 font-medium"
              >
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-zinc-500">
          <p>
            By creating an account, you agree to our{" "}
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
