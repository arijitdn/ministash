import { Settings, Users, Activity, Crown } from "lucide-react";

export default function AdminHeroSection({
  users,
  sessions,
}: {
  users: any;
  sessions: any;
}) {
  return (
    <div className="mb-8">
      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500/10 to-orange-500/10 text-red-400 px-4 py-2 rounded-full text-sm font-medium mb-4 border border-red-500/20">
        <Settings className="h-4 w-4" />
        Admin Dashboard
        <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
      </div>
      <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-3">
        System Management
      </h1>
      <p className="text-gray-400 text-lg">
        Comprehensive control over users, sessions, and authentication for
        MiniStash
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <Users className="h-8 w-8 text-blue-400" />
            <div>
              <p className="text-2xl font-bold text-white">{users.length}</p>
              <p className="text-blue-400 text-sm">Total Users</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-500/10 to-green-600/10 border border-green-500/20 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <Activity className="h-8 w-8 text-green-400" />
            <div>
              <p className="text-2xl font-bold text-white">{sessions.length}</p>
              <p className="text-green-400 text-sm">Active Sessions</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 border border-purple-500/20 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <Crown className="h-8 w-8 text-purple-400" />
            <div>
              <p className="text-2xl font-bold text-white">
                {users.filter((u: any) => u.plan === "CUSTOM").length}
              </p>
              <p className="text-purple-400 text-sm">Custom Plans</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
