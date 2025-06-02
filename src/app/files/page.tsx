"use client";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Loader2, RefreshCcw, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function Files() {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(false);

  async function fetchFiles(refresh = false) {
    setLoading(true);
    const res = await fetch(`/api/s3/list${refresh ? "?refresh=true" : ""}`);
    const data = await res.json();
    setFiles(data.documents);
    setLoading(false);
  }

  async function removeFile(fileKey: string) {
    try {
      setIsDeleting(true);
      const fileToRemove = files.find((f) => f.key === fileKey);
      if (fileToRemove) {
        if (fileToRemove.objectUrl) {
          URL.revokeObjectURL(fileToRemove.objectUrl);
        }
      }

      setFiles((prevFiles) =>
        prevFiles.map((f) =>
          f.key === fileKey ? { ...f, isDeleting: true } : f
        )
      );

      const response = await fetch("/api/s3/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: fileToRemove?.key }),
      });

      if (!response.ok) {
        setIsDeleting(false);
        toast.error("Failed to remove file from storage.");
        setFiles((prevFiles) =>
          prevFiles.map((f) =>
            f.key === fileKey ? { ...f, isDeleting: false, error: true } : f
          )
        );
        return;
      }

      setIsDeleting(false);
      setFiles((prevFiles) => prevFiles.filter((f) => f.key !== fileKey)); // filter by key
      toast.success("File removed successfully");
    } catch (error) {
      setIsDeleting(false);
      toast.error("Failed to remove file from storage.");
      setFiles((prevFiles) =>
        prevFiles.map((f) =>
          f.key === fileKey ? { ...f, isDeleting: false, error: true } : f
        )
      );
    }
  }

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <Link href="/" className="text-3xl font-bold">
          📂 MiniStash
        </Link>
        <div className="flex gap-4 items-center">
          <ThemeToggle />
          <Button onClick={() => fetchFiles(true)}>
            <RefreshCcw /> Refresh
          </Button>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {files.map((doc) => {
            const fileName = doc.key.split("/").pop();
            const isImage = /\.(jpe?g|png|gif|webp)$/i.test(fileName);
            const isPdf = /\.pdf$/i.test(fileName);

            return (
              <div
                key={doc.key}
                className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow duration-200"
              >
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <a href={doc.url} target="_blank" rel="noopener noreferrer">
                    <img
                      src={doc.url}
                      alt={fileName}
                      className="w-full h-full object-cover"
                    />
                  </a>

                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => removeFile(doc.key)}
                    disabled={isDeleting}
                  >
                    {isDeleting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </Button>

                  {error && (
                    <div className="absolute inset-0 bg-red-500/50 flex items-center justify-center">
                      <div className="text-white font-medium">Error</div>
                    </div>
                  )}
                </div>

                {/* {isImage ? (
                    <img
                      src={doc.url}
                      alt={fileName}
                      className="w-full h-48 object-cover"
                    />
                  ) : isPdf ? (
                    <div className="w-full h-48 flex items-center justify-center bg-red-100">
                      <span className="text-red-600 font-bold">PDF</span>
                    </div>
                  ) : (
                    <div className="w-full h-48 flex items-center justify-center bg-gray-100">
                      <span className="text-gray-500 text-sm">No preview</span>
                    </div>
                  )} */}
                <div className="p-2 text-sm text-center text-gray-700 truncate">
                  {fileName}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
