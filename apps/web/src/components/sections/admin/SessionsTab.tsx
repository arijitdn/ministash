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
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Activity } from "lucide-react";
import SessionRow from "./SessionsRow";

interface SessionsTabProps {
  sessions: any;
}

export default function SessionsTab({ sessions }: SessionsTabProps) {
  return (
    <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm shadow-2xl">
      <CardHeader className="pb-6">
        <CardTitle className="flex items-center gap-3 text-white text-xl">
          <div className="p-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg">
            <Activity className="h-6 w-6 text-green-400" />
          </div>
          Active Sessions
        </CardTitle>
        <CardDescription className="text-gray-400 text-base">
          Monitor and manage all user sessions across the platform
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-xl border border-gray-700/50 overflow-hidden bg-gray-900/30">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700/50 hover:bg-gray-700/30 bg-gray-800/30">
                <TableHead className="text-gray-300 font-semibold py-4">
                  Session ID
                </TableHead>
                <TableHead className="text-gray-300 font-semibold">
                  Email
                </TableHead>
                <TableHead className="text-gray-300 font-semibold">
                  Created At
                </TableHead>
                <TableHead className="text-gray-300 font-semibold">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sessions.map((session: any) => (
                <SessionRow key={session.id} session={session} />
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
