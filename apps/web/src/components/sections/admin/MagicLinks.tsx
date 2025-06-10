import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Link, Mail, Zap } from "lucide-react";
import { toast } from "sonner";
import { generateMagicLinkAction } from "@/lib/actions/generateMagicLink";

interface MagicLinksTabProps {
  email: string;
  setEmail: (email: string) => void;
  magicLink: string;
  setMagicLink: (link: string) => void;
}

export default function MagicLinksTab({
  email,
  setEmail,
  magicLink,
  setMagicLink,
}: MagicLinksTabProps) {
  const generateMagicLink = async () => {
    if (!email) {
      toast("Please enter an email address");
      return;
    }

    const response = await generateMagicLinkAction(email);
    if (!response.success) {
      toast.error(response.error || "Failed to generate magic link");
      return;
    }

    const link = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/access?token=${response.token}`;
    setMagicLink(link);
    toast("The magic link has been generated successfully");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast("Copied to clipboard");
  };

  return (
    <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm shadow-2xl">
      <CardHeader className="pb-6">
        <CardTitle className="flex items-center gap-3 text-white text-xl">
          <div className="p-2 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-lg">
            <Mail className="h-6 w-6 text-red-400" />
          </div>
          Generate Magic Link
        </CardTitle>
        <CardDescription className="text-gray-400 text-base">
          Generate secure OAuth magic links for seamless user authentication
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label htmlFor="email" className="text-gray-300 font-medium">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="user@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-700/50 border-gray-600/50 text-white placeholder:text-gray-400 h-12 focus:ring-2 focus:ring-red-500/50 transition-all duration-200"
          />
        </div>
        <Button
          onClick={generateMagicLink}
          className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white h-12 font-medium shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <Zap className="h-4 w-4 mr-2" />
          Generate Magic Link
        </Button>

        {magicLink && (
          <div className="space-y-3 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg">
            <Label className="text-gray-300 font-medium flex items-center gap-2">
              <Link className="h-4 w-4 text-green-400" />
              Generated Magic Link
            </Label>
            <div className="flex gap-3">
              <Textarea
                value={magicLink}
                readOnly
                className="min-h-[80px] bg-gray-700/50 border-gray-600/50 text-white font-mono text-sm"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => copyToClipboard(magicLink)}
                className="border-gray-600/50 text-gray-300 hover:bg-gray-700/50 h-12 w-12 shrink-0"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
