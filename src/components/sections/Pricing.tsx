import { Button } from "../ui/button";
import { Check } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { plans } from "@/lib/plans";

export const Pricing = () => {
  return (
    <section id="pricing" className="py-20 px-4 bg-zinc-800/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-zinc-400">
            Choose the plan that fits your needs. Upgrade or downgrade anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {/* FREE Tier */}
          <Card className="bg-zinc-800/50 border-zinc-700 relative">
            <CardHeader>
              <CardTitle className="text-center">FREE</CardTitle>
              <div className="text-center">
                <span className="text-3xl font-bold">₹0</span>
                <span className="text-zinc-400">/month</span>
              </div>
              <CardDescription className="text-center text-zinc-400">
                Perfect for personal use
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">
                    {plans.FREE.storageLimit} MB storage
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">
                    {plans.FREE.filesLimit} files limit
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">
                    Upload {plans.FREE.uploadLimit} files at a time
                  </span>
                </li>
              </ul>
              <Button className="w-full" variant="outline">
                Get Started
              </Button>
            </CardContent>
          </Card>

          {/* BASIC Tier */}
          <Card className="bg-zinc-800/50 border-zinc-700">
            <CardHeader>
              <CardTitle className="text-center">BASIC</CardTitle>
              <div className="text-center">
                <span className="text-3xl font-bold">₹{plans.BASIC.price}</span>
                <span className="text-zinc-400">/month</span>
              </div>
              <CardDescription className="text-center text-zinc-400">
                Great for individuals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">
                    {plans.BASIC.storageLimit / 1000} GB storage
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">
                    {plans.BASIC.filesLimit} files limit
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">
                    Upload {plans.BASIC.uploadLimit} files at a time
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Email support</span>
                </li>
              </ul>
              <Button className="w-full bg-red-600 hover:bg-red-700">
                Choose Basic
              </Button>
            </CardContent>
          </Card>

          {/* PRO Tier */}
          <Card className="bg-zinc-800/50 border-red-600 relative">
            <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-red-600">
              Most Popular
            </Badge>
            <CardHeader>
              <CardTitle className="text-center">PRO</CardTitle>
              <div className="text-center">
                <span className="text-3xl font-bold">₹{plans.PRO.price}</span>
                <span className="text-zinc-400">/month</span>
              </div>
              <CardDescription className="text-center text-zinc-400">
                Perfect for professionals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">
                    {plans.PRO.storageLimit / 1000} GB storage
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">{plans.PRO.filesLimit} files</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">
                    Upload {plans.PRO.uploadLimit} files at a time
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Priority support</span>
                </li>
              </ul>
              <Button className="w-full bg-red-600 hover:bg-red-700">
                Choose Pro
              </Button>
            </CardContent>
          </Card>

          {/* CUSTOM Tier */}
          <Card className="bg-zinc-800/50 border-zinc-700">
            <CardHeader>
              <CardTitle className="text-center">CUSTOM</CardTitle>
              <div className="text-center">
                <span className="text-3xl font-bold">Custom</span>
                <span className="text-zinc-400 block">pricing</span>
              </div>
              <CardDescription className="text-center text-zinc-400">
                For large organizations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Unlimited storage</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Unlimited files</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Enterprise features</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">24/7 phone support</span>
                </li>
              </ul>
              <Button className="w-full" variant="outline">
                Contact Sales
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
