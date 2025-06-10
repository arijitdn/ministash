import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Users } from "lucide-react";
import UserRow from "./UserRow";

interface UsersTabProps {
  users: any;
  editingUser: any;
  setEditingUser: (user: any) => void;
  customLimits: {
    storageLimit: string;
    filesLimit: string;
    uploadLimit: string;
    price: string;
  };
  setCustomLimits: (limits: any) => void;
}

export default function UsersTab({
  users,
  editingUser,
  setEditingUser,
  customLimits,
  setCustomLimits,
}: UsersTabProps) {
  return (
    <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm shadow-2xl">
      <CardHeader className="pb-6">
        <CardTitle className="flex items-center gap-3 text-white text-xl">
          <div className="p-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg">
            <Users className="h-6 w-6 text-blue-400" />
          </div>
          User Management
        </CardTitle>
        <CardDescription className="text-gray-400 text-base">
          Comprehensive user management with plan controls and access management
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-xl border border-gray-700/50 overflow-hidden bg-gray-900/30">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700/50 hover:bg-gray-700/30 bg-gray-800/30">
                <TableHead className="text-gray-300 font-semibold py-4">
                  User
                </TableHead>
                <TableHead className="text-gray-300 font-semibold">
                  Plan
                </TableHead>
                <TableHead className="text-gray-300 font-semibold">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user: any) => (
                <UserRow
                  key={user.id}
                  user={user}
                  editingUser={editingUser}
                  setEditingUser={setEditingUser}
                  customLimits={customLimits}
                  setCustomLimits={setCustomLimits}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
