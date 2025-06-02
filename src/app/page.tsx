import { SideIcons } from "@/components/SideIcons";
import { Uploader } from "@/components/web/Uploader";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <SideIcons />
      <div className="max-w-2xl mx-auto flex min-h-screen flex-col items-center justify-center ">
        <h1 className="text-4xl font-bold pb-10 flex items-center gap-4">
          <Image
            src="/icon.svg"
            alt="MiniStash"
            className="object-contain w-20"
            height={1000}
            width={1000}
          />
          MiniStash
        </h1>
        <Uploader />
      </div>
    </>
  );
}
