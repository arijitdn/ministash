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
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ForgotPasswordPage() {
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
            <CardTitle className="text-2xl">Reset your password</CardTitle>
            <CardDescription className="text-zinc-400">
              Enter your email address and we'll send you a link to reset your
              password
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500"
                />
              </div>

              <Button className="w-full bg-red-600 hover:bg-red-700 h-12">
                Send Reset Link
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
