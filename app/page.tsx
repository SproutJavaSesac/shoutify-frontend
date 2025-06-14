"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { MessageSquare, Heart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Post {
  id: string
  title: string
  content: string
  author: string
  date: string
  empathyCount: number
  commentCount: number
  emotionTag: "happy" | "sad" | "angry" | "excited" | "confused" | "proud"
}

const emotionEmojis = {
  happy: "😊",
  sad: "😢",
  angry: "😠",
  excited: "🤩",
  confused: "😕",
  proud: "😤",
}

const emotionColors = {
  happy: "bg-yellow-100 text-yellow-800",
  sad: "bg-blue-100 text-blue-800",
  angry: "bg-red-100 text-red-800",
  excited: "bg-purple-100 text-purple-800",
  confused: "bg-gray-100 text-gray-800",
  proud: "bg-green-100 text-green-800",
}

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)

  // Mock initial posts
  const initialPosts: Post[] = [
    {
      id: "1",
      title: "Understanding React Hooks in Depth",
      content: "React Hooks have revolutionized how we write components. Let me share some advanced patterns...",
      author: "CodeMaster",
      date: "2024-01-21",
      empathyCount: 31,
      commentCount: 8,
      emotionTag: "excited",
    },
    {
      id: "2",
      title: "Building Responsive Layouts with Tailwind CSS",
      content: "Tailwind CSS makes it incredibly easy to build responsive designs. Here are some tips...",
      author: "DevGuru",
      date: "2024-01-20",
      empathyCount: 24,
      commentCount: 12,
      emotionTag: "happy",
    },
    {
      id: "3",
      title: "JavaScript Performance Optimization Tips",
      content: "Here are some practical tips to optimize your JavaScript code for better performance...",
      author: "TechWizard",
      date: "2024-01-19",
      empathyCount: 42,
      commentCount: 15,
      emotionTag: "proud",
    },
    {
      id: "4",
      title: "Getting Started with TypeScript",
      content: "TypeScript adds static typing to JavaScript. Let's explore the basics...",
      author: "Anonymous",
      date: "2024-01-18",
      empathyCount: 18,
      commentCount: 6,
      emotionTag: "confused",
    },
    {
      id: "5",
      title: "Database Design Best Practices",
      content: "Good database design is crucial for application performance. Here's what you need to know...",
      author: "DataDriven",
      date: "2024-01-17",
      empathyCount: 27,
      commentCount: 9,
      emotionTag: "happy",
    },
  ]

  useEffect(() => {
    setPosts(initialPosts)
  }, [])

  const loadMorePosts = async () => {
    setLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const emotions = ["happy", "sad", "angry", "excited", "confused", "proud"] as const
    const newPosts: Post[] = Array.from({ length: 5 }, (_, i) => ({
      id: `${posts.length + i + 1}`,
      title: `New Post ${posts.length + i + 1}`,
      content: "This is a newly loaded post from the Load More button...",
      author: "NewUser",
      date: "2024-01-16",
      empathyCount: Math.floor(Math.random() * 50),
      commentCount: Math.floor(Math.random() * 20),
      emotionTag: emotions[Math.floor(Math.random() * emotions.length)],
    }))

    setPosts((prev) => [...prev, ...newPosts])
    setPage((prev) => prev + 1)
    setLoading(false)
  }

  useEffect(() => {}, [loading, posts])

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Share Knowledge, Build Community</h1>
          <p className="text-gray-600 mb-8">Connect with developers, share insights, and learn together</p>
        </div>

        {/* Posts Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Recent Posts</h2>
          </div>

          {/* Posts List */}
          <div className="space-y-4">
            {posts.map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Link
                          href={`/posts/${post.id}`}
                          className="font-semibold hover:text-blue-600 transition-colors"
                        >
                          {post.title}
                        </Link>
                        <Badge className={`${emotionColors[post.emotionTag]} text-xs`}>
                          {emotionEmojis[post.emotionTag]} {post.emotionTag}
                        </Badge>
                      </div>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{post.content}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>2025.06.02 15:32</span>
                        <div className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          <span>{post.empathyCount}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          <span>{post.commentCount}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center py-8">
            <Button onClick={loadMorePosts} disabled={loading} className="px-8 py-2">
              {loading ? (
                <>
                  <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Loading...
                </>
              ) : (
                "Load More Posts"
              )}
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-16">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center text-sm text-gray-500">
            <div className="mb-4">
              <Link href="/about" className="text-blue-600 hover:text-blue-800 hover:underline">
                About
              </Link>
            </div>
            <p>© 2024 Community Platform. Built for developers, by developers.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
