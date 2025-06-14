"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Search, Filter, SortAsc, Heart, MessageSquare, Flag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useToast } from "@/hooks/use-toast"

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
  excited: "🤩",
  confused: "😕",
  proud: "😤",
}

const emotionColors = {
  happy: "bg-yellow-100 text-yellow-800",
  sad: "bg-blue-100 text-blue-800",
  excited: "bg-purple-100 text-purple-800",
  confused: "bg-gray-100 text-gray-800",
  proud: "bg-green-100 text-green-800",
}

// Add predefined report reasons
const REPORT_REASONS = [
  { value: "hate_speech", label: "Hate Speech" },
  { value: "spam", label: "Spam" },
  { value: "inappropriate_content", label: "Inappropriate Content" },
  { value: "harassment", label: "Harassment or Bullying" },
  { value: "misinformation", label: "Misinformation" },
  { value: "copyright", label: "Copyright Violation" },
  { value: "off_topic", label: "Off Topic" },
  { value: "other", label: "Other" },
]

// Add ReportModal component
function ReportModal({
  targetType,
  targetId,
  trigger,
}: {
  targetType: "post" | "comment"
  targetId: string
  trigger: React.ReactNode
}) {
  const { toast } = useToast()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedReason, setSelectedReason] = useState("")
  const [customReason, setCustomReason] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async () => {
    if (!selectedReason) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Show success message after a brief delay
    setTimeout(() => {
      setIsOpen(false)
      setIsSubmitted(false)
      setSelectedReason("")
      setCustomReason("")
      toast({
        title: "Report Submitted",
        description: `Thank you for reporting this ${targetType}. Our moderators will review it shortly.`,
      })
    }, 1500)
  }

  const handleClose = () => {
    if (!isSubmitting && !isSubmitted) {
      setIsOpen(false)
      setSelectedReason("")
      setCustomReason("")
    }
  }

  const isSubmitDisabled = !selectedReason || isSubmitting || isSubmitted

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild onClick={() => setIsOpen(true)}>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Report {targetType === "post" ? "Post" : "Comment"}</DialogTitle>
          <DialogDescription>
            Help us maintain a positive community by reporting inappropriate content.
          </DialogDescription>
        </DialogHeader>

        {!isSubmitted ? (
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium mb-3 block">Why are you reporting this {targetType}?</Label>
              <RadioGroup value={selectedReason} onValueChange={setSelectedReason} className="space-y-2">
                {REPORT_REASONS.map((reason) => (
                  <div key={reason.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={reason.value} id={reason.value} />
                    <Label htmlFor={reason.value} className="text-sm font-normal cursor-pointer flex-1">
                      {reason.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {selectedReason === "other" && (
              <div className="space-y-2">
                <Label htmlFor="custom-reason" className="text-sm font-medium">
                  Please specify the reason
                </Label>
                <Textarea
                  id="custom-reason"
                  placeholder="Describe the issue..."
                  value={customReason}
                  onChange={(e) => setCustomReason(e.target.value)}
                  className="min-h-[80px]"
                />
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">Report Submitted</h3>
            <p className="text-sm text-gray-500">Thank you for helping us maintain a safe community.</p>
          </div>
        )}

        {!isSubmitted && (
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={handleClose} disabled={isSubmitting} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitDisabled} className="w-full sm:w-auto">
              {isSubmitting ? (
                <>
                  <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting...
                </>
              ) : (
                "Submit Report"
              )}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default function PostsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState("latest")
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 5

  // Mock posts data
  const allPosts: Post[] = [
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
      empathyCount: 18,
      commentCount: 12,
      emotionTag: "happy",
    },
    {
      id: "3",
      title: "JavaScript Performance Optimization Tips",
      content: "Here are some practical tips to optimize your JavaScript code for better performance...",
      author: "TechWizard",
      date: "2024-01-19",
      empathyCount: 31,
      commentCount: 15,
      emotionTag: "proud",
    },
    {
      id: "4",
      title: "Getting Started with TypeScript",
      content: "TypeScript adds static typing to JavaScript. Let's explore the basics...",
      author: "Anonymous",
      date: "2024-01-18",
      empathyCount: 12,
      commentCount: 6,
      emotionTag: "confused",
    },
    {
      id: "5",
      title: "Database Design Best Practices",
      content: "Good database design is crucial for application performance. Here's what you need to know...",
      author: "DataDriven",
      date: "2024-01-17",
      empathyCount: 19,
      commentCount: 9,
      emotionTag: "happy",
    },
    {
      id: "6",
      title: "Modern CSS Grid Techniques",
      content: "CSS Grid has changed how we approach layout design. Let's explore some advanced techniques...",
      author: "LayoutMaster",
      date: "2024-01-16",
      empathyCount: 15,
      commentCount: 7,
      emotionTag: "excited",
    },
    {
      id: "7",
      title: "API Design Principles",
      content: "Building great APIs requires careful planning and consideration. Here are the key principles...",
      author: "BackendPro",
      date: "2024-01-15",
      empathyCount: 22,
      commentCount: 11,
      emotionTag: "proud",
    },
    {
      id: "8",
      title: "State Management in React Applications",
      content: "Managing state effectively is crucial for React applications. Let's compare different approaches...",
      author: "StateManager",
      date: "2024-01-14",
      empathyCount: 28,
      commentCount: 14,
      emotionTag: "confused",
    },
    {
      id: "9",
      title: "Debugging Node.js Applications",
      content: "Effective debugging is essential for Node.js development. Here are some techniques I use...",
      author: "NodeNinja",
      date: "2024-01-13",
      empathyCount: 16,
      commentCount: 9,
      emotionTag: "sad",
    },
    {
      id: "10",
      title: "Web Accessibility Best Practices",
      content: "Making your web applications accessible is not just good practice, it's essential...",
      author: "A11yAdvocate",
      date: "2024-01-12",
      empathyCount: 25,
      commentCount: 13,
      emotionTag: "angry",
    },
  ]

  // Filter posts based on search term and emotion
  const filteredPosts = allPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesEmotion = selectedEmotion ? post.emotionTag === selectedEmotion : true

    return matchesSearch && matchesEmotion
  })

  // Sort posts
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === "latest") {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    } else if (sortBy === "empathy") {
      return b.empathyCount - a.empathyCount
    } else if (sortBy === "comments") {
      return b.commentCount - a.commentCount
    }
    return 0
  })

  // Paginate posts
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost)
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage)

  const emotions = [
    { value: "happy", label: "Happy 😊" },
    { value: "sad", label: "Sad 😢" },
    { value: "excited", label: "Excited 🤩" },
    { value: "confused", label: "Confused 😕" },
    { value: "proud", label: "Proud 😤" },
  ]

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">All Posts</h1>
          {/* Create Post 버튼 제거 */}
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="w-40">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">
                  <div className="flex items-center">
                    <SortAsc className="h-4 w-4 mr-2" />
                    <span>Latest</span>
                  </div>
                </SelectItem>
                <SelectItem value="empathy">
                  <div className="flex items-center">
                    <Heart className="h-4 w-4 mr-2" />
                    <span>Most Empathy</span>
                  </div>
                </SelectItem>
                <SelectItem value="comments">
                  <div className="flex items-center">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    <span>Most Comments</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Emotion Filter Labels */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedEmotion === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedEmotion(null)}
              className="flex items-center gap-2"
            >
              All
            </Button>
            {emotions.map((emotion) => (
              <Button
                key={emotion.value}
                variant={selectedEmotion === emotion.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedEmotion(emotion.value)}
                className="flex items-center gap-2"
              >
                <span>{emotion.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
          <Filter className="h-4 w-4" />
          <span>
            {filteredPosts.length} posts found
            {searchTerm && ` for "${searchTerm}"`}
            {selectedEmotion && ` with emotion "${selectedEmotion}"`}
          </span>
          <span className="mx-2">•</span>
          <SortAsc className="h-4 w-4" />
          <span>
            Sorted by {sortBy === "latest" ? "latest" : sortBy === "empathy" ? "most empathy" : "most comments"}
          </span>
        </div>

        {/* Posts List */}
        <div className="space-y-4 mb-8">
          {currentPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-gray-200 text-gray-600 font-medium">
                      {post.author.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <Link href={`/posts/${post.id}`} className="font-semibold hover:text-blue-600 transition-colors">
                        {post.title}
                      </Link>
                      <Badge className={`${emotionColors[post.emotionTag]} text-xs`}>
                        {emotionEmojis[post.emotionTag]} {post.emotionTag}
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{post.content}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="font-medium">{post.author}</span>
                        <span>{post.date}</span>
                        <div className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          <span>{post.empathyCount}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          <span>{post.commentCount}</span>
                        </div>
                      </div>
                      <ReportModal
                        targetType="post"
                        targetId={post.id}
                        trigger={
                          <Button variant="ghost" size="sm" className="h-auto p-1 text-gray-400 hover:text-red-600">
                            <Flag className="h-3 w-3" />
                          </Button>
                        }
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (currentPage > 1) setCurrentPage(currentPage - 1)
                  }}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum
                if (totalPages <= 5) {
                  pageNum = i + 1
                } else if (currentPage <= 3) {
                  pageNum = i + 1
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i
                } else {
                  pageNum = currentPage - 2 + i
                }

                return (
                  <PaginationItem key={i}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        setCurrentPage(pageNum)
                      }}
                      isActive={currentPage === pageNum}
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                )
              })}

              {totalPages > 5 && currentPage < totalPages - 2 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                  }}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </main>
    </div>
  )
}
