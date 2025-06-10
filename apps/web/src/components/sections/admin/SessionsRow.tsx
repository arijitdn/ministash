import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Database, Clock, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { revokeSessionAction } from "@/lib/actions/revokeAccess";

interface SessionRowProps {
  session: any;
}

export default function SessionRow({ session }: SessionRowProps) {
  const revokeSession = async (sessionId: any) => {
    const response = await revokeSessionAction(sessionId);
    if (!response.success) {
      toast.error(response.error || "Failed to revoke session");
      return;
    }
    toast("Session has been revoked successfully");
  };

  return (
    <TableRow className="border-gray-700/50 hover:bg-gray-700/20 transition-colors duration-200">
      <TableCell className="py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center border border-green-500/30">
            <Database className="h-4 w-4 text-green-400" />
          </div>
          <div className="font-mono text-white text-sm bg-gray-700/30 px-2 py-1 rounded">
            {session.id.slice(0, 8)}...
          </div>
        </div>
      </TableCell>
      <TableCell className="text-gray-300 font-medium">
        {session.email}
      </TableCell>
      <TableCell className="text-gray-300">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-gray-400" />
          {new Date(session.issuedAt).toLocaleString()}
        </div>
      </TableCell>
      <TableCell>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="destructive"
              size="sm"
              className="bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30 hover:border-red-500/50 transition-all duration-200"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Revoke
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-gray-800/95 border-gray-700/50 backdrop-blur-sm">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white text-lg flex items-center gap-2">
                <Trash2 className="h-5 w-5 text-red-400" />
                Revoke Session
              </AlertDialogTitle>
              <AlertDialogDescription className="text-gray-400">
                This will immediately terminate this session and log the user
                out from this device. The user will need to authenticate again
                to regain access.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-gray-700/50 border-gray-600/50 text-gray-300 hover:bg-gray-600/50">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => revokeSession(session.id)}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
              >
                Revoke Session
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </TableCell>
    </TableRow>
  );
}
