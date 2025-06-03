import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { About } from "@/components/sections/About";
import { Pricing } from "@/components/sections/Pricing";
import { CTA } from "@/components/sections/CTA";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <Header />
      <Hero />
      <Features />
      <About />
      <Pricing />
      <CTA />
      <Footer />
    </div>
  );
}
