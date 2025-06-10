import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Edit, Settings, ShieldOff, Crown, User } from "lucide-react";
import { toast } from "sonner";
import { plans } from "@/lib/plans";
import { updateUserPlanAction } from "@/actions/updateUserPlan";
import { updateCustomTierLimitsAction } from "@/actions/updateCustomTierLimits";
import { revokeAllAccessAction } from "@/actions/revokeAccess";

interface UserRowProps {
  user: any;
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

export default function UserRow({
  user,
  editingUser,
  setEditingUser,
  customLimits,
  setCustomLimits,
}: UserRowProps) {
  const updateUserPlan = async (userId: any, newPlan: any) => {
    const response = await updateUserPlanAction(userId, newPlan);
    if (!response.success) {
      toast.error(response.error || "Failed to update user plan");
      return;
    }
    toast(`User plan has been updated to ${newPlan}`);
  };

  const revokeUserAccess = async (email: any) => {
    const response = await revokeAllAccessAction(email);
    if (!response.success) {
      toast.error(response.error || "Failed to revoke user access");
      return;
    }
    toast("User access has been revoked and all sessions terminated");
  };

  const updateCustomLimits = async (userId: any) => {
    const { storageLimit, filesLimit, uploadLimit, price } = customLimits;
    const response = await updateCustomTierLimitsAction(
      userId,
      storageLimit.trim() === "" ? undefined : parseInt(storageLimit, 10),
      filesLimit.trim() === "" ? undefined : parseInt(filesLimit, 10),
      uploadLimit.trim() === "" ? undefined : parseInt(uploadLimit, 10),
      price.trim() === "" ? undefined : parseInt(price, 10)
    );

    if (!response.success) {
      toast.error(response.error || "Failed to update custom limits");
      return;
    }

    setEditingUser(null);
    setCustomLimits({
      storageLimit: "",
      filesLimit: "",
      uploadLimit: "",
      price: "",
    });
    toast("Custom limits have been applied to the user");
  };

  return (
    <TableRow className="border-gray-700/50 hover:bg-gray-700/20 transition-colors duration-200">
      <TableCell className="py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <User className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="font-medium text-white text-base">{user.name}</div>
            <div className="text-sm text-gray-400">{user.email}</div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Badge
            className={
              user.plan === "CUSTOM"
                ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30 px-3 py-1"
                : user.plan === "PRO"
                  ? "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 border-yellow-500/30 px-3 py-1"
                  : "bg-gradient-to-r from-gray-500/20 to-gray-600/20 text-gray-300 border-gray-500/30 px-3 py-1"
            }
          >
            {user.plan === "CUSTOM" && <Crown className="h-3 w-3 mr-1" />}
            {user.plan}
          </Badge>
          {user.customLimits && (
            <Badge
              variant="outline"
              className="border-gray-600/50 text-gray-300 bg-gray-700/30"
            >
              Custom Limits
            </Badge>
          )}
        </div>
      </TableCell>
      <TableCell>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-600/50 text-gray-300 hover:bg-gray-700/50 hover:border-gray-500 transition-all duration-200"
              >
                <Edit className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-800/95 border-gray-700/50 backdrop-blur-sm">
              <DialogHeader>
                <DialogTitle className="text-white text-lg">
                  Edit User Plan
                </DialogTitle>
                <DialogDescription className="text-gray-400">
                  Change the user's subscription plan and access level
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-gray-300 font-medium">
                    Plan Selection
                  </Label>
                  <Select
                    onValueChange={(value) => updateUserPlan(user.id, value)}
                  >
                    <SelectTrigger className="bg-gray-700/50 border-gray-600/50 text-white h-12">
                      <SelectValue placeholder={user.plan} />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800/95 border-gray-700/50 backdrop-blur-sm">
                      {Object.entries(plans).map(([key, plan]) => (
                        <SelectItem
                          key={key}
                          value={key}
                          className="text-white hover:bg-gray-700/50 focus:bg-gray-700/50"
                        >
                          {key.charAt(0) + key.slice(1).toLowerCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {user.plan === "CUSTOM" && (
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10 transition-all duration-200"
                  onClick={() => setEditingUser(user)}
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-800/95 border-gray-700/50 backdrop-blur-sm max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-white text-lg flex items-center gap-2">
                    <Crown className="h-5 w-5 text-purple-400" />
                    Custom Limits
                  </DialogTitle>
                  <DialogDescription className="text-gray-400">
                    Configure custom storage and file limits for{" "}
                    <span className="text-white font-medium">{user.name}</span>
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="storage"
                        className="text-gray-300 font-medium"
                      >
                        Storage (MB)
                      </Label>
                      <Input
                        id="storage"
                        type="number"
                        placeholder={user.storageLimit}
                        value={customLimits.storageLimit}
                        onChange={(e) =>
                          setCustomLimits({
                            ...customLimits,
                            storageLimit: e.target.value,
                          })
                        }
                        className="bg-gray-700/50 border-gray-600/50 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="files"
                        className="text-gray-300 font-medium"
                      >
                        Files Limit
                      </Label>
                      <Input
                        id="files"
                        type="number"
                        placeholder={user.filesLimit}
                        value={customLimits.filesLimit}
                        onChange={(e) =>
                          setCustomLimits({
                            ...customLimits,
                            filesLimit: e.target.value,
                          })
                        }
                        className="bg-gray-700/50 border-gray-600/50 text-white"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="upload"
                        className="text-gray-300 font-medium"
                      >
                        Upload Files Limit
                      </Label>
                      <Input
                        id="upload"
                        type="number"
                        placeholder={user.fileUploadLimit}
                        value={customLimits.uploadLimit}
                        onChange={(e) =>
                          setCustomLimits({
                            ...customLimits,
                            uploadLimit: e.target.value,
                          })
                        }
                        className="bg-gray-700/50 border-gray-600/50 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="price"
                        className="text-gray-300 font-medium"
                      >
                        Price (₹)
                      </Label>
                      <Input
                        id="price"
                        type="number"
                        placeholder={user.price}
                        value={customLimits.price}
                        onChange={(e) =>
                          setCustomLimits({
                            ...customLimits,
                            price: e.target.value,
                          })
                        }
                        className="bg-gray-700/50 border-gray-600/50 text-white"
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    onClick={() => updateCustomLimits(user.id)}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Update Limits
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                size="sm"
                className="bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30 hover:border-red-500/50 transition-all duration-200"
              >
                <ShieldOff className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-gray-800/95 border-gray-700/50 backdrop-blur-sm">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-white text-lg flex items-center gap-2">
                  <ShieldOff className="h-5 w-5 text-red-400" />
                  Revoke User Access
                </AlertDialogTitle>
                <AlertDialogDescription className="text-gray-400">
                  This will suspend{" "}
                  <span className="text-white font-medium">{user.name}'s</span>{" "}
                  account and terminate all their active sessions. This action
                  can be reversed later.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-gray-700/50 border-gray-600/50 text-gray-300 hover:bg-gray-600/50">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => revokeUserAccess(user.email)}
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
                >
                  Revoke Access
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </TableCell>
    </TableRow>
  );
}
