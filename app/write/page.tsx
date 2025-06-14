"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Upload, X, Eye } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

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

export default function CreatePostPage() {
  const router = useRouter()
  const { toast } = useToast()

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [emotion, setEmotion] = useState<string | undefined>()
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [previewOpen, setPreviewOpen] = useState(false)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive",
      })
      return
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Image must be less than 5MB",
        variant: "destructive",
      })
      return
    }

    setImageFile(file)
    const objectUrl = URL.createObjectURL(file)
    setImageUrl(objectUrl)
  }

  const removeImage = () => {
    setImageUrl(null)
    setImageFile(null)
  }

  const handlePreview = () => {
    if (!title.trim()) {
      toast({
        title: "Title required",
        description: "Please enter a title for your post",
        variant: "destructive",
      })
      return
    }

    if (!content.trim()) {
      toast({
        title: "Content required",
        description: "Please enter content for your post",
        variant: "destructive",
      })
      return
    }

    setPreviewOpen(true)
  }

  const handleSubmit = () => {
    toast({
      title: "Post created",
      description: "Your post has been created successfully",
    })

    // Redirect to posts page
    router.push("/posts")
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/posts">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Posts
            </Button>
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-2xl font-bold">Create a New Post</h1>
          <p className="text-gray-600">Share your knowledge with the community</p>
        </div>

        <div className="space-y-6">
          {/* Title Input */}
          <div className="space-y-2">
            <Label htmlFor="title">Post Title</Label>
            <Input
              id="title"
              placeholder="Enter a descriptive title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-lg"
            />
          </div>

          {/* Content Textarea */}
          <div className="space-y-2">
            <Label htmlFor="content">Post Content</Label>
            <Textarea
              id="content"
              placeholder="Write your post content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[300px] text-base whitespace-pre-wrap"
            />
          </div>

          {/* Emotion Select */}
          <div className="space-y-2">
            <Label htmlFor="emotion">How are you feeling about this post? (Optional)</Label>
            <Select value={emotion} onValueChange={setEmotion}>
              <SelectTrigger id="emotion">
                <SelectValue placeholder="Select an emotion (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="happy">😊 Happy</SelectItem>
                <SelectItem value="sad">😢 Sad</SelectItem>
                <SelectItem value="excited">🤩 Excited</SelectItem>
                <SelectItem value="confused">😕 Confused</SelectItem>
                <SelectItem value="proud">😤 Proud</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label>Image Upload (Optional)</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              {imageUrl ? (
                <div className="relative">
                  <img
                    src={imageUrl || "/placeholder.svg"}
                    alt="Post image preview"
                    className="w-full h-auto rounded-md"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8"
                    onClick={removeImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-4">
                  <div className="bg-gray-100 rounded-full p-3 mb-3">
                    <Upload className="h-6 w-6 text-gray-500" />
                  </div>
                  <p className="text-sm font-medium mb-1">Drag and drop an image or click to browse</p>
                  <p className="text-xs text-gray-500 mb-4">PNG, JPG or GIF (max 5MB)</p>
                  <Button type="button" variant="outline" size="sm" asChild>
                    <label>
                      Browse Files
                      <input type="file" accept="image/*" className="sr-only" onChange={handleImageUpload} />
                    </label>
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Preview Button */}
          <div className="flex justify-end">
            <Button onClick={handlePreview} className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <span>Preview Post</span>
            </Button>
          </div>
        </div>

        {/* Preview Dialog */}
        <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Post Preview</DialogTitle>
              <DialogDescription>This is how your post will appear to others</DialogDescription>
            </DialogHeader>

            <div className="py-4 space-y-4">
              {/* Post Title */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold flex-1">{title}</h2>
                  {emotion && (
                    <Badge className={`${emotionColors[emotion as keyof typeof emotionColors]} text-xs ml-4`}>
                      {emotionEmojis[emotion as keyof typeof emotionEmojis]} {emotion}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Post Content */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="prose max-w-none">
                  {content.split("\n").map((line, index) => (
                    <p key={index} className="mb-2 last:mb-0">
                      {line || <br />}
                    </p>
                  ))}
                </div>
              </div>

              {/* Post Image */}
              {imageUrl && (
                <div className="border border-gray-200 rounded-lg p-4">
                  <img src={imageUrl || "/placeholder.svg"} alt="Post image" className="w-full h-auto rounded-md" />
                </div>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setPreviewOpen(false)}>
                Edit Post
              </Button>
              <Button onClick={handleSubmit}>Publish Post</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}
