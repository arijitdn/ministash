"use client";

import { Button } from "@/components/ui/button";
import {
  Loader2,
  RefreshCcw,
  Trash2,
  Eye,
  EyeOff,
  Copy,
  Check,
  MoreVertical,
  Download,
  Share2,
  Lock,
  User,
  Upload,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

interface FileItem {
  key: string;
  url: string;
  size: number;
}

export function FileBrowser() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [copiedFileKey, setCopiedFileKey] = useState<string | null>(null);

  const router = useRouter();

  async function fetchFiles(refresh = false) {
    setLoading(true);
    try {
      const url = refresh ? "/api/s3/list?refresh=true" : "/api/s3/list";
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error("Failed to fetch files");
      }

      const data = await res.json();

      if (data) {
        const enhancedFiles = data.documents.map((file: any) => ({
          ...file,
          displayName: file.key.split("/")[1],
        }));

        setFiles(enhancedFiles);
      }
    } catch (error) {
      toast.error("Failed to load files. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function removeFile(fileKey: string) {
    try {
      setIsDeleting(true);
      const fileToRemove = files.find((f) => f.key === fileKey);
      if (fileToRemove) {
        if (fileToRemove.url) {
          URL.revokeObjectURL(fileToRemove.url);
        }
      }

      setFiles((prevFiles) =>
        prevFiles.map((f) => (f.key === fileKey ? { ...f } : f))
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
          prevFiles.map((f) => (f.key === fileKey ? { ...f } : f))
        );
        return;
      }

      setIsDeleting(false);
      setFiles((prevFiles) => prevFiles.filter((f) => f.key !== fileKey));
      toast.success("File removed successfully");
    } catch (error) {
      setIsDeleting(false);
      toast.error("Failed to remove file from storage.");
      setFiles((prevFiles) =>
        prevFiles.map((f) => (f.key === fileKey ? { ...f } : f))
      );
    }
  }

  const copyLink = async (url: string, fileKey: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedFileKey(fileKey);
      setTimeout(() => setCopiedFileKey(null), 2000);
      toast.success("Link copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <Link href="/" className="text-3xl font-bold flex items-center gap-4">
          <Image
            src="/icon.svg"
            alt="MiniStash"
            className="object-contain hidden md:block w-16"
            height={1000}
            width={1000}
          />
          MiniStash
        </Link>
        <div className="flex gap-4 items-center">
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.push("/profile")}
            className="cursor-pointer"
          >
            <User />
          </Button>
          <Button
            variant="outline"
            onClick={() => fetchFiles(true)}
            className="cursor-pointer"
          >
            <RefreshCcw /> <span className="hidden md:block">Refresh</span>
          </Button>
          <Button
            onClick={() => router.push("/upload")}
            className="cursor-pointer"
          >
            <Upload /> Upload
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin" />
          <span className="ml-2">Loading files...</span>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {files.length > 0 &&
            files.map((doc) => {
              return (
                <div
                  key={doc.key}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow duration-200 group"
                >
                  <div className="relative aspect-square rounded-lg overflow-hidden">
                    <a href={doc.url} target="_blank" rel="noopener noreferrer">
                      <img
                        src={doc.url || "/placeholder.svg"}
                        alt={doc.key.split("/")[1]}
                        className="w-full h-full object-cover"
                      />
                    </a>

                    {/* Action Menu */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="secondary"
                            size="icon"
                            className="h-8 w-8 bg-primary hover:bg-orange-400 cursor-pointer border-0"
                          >
                            <MoreVertical size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-48">
                          <DropdownMenuItem
                            onClick={() => copyLink(doc.url, doc.key)}
                          >
                            {copiedFileKey === doc.key ? (
                              <>
                                <Check
                                  size={16}
                                  className="mr-2 text-green-500"
                                />
                                Copied!
                              </>
                            ) : (
                              <>
                                <Copy size={16} className="mr-2" />
                                Copy Link
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/api/s3/download?key=${encodeURIComponent(doc.key)}`}
                            >
                              <Download size={16} className="mr-2" />
                              Download
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => removeFile(doc.key)}
                            className="text-red-600 focus:text-red-600"
                            disabled={isDeleting}
                          >
                            {isDeleting ? (
                              <Loader2 className="w-4 h-4 animate-spin mr-2" />
                            ) : (
                              <Trash2 className="w-4 h-4 mr-2" />
                            )}
                            {isDeleting ? "Deleting" : "Delete"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  <div className="p-3">
                    <div className="text-sm text-center text-gray-700 dark:text-gray-300 truncate mb-2">
                      {doc.key.split("/")[1]}
                    </div>

                    {/* Quick Actions */}
                    {/* Phone View */}
                    <div className="flex justify-center gap-1 md:hidden">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 px-2"
                              onClick={() => copyLink(doc.url, doc.key)}
                            >
                              {copiedFileKey === doc.key ? (
                                <Check size={12} className="text-green-500" />
                              ) : (
                                <Copy size={12} />
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              {copiedFileKey === doc.key
                                ? "Copied!"
                                : "Copy Link"}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 px-2"
                              asChild
                            >
                              <Link
                                href={`/api/s3/download?key=${encodeURIComponent(doc.key)}`}
                              >
                                <Download size={12} className="mr-1" />
                              </Link>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Download</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="destructive"
                              size="sm"
                              className="h-8 px-2"
                              onClick={() => removeFile(doc.key)}
                            >
                              <Trash2 size={12} className="mr-1" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Delete Document</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="hidden md:flex md:items-center gap-1 flex-col md:flex-row">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 h-8 text-xs"
                              onClick={() => copyLink(doc.url, doc.key)}
                            >
                              {copiedFileKey === doc.key ? (
                                <Check size={12} className="text-green-500" />
                              ) : (
                                <Copy size={12} />
                              )}
                              {copiedFileKey === doc.key
                                ? "Copied!"
                                : "Copy Link"}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Copy Link</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 px-2"
                              asChild
                            >
                              <Link
                                href={`/api/s3/download?key=${encodeURIComponent(doc.key)}`}
                              >
                                <Download size={12} className="mr-1" />
                              </Link>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Download</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="destructive"
                              size="sm"
                              className="h-8 px-2"
                              disabled={isDeleting}
                              onClick={() => removeFile(doc.key)}
                            >
                              {isDeleting ? (
                                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                              ) : (
                                <Trash2 size={12} className="mr-1" />
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Delete Document</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      )}

      {files.length === 0 && !loading && (
        <div className="text-center py-12 flex flex-col justify-center h-[60vh]">
          <div className="text-6xl mb-4">📁</div>
          <h3 className="text-xl font-medium mb-2">No files uploaded yet</h3>
          <p className="text-gray-500">Upload your first file to get started</p>
        </div>
      )}
    </div>
  );
}
