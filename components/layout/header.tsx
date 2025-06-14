"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Header() {
  const pathname = usePathname();

  // Don't show header on login/signup pages
  if (pathname === "/login" || pathname === "/signup") {
    return null;
  }

  return (
    <header className="bg-black text-white border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            서비스 로고
          </Link>
          <div className="flex items-center gap-6">
            <nav className="flex items-center gap-6">
              <Link
                href="/ranking"
                className="text-sm hover:text-gray-300 transition-colors"
              >
                Ranking
              </Link>
              <Link
                href="/posts"
                className="text-sm hover:text-gray-300 transition-colors"
              >
                Posts
              </Link>
              <Link
                href="/mypage"
                className="text-sm hover:text-gray-300 transition-colors"
              >
                My Page
              </Link>
            </nav>
            <Link href="/posts/write">
              <Button
                variant="secondary"
                size="sm"
                className="bg-white text-black hover:bg-gray-100 flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                New Post
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
