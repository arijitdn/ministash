import { Uploader } from "@/components/web/Uploader";

export default function Home() {
  return (
    <div className="max-w-2xl mx-auto flex min-h-screen flex-col items-center justify-center ">
      <h1 className="text-4xl font-bold pb-10">📂 MiniStash</h1>
      <Uploader />
    </div>
  );
}
