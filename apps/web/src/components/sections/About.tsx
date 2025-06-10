import { Check, Lock } from "lucide-react";

export const About = () => {
  return (
    <section id="about" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">
              Built for Modern File Management
            </h2>
            <p className="text-lg text-zinc-400 mb-6">
              MiniStash was created to solve the frustrations of traditional
              file storage. We believe file management should be simple, secure,
              and lightning-fast.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-500" />
                <span>99.9% uptime guarantee</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-500" />
                <span>Zero-knowledge encryption</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-500" />
                <span>GDPR & SOC 2 compliant</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-500" />
                <span>24/7 customer support</span>
              </div>
            </div>
          </div>
          <div className="bg-zinc-800/50 rounded-lg p-8 border border-zinc-700">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Your Privacy Matters</h3>
              <p className="text-zinc-400">
                We use client-side encryption, meaning only you can access your
                files. Not even we can see your data - that's our promise to
                you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
