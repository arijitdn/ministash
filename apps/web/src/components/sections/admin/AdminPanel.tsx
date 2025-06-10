"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, Users, Activity } from "lucide-react";
import AdminHeader from "./AdminHeader";
import AdminHeroSection from "./AdminHero";
import MagicLinksTab from "./MagicLinks";
import UsersTab from "./UserTab";
import SessionsTab from "./SessionsTab";

export default function AdminPanel({
  users,
  sessions,
}: {
  users: any;
  sessions: any;
}) {
  const [email, setEmail] = useState("");
  const [magicLink, setMagicLink] = useState("");
  const [editingUser, setEditingUser] = useState<any | null>(null);
  const [customLimits, setCustomLimits] = useState({
    storageLimit: "",
    filesLimit: "",
    uploadLimit: "",
    price: "",
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <AdminHeader />

      <div className="max-w-7xl mx-auto p-6">
        <AdminHeroSection users={users} sessions={sessions} />

        <Tabs defaultValue="magic-links" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm p-1 rounded-xl">
            <TabsTrigger
              value="magic-links"
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-red-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-200 rounded-lg"
            >
              <Link className="h-4 w-4" />
              Magic Links
            </TabsTrigger>
            <TabsTrigger
              value="users"
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-red-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-200 rounded-lg"
            >
              <Users className="h-4 w-4" />
              Users
            </TabsTrigger>
            <TabsTrigger
              value="sessions"
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-red-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-200 rounded-lg"
            >
              <Activity className="h-4 w-4" />
              Sessions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="magic-links">
            <MagicLinksTab
              email={email}
              setEmail={setEmail}
              magicLink={magicLink}
              setMagicLink={setMagicLink}
            />
          </TabsContent>

          <TabsContent value="users">
            <UsersTab
              users={users}
              editingUser={editingUser}
              setEditingUser={setEditingUser}
              customLimits={customLimits}
              setCustomLimits={setCustomLimits}
            />
          </TabsContent>

          <TabsContent value="sessions">
            <SessionsTab sessions={sessions} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
