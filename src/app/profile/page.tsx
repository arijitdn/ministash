import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { User, HelpCircle, Lock, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SideIcons } from "@/components/SideIcons";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { LogoutButton } from "@/components/LogoutButton";
import db from "@/lib/db";
import { plans } from "@/lib/plans";
import { cookies } from "next/headers";

export default async function ProfilePage() {
  const session = await auth();

  if (!session || !session.user) redirect("/api/auth/signin");

  const cookieStore = cookies();

  const cookieHeader = (await cookieStore)
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const userData = await db.user.findFirst({
    where: {
      email: session.user.email!,
    },
  });

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/s3/usage`, {
    headers: {
      cookie: cookieHeader,
    },
  });

  const { totalUsageMB, totalFiles: usedFilesLimit } = await res.json();
  const usedStorageLimit = totalUsageMB / 1000;
  const totalUsageMBNum = parseFloat(totalUsageMB);
  const usageInGB = totalUsageMBNum / 1000;

  const currentPlan = userData?.plan ?? "FREE";
  const currentPrice =
    userData?.plan === "CUSTOM"
      ? userData?.price
      : plans[(userData?.plan ?? "FREE") as keyof typeof plans].price;
  const currentStorageLimit =
    userData?.plan === "CUSTOM"
      ? userData?.storageLimit / 1000
      : plans[(userData?.plan ?? "FREE") as keyof typeof plans].storageLimit /
        1000;
  const currentFilesLimit =
    userData?.plan === "CUSTOM"
      ? userData?.filesLimit
      : plans[(userData?.plan ?? "FREE") as keyof typeof plans].filesLimit;
  const currentUploadLimit =
    userData?.plan === "CUSTOM"
      ? userData?.fileUploadLimit
      : plans[(userData?.plan ?? "FREE") as keyof typeof plans].uploadLimit;

  const usedStorageLimitDisplay =
    usageInGB < 1
      ? `${totalUsageMBNum.toFixed(2)} MB`
      : `${usageInGB.toFixed(2)} GB`;

  let currentStorageLimitDisplay;
  if (currentStorageLimit < 0) {
    currentStorageLimitDisplay = "unlimited";
  } else {
    currentStorageLimitDisplay =
      currentStorageLimit >= 1
        ? `${currentStorageLimit.toFixed(2)} GB`
        : `${(currentStorageLimit * 1000).toFixed(2)} MB`;
  }

  let storageUsedPercent;
  if (currentStorageLimit < 0) {
    storageUsedPercent = 0;
  } else {
    storageUsedPercent = (usedStorageLimit / currentStorageLimit) * 100;
  }

  let filesUsedPercent;

  if (currentFilesLimit < 0) {
    filesUsedPercent = 0;
  } else {
    filesUsedPercent = (usedFilesLimit / currentFilesLimit) * 100;
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-gray-100">
      <header className="border-b border-gray-800 bg-[#212121] py-4">
        <div className="container flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/icon.svg"
              alt="MiniStash"
              height={1000}
              width={1000}
              className="h-8 w-8"
            />
            <h1 className="text-xl font-bold">MiniStash</h1>
          </Link>
          <div className="flex items-center gap-4">
            <SideIcons />
          </div>
        </div>
      </header>

      <main className="container py-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-1 mx-4">
            <Card className="bg-[#212121] border-gray-800">
              <CardHeader className="pb-2">
                <div className="flex flex-col items-center">
                  <Avatar className="h-24 w-24">
                    <AvatarImage
                      src={
                        session.user.image ??
                        userData?.imageUrl ??
                        "https://s3.adnsys.eu.org/assets/avatar-placeholder.png"
                      }
                    />
                  </Avatar>
                  <CardTitle className="mt-4 text-xl">
                    {userData?.name}
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    {session.user.email}
                  </CardDescription>
                  <Badge className="mt-2 bg-[#E74C3C] hover:bg-[#E74C3C]/80">
                    {currentPlan} Plan
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <nav className="mt-4 space-y-1">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-gray-100"
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-gray-400 hover:text-gray-100"
                  >
                    <HelpCircle className="mr-2 h-4 w-4" />
                    Help & Support
                  </Button>
                  <Separator className="my-2 bg-gray-800" />
                  <LogoutButton />
                </nav>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2 space-y-8 mx-4">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="bg-[#212121] border-gray-800">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6 pt-4">
                <Card className="bg-[#212121] border-gray-800">
                  <CardHeader>
                    <CardTitle>Storage Usage</CardTitle>
                    <CardDescription>
                      You've used {storageUsedPercent.toFixed(2)}% of your
                      storage
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{usedStorageLimitDisplay}</span>
                          <span>{currentStorageLimitDisplay}</span>
                        </div>
                        <Progress
                          value={storageUsedPercent}
                          className="h-2 bg-gray-700"
                        >
                          <div className="h-full bg-[#E74C3C] rounded-full" />
                        </Progress>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Files</span>
                          <span>
                            {usedFilesLimit} /{" "}
                            {currentFilesLimit < 0 ? "∞" : currentFilesLimit}
                          </span>
                        </div>
                        <Progress
                          value={filesUsedPercent}
                          className="h-2 bg-gray-700"
                        >
                          <div className="h-full bg-[#E74C3C] rounded-full" />
                        </Progress>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#212121] border-gray-800">
                  <CardHeader>
                    <CardTitle>Current Plan</CardTitle>
                    <CardDescription>
                      Your subscription details and usage
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-lg border border-gray-800 p-4 mb-4">
                      <div className="flex items-center justify-between flex-col md:flex-row">
                        <div>
                          <h3 className="font-medium flex flex-col md:flex-row items-center">
                            <Badge
                              className={`mr-2 ${
                                currentPlan === "FREE"
                                  ? "bg-gray-600 hover:bg-gray-700"
                                  : "bg-[#E74C3C] hover:bg-[#E74C3C]/80"
                              }`}
                            >
                              {currentPlan}
                            </Badge>
                            <span>₹ {currentPrice}/month</span>
                          </h3>
                          <p className="text-sm text-gray-400 mt-1 text-center md:text-left">
                            Billed monthly
                          </p>
                        </div>
                        <Button
                          variant={`${
                            currentPlan !== "FREE" ? "outline" : "default"
                          }`}
                          className={`${
                            currentPlan === "FREE" &&
                            "bg-[#E74C3C] hover:bg-[#E74C3C]/80"
                          }`}
                        >
                          {currentPlan !== "FREE"
                            ? "Cancel Subscription"
                            : "Upgrade Plan"}
                        </Button>
                      </div>

                      <Separator className="my-4 bg-gray-800" />

                      <div className="space-y-2">
                        <div className="flex items-center">
                          <div
                            className={`h-2 w-2 rounded-full ${
                              currentPlan === "FREE"
                                ? "bg-gray-600 hover:bg-gray-700"
                                : "bg-[#E74C3C] hover:bg-[#E74C3C]/80"
                            } mr-2`}
                          />
                          <span className="text-sm">
                            {currentStorageLimitDisplay === "unlimited"
                              ? "Unlimited"
                              : currentStorageLimitDisplay}{" "}
                            storage limit
                          </span>
                        </div>
                        <div className="flex items-center">
                          <div
                            className={`h-2 w-2 rounded-full ${
                              currentPlan === "FREE"
                                ? "bg-gray-600 hover:bg-gray-700"
                                : "bg-[#E74C3C] hover:bg-[#E74C3C]/80"
                            } mr-2`}
                          />
                          <span className="text-sm">
                            {currentFilesLimit < 0
                              ? "Unlimited"
                              : currentFilesLimit}{" "}
                            files limit
                          </span>
                        </div>
                        <div className="flex items-center">
                          <div
                            className={`h-2 w-2 rounded-full ${
                              currentPlan === "FREE"
                                ? "bg-gray-600 hover:bg-gray-700"
                                : "bg-[#E74C3C] hover:bg-[#E74C3C]/80"
                            } mr-2`}
                          />
                          <span className="text-sm">
                            Upload{" "}
                            {currentUploadLimit < 0
                              ? "Unlimited"
                              : currentUploadLimit}{" "}
                            files at a time
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="space-y-6 pt-4">
                <Card className="bg-[#212121] border-gray-800">
                  <CardHeader>
                    <CardTitle>Password</CardTitle>
                    <CardDescription>Change your password</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Current Password
                      </label>
                      <input
                        type="password"
                        className="w-full rounded-md border border-gray-800 bg-gray-900 px-3 py-2 text-sm"
                        placeholder="••••••••"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        New Password
                      </label>
                      <input
                        type="password"
                        className="w-full rounded-md border border-gray-800 bg-gray-900 px-3 py-2 text-sm"
                        placeholder="••••••••"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        className="w-full rounded-md border border-gray-800 bg-gray-900 px-3 py-2 text-sm"
                        placeholder="••••••••"
                      />
                    </div>
                    <Button className="bg-[#E74C3C] hover:bg-[#E74C3C]/80">
                      <Lock className="mr-2 h-4 w-4" />
                      Update Password
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-[#212121] border-gray-800">
                  <CardHeader>
                    <CardTitle>Two-Factor Authentication</CardTitle>
                    <CardDescription>
                      Add an extra layer of security to your account
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Authenticator App</h3>
                        <p className="text-sm text-gray-400">
                          Use an authenticator app to generate one-time codes
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        className="border-gray-700 text-gray-300 hover:bg-gray-700"
                      >
                        Enable
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="preferences" className="space-y-6 pt-4">
                <Card className="bg-[#212121] border-gray-800">
                  <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>
                      Manage your notification preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Email Notifications</h3>
                        <p className="text-sm text-gray-400">
                          Receive emails about your account activity
                        </p>
                      </div>
                      <div className="h-6 w-11 rounded-full bg-[#E74C3C] relative">
                        <div className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white"></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Storage Alerts</h3>
                        <p className="text-sm text-gray-400">
                          Get notified when you're close to your storage limit
                        </p>
                      </div>
                      <div className="h-6 w-11 rounded-full bg-[#E74C3C] relative">
                        <div className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white"></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">New Features</h3>
                        <p className="text-sm text-gray-400">
                          Learn about new features and updates
                        </p>
                      </div>
                      <div className="h-6 w-11 rounded-full bg-gray-700 relative">
                        <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#212121] border-gray-800">
                  <CardHeader>
                    <CardTitle>Help & Support</CardTitle>
                    <CardDescription>
                      Get help with your account
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="rounded-lg border border-gray-800 p-4 flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Documentation</h3>
                        <p className="text-sm text-gray-400">
                          Read our guides and documentation
                        </p>
                      </div>
                      <Button variant="ghost" size="icon">
                        <ChevronRight size={20} />
                      </Button>
                    </div>

                    <div className="rounded-lg border border-gray-800 p-4 flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Contact Support</h3>
                        <p className="text-sm text-gray-400">
                          Get help from our support team
                        </p>
                      </div>
                      <Button variant="ghost" size="icon">
                        <ChevronRight size={20} />
                      </Button>
                    </div>

                    <div className="rounded-lg border border-gray-800 p-4 flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">FAQ</h3>
                        <p className="text-sm text-gray-400">
                          Frequently asked questions
                        </p>
                      </div>
                      <Button variant="ghost" size="icon">
                        <ChevronRight size={20} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}
