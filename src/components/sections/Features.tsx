import {
  BadgeDollarSign,
  Code,
  Globe,
  Shield,
  Upload,
  Zap,
} from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

export const Features = () => {
  return (
    <section id="features" className="py-20 px-4 bg-zinc-800/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Why Choose MiniStash?</h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Built for speed, security, and simplicity. Everything you need to
            manage your files efficiently.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="bg-zinc-800/50 border-zinc-700">
            <CardHeader>
              <Upload className="h-12 w-12 text-red-500 mb-4" />
              <CardTitle>Lightning Fast Uploads</CardTitle>
              <CardDescription className="text-zinc-400">
                Drag and drop files for instant uploads with our optimized
                infrastructure
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-zinc-800/50 border-zinc-700">
            <CardHeader>
              <Shield className="h-12 w-12 text-red-500 mb-4" />
              <CardTitle>Bank-Grade Security</CardTitle>
              <CardDescription className="text-zinc-400">
                End-to-end encryption ensures your files are always protected
                and private
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-zinc-800/50 border-zinc-700">
            <CardHeader>
              <Globe className="h-12 w-12 text-red-500 mb-4" />
              <CardTitle>Global Access</CardTitle>
              <CardDescription className="text-zinc-400">
                Access your files from anywhere with our worldwide CDN network
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-zinc-800/50 border-zinc-700">
            <CardHeader>
              <Zap className="h-12 w-12 text-red-500 mb-4" />
              <CardTitle>Instant Sharing</CardTitle>
              <CardDescription className="text-zinc-400">
                Generate secure share links in seconds with customizable
                permissions
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-zinc-800/50 border-zinc-700">
            <CardHeader>
              <Code className="h-12 w-12 text-red-500 mb-4" />
              <CardTitle>Node.js SDK</CardTitle>
              <CardDescription className="text-zinc-400">
                Your own development storage solution with our @ministash/node
                sdk
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-zinc-800/50 border-zinc-700">
            <CardHeader>
              <BadgeDollarSign className="h-12 w-12 text-red-500 mb-4" />
              <CardTitle>Competitive Pricing</CardTitle>
              <CardDescription className="text-zinc-400">
                Our pricing are cheaper and reliable than any other service
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  );
};
