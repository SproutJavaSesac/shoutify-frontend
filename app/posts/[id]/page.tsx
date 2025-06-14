"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { ArrowLeft, Flag, MessageSquare, Heart, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useToast } from "@/hooks/use-toast"

interface Comment {
  id: string
  author: string
  content: string
  timestamp: Date
  replies: Reply[]
  emotions: { [key: string]: number }
  userEmotion?: string
}

interface Reply {
  id: string
  author: string
  content: string
  timestamp: Date
  replies: Reply[]
  emotions: { [key: string]: number }
  userEmotion?: string
}

// Add this interface for report data
interface ReportData {
  reason: string
  customReason?: string
  targetType: "post" | "comment"
  targetId: string
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

// Add EmotionSelector component for comments
function EmotionSelector({
  emotions,
  userEmotion,
  onEmotionSelect,
}: {
  emotions: { [key: string]: number }
  userEmotion?: string
  onEmotionSelect: (emotion: string) => void
}) {
  const emotionEmojis = {
    happy: "😊",
    sad: "😢",
    excited: "🤩",
    confused: "😕",
    proud: "😤",
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="h-auto p-1 text-gray-500 hover:text-gray-700">
          <Plus className="h-3 w-3 mr-1" />
          <span className="text-xs">React</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2" align="start">
        <div className="flex gap-1">
          {Object.entries(emotionEmojis).map(([emotion, emoji]) => {
            const count = emotions[emotion] || 0
            const isSelected = userEmotion === emotion

            return (
              <Button
                key={emotion}
                variant="ghost"
                size="sm"
                className={`p-2 h-auto ${isSelected ? "bg-blue-100" : ""}`}
                onClick={() => onEmotionSelect(emotion)}
              >
                <span className="text-lg">{emoji}</span>
              </Button>
            )
          })}
        </div>
      </PopoverContent>
    </Popover>
  )
}

// Update the main component to use the new ReportModal
export default function PostDetailPage({ params }: { params: { id: string } }) {
  const { toast } = useToast()
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null)
  const [emotionCounts, setEmotionCounts] = useState({
    happy: 12,
    sad: 2,
    excited: 8,
    confused: 3,
    proud: 5,
  })

  const emotionEmojis = {
    happy: "😊",
    sad: "😢",
    excited: "🤩",
    confused: "😕",
    proud: "😤",
  }

  // Mock data for the post
  const post = {
    id: params.id,
    title: "Understanding React Hooks in Depth",
    content: `React Hooks have revolutionized how we write components. They allow function components to have state and use other React features that were previously only available in class components. This makes your code more reusable and easier to understand.

Hooks solve many problems that developers face when building React applications, such as wrapper hell from render props and higher-order components, duplicate logic in component lifecycle methods, and complex components that are hard to understand.

The most commonly used hooks are useState and useEffect. useState lets you add state to function components, while useEffect lets you perform side effects in function components.`,
    author: "Anonymous",
    timestamp: new Date("2023-05-15T09:30:00"),
    empathyCount: 31,
    commentCount: 8,
    badgeInfo: "Trending",
  }

  // Mock data for comments with emotions
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "c1",
      author: "Anonymous",
      content: "This is a great explanation of React Hooks! I've been struggling to understand them for a while.",
      timestamp: new Date("2023-05-15T10:15:00"),
      emotions: { happy: 3, excited: 2 },
      userEmotion: undefined,
      replies: [
        {
          id: "r1",
          author: "Anonymous",
          content: "I agree! The explanation of useEffect was particularly helpful.",
          timestamp: new Date("2023-05-15T10:30:00"),
          emotions: { happy: 1 },
          userEmotion: undefined,
          replies: [
            {
              id: "r1-1",
              author: "Anonymous",
              content: "Yes, and the examples were very clear too!",
              timestamp: new Date("2023-05-15T10:45:00"),
              emotions: { proud: 1 },
              userEmotion: undefined,
              replies: [],
            },
          ],
        },
      ],
    },
    {
      id: "c2",
      author: "Anonymous",
      content: "Could you elaborate more on the useContext hook? I'm still not sure when to use it.",
      timestamp: new Date("2023-05-15T11:45:00"),
      emotions: { confused: 2 },
      userEmotion: undefined,
      replies: [],
    },
  ])

  const [newComment, setNewComment] = useState("")
  const [replyingTo, setReplyingTo] = useState<{ commentId: string; replyId?: string } | null>(null)
  const [replyContent, setReplyContent] = useState("")

  const handleAddComment = () => {
    if (!newComment.trim()) return

    const comment: Comment = {
      id: `c${comments.length + 1}`,
      author: "Anonymous",
      content: newComment,
      timestamp: new Date(),
      emotions: {},
      userEmotion: undefined,
      replies: [],
    }

    setComments([...comments, comment])
    setNewComment("")
  }

  const handleAddReply = (commentId: string, parentReplyId?: string) => {
    if (!replyContent.trim()) return

    const reply: Reply = {
      id: `r${Math.random().toString(36).substr(2, 9)}`,
      author: "Anonymous",
      content: replyContent,
      timestamp: new Date(),
      emotions: {},
      userEmotion: undefined,
      replies: [],
    }

    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        if (parentReplyId) {
          // Adding a nested reply
          const updateReplies = (replies: Reply[]): Reply[] => {
            return replies.map((r) => {
              if (r.id === parentReplyId) {
                return { ...r, replies: [...r.replies, reply] }
              }
              return r
            })
          }
          return { ...comment, replies: updateReplies(comment.replies) }
        } else {
          // Adding a direct reply to comment
          return { ...comment, replies: [...comment.replies, reply] }
        }
      }
      return comment
    })

    setComments(updatedComments)
    setReplyingTo(null)
    setReplyContent("")
  }

  const handleEmotionSelect = (emotion: string) => {
    const previousEmotion = selectedEmotion

    // Update emotion counts
    setEmotionCounts((prev) => {
      const newCounts = { ...prev }

      // Remove previous emotion count
      if (previousEmotion) {
        newCounts[previousEmotion as keyof typeof newCounts] = Math.max(
          0,
          newCounts[previousEmotion as keyof typeof newCounts] - 1,
        )
      }

      // Add new emotion count (or remove if clicking same emotion)
      if (emotion !== previousEmotion) {
        newCounts[emotion as keyof typeof newCounts] = newCounts[emotion as keyof typeof newCounts] + 1
        setSelectedEmotion(emotion)
        toast({
          title: "Reaction Added",
          description: `You reacted with ${emotion} to this post.`,
        })
      } else {
        setSelectedEmotion(null)
        toast({
          title: "Reaction Removed",
          description: "Your reaction has been removed.",
        })
      }

      return newCounts
    })

    if (emotion === previousEmotion) {
      setSelectedEmotion(null)
    }
  }

  const handleCommentEmotionSelect = (commentId: string, emotion: string, replyId?: string, nestedReplyId?: string) => {
    setComments((prevComments) => {
      return prevComments.map((comment) => {
        if (comment.id === commentId) {
          if (nestedReplyId) {
            // Handle nested reply emotion
            const updateNestedReplies = (replies: Reply[]): Reply[] => {
              return replies.map((reply) => {
                if (reply.id === replyId) {
                  return {
                    ...reply,
                    replies: reply.replies.map((nestedReply) => {
                      if (nestedReply.id === nestedReplyId) {
                        const newEmotions = { ...nestedReply.emotions }
                        const previousEmotion = nestedReply.userEmotion

                        // Remove previous emotion
                        if (previousEmotion) {
                          newEmotions[previousEmotion] = Math.max(0, (newEmotions[previousEmotion] || 0) - 1)
                        }

                        // Add new emotion or remove if same
                        if (emotion !== previousEmotion) {
                          newEmotions[emotion] = (newEmotions[emotion] || 0) + 1
                          return { ...nestedReply, emotions: newEmotions, userEmotion: emotion }
                        } else {
                          return { ...nestedReply, emotions: newEmotions, userEmotion: undefined }
                        }
                      }
                      return nestedReply
                    }),
                  }
                }
                return reply
              })
            }
            return { ...comment, replies: updateNestedReplies(comment.replies) }
          } else if (replyId) {
            // Handle reply emotion
            const updateReplies = (replies: Reply[]): Reply[] => {
              return replies.map((reply) => {
                if (reply.id === replyId) {
                  const newEmotions = { ...reply.emotions }
                  const previousEmotion = reply.userEmotion

                  // Remove previous emotion
                  if (previousEmotion) {
                    newEmotions[previousEmotion] = Math.max(0, (newEmotions[previousEmotion] || 0) - 1)
                  }

                  // Add new emotion or remove if same
                  if (emotion !== previousEmotion) {
                    newEmotions[emotion] = (newEmotions[emotion] || 0) + 1
                    return { ...reply, emotions: newEmotions, userEmotion: emotion }
                  } else {
                    return { ...reply, emotions: newEmotions, userEmotion: undefined }
                  }
                }
                return reply
              })
            }
            return { ...comment, replies: updateReplies(comment.replies) }
          } else {
            // Handle comment emotion
            const newEmotions = { ...comment.emotions }
            const previousEmotion = comment.userEmotion

            // Remove previous emotion
            if (previousEmotion) {
              newEmotions[previousEmotion] = Math.max(0, (newEmotions[previousEmotion] || 0) - 1)
            }

            // Add new emotion or remove if same
            if (emotion !== previousEmotion) {
              newEmotions[emotion] = (newEmotions[emotion] || 0) + 1
              return { ...comment, emotions: newEmotions, userEmotion: emotion }
            } else {
              return { ...comment, emotions: newEmotions, userEmotion: undefined }
            }
          }
        }
        return comment
      })
    })

    toast({
      title: "Reaction Added",
      description: `You reacted with ${emotion} to the comment.`,
    })
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Link href="/posts">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Posts
          </Button>
        </Link>
      </div>

      {/* Post Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <span className="font-medium">{post.author}</span>
            <span>•</span>
            <span>2025-06-03 09:43</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart className="h-4 w-4" />
            <span>{Object.values(emotionCounts).reduce((sum, count) => sum + count, 0)}</span>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <div className="prose max-w-none mb-8">
        <p className="whitespace-pre-line">{post.content}</p>
      </div>

      {/* Reaction Bar - update the report button */}
      <Card className="mb-8">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex flex-wrap gap-2">
              {Object.entries(emotionCounts).map(([emotion, count]) => {
                const emoji = emotionEmojis[emotion as keyof typeof emotionEmojis]
                const isSelected = selectedEmotion === emotion

                return (
                  <Button
                    key={emotion}
                    variant={isSelected ? "default" : "outline"}
                    size="sm"
                    className={`px-3 ${isSelected ? "bg-blue-100 border-blue-300 text-blue-700" : ""}`}
                    onClick={() => handleEmotionSelect(emotion)}
                  >
                    <span className="text-lg mr-1">{emoji}</span>
                    <span className="text-xs capitalize mr-1">{emotion}</span>
                    {count > 0 && <span className="text-xs font-medium">({count})</span>}
                  </Button>
                )
              })}
            </div>

            <div className="ml-auto">
              <ReportModal
                targetType="post"
                targetId={post.id}
                trigger={
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 text-red-600 hover:text-red-700"
                  >
                    <Flag className="h-4 w-4" />
                    <span>Report</span>
                  </Button>
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator className="my-6" />

      {/* Comments Section - add emotion buttons to comments */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-6">Comments ({comments.length})</h2>
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="space-y-4">
              {/* Comment */}
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-gray-200 text-gray-600">{comment.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{comment.author}</span>
                        <span className="text-xs text-gray-500">
                          {formatDistanceToNow(comment.timestamp, { addSuffix: true })}
                        </span>
                      </div>
                      <ReportModal
                        targetType="comment"
                        targetId={comment.id}
                        trigger={
                          <Button variant="ghost" size="sm" className="h-auto p-1 text-gray-400 hover:text-red-600">
                            <Flag className="h-3 w-3" />
                          </Button>
                        }
                      />
                    </div>
                    <p className="text-sm mb-2">{comment.content}</p>

                    {/* Comment emotions display */}
                    {Object.keys(comment.emotions).length > 0 && (
                      <div className="flex items-center gap-1 mb-2">
                        {Object.entries(comment.emotions).map(([emotion, count]) => {
                          if (count > 0) {
                            const emoji = emotionEmojis[emotion as keyof typeof emotionEmojis]
                            return (
                              <span key={emotion} className="text-xs bg-gray-200 rounded-full px-2 py-1">
                                {emoji} {count}
                              </span>
                            )
                          }
                          return null
                        })}
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 text-xs text-gray-500"
                        onClick={() => setReplyingTo({ commentId: comment.id })}
                      >
                        Reply
                      </Button>
                      <EmotionSelector
                        emotions={comment.emotions}
                        userEmotion={comment.userEmotion}
                        onEmotionSelect={(emotion) => handleCommentEmotionSelect(comment.id, emotion)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Reply Input */}
              {replyingTo?.commentId === comment.id && !replyingTo?.replyId && (
                <div className="ml-10 mt-2">
                  <Textarea
                    placeholder="Write a reply..."
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    className="min-h-[80px] mb-2"
                  />
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => setReplyingTo(null)}>
                      Cancel
                    </Button>
                    <Button size="sm" onClick={() => handleAddReply(comment.id)}>
                      Reply
                    </Button>
                  </div>
                </div>
              )}

              {/* Replies */}
              {comment.replies.length > 0 && (
                <div className="ml-10 space-y-4">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="space-y-4">
                      <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-gray-200 text-gray-600">
                              {reply.author.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{reply.author}</span>
                                <span className="text-xs text-gray-500">
                                  {formatDistanceToNow(reply.timestamp, { addSuffix: true })}
                                </span>
                              </div>
                              <ReportModal
                                targetType="comment"
                                targetId={reply.id}
                                trigger={
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-auto p-1 text-gray-400 hover:text-red-600"
                                  >
                                    <Flag className="h-3 w-3" />
                                  </Button>
                                }
                              />
                            </div>
                            <p className="text-sm mb-2">{reply.content}</p>

                            {/* Reply emotions display */}
                            {Object.keys(reply.emotions).length > 0 && (
                              <div className="flex items-center gap-1 mb-2">
                                {Object.entries(reply.emotions).map(([emotion, count]) => {
                                  if (count > 0) {
                                    const emoji = emotionEmojis[emotion as keyof typeof emotionEmojis]
                                    return (
                                      <span key={emotion} className="text-xs bg-gray-200 rounded-full px-2 py-1">
                                        {emoji} {count}
                                      </span>
                                    )
                                  }
                                  return null
                                })}
                              </div>
                            )}

                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-auto p-0 text-xs text-gray-500"
                                onClick={() => setReplyingTo({ commentId: comment.id, replyId: reply.id })}
                              >
                                Reply
                              </Button>
                              <EmotionSelector
                                emotions={reply.emotions}
                                userEmotion={reply.userEmotion}
                                onEmotionSelect={(emotion) => handleCommentEmotionSelect(comment.id, emotion, reply.id)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Reply Input for nested reply */}
                      {replyingTo?.commentId === comment.id && replyingTo?.replyId === reply.id && (
                        <div className="ml-10 mt-2">
                          <Textarea
                            placeholder="Write a reply..."
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            className="min-h-[80px] mb-2"
                          />
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" onClick={() => setReplyingTo(null)}>
                              Cancel
                            </Button>
                            <Button size="sm" onClick={() => handleAddReply(comment.id, reply.id)}>
                              Reply
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* Nested Replies (Level 2) - also add emotion buttons */}
                      {reply.replies.length > 0 && (
                        <div className="ml-10 space-y-4">
                          {reply.replies.map((nestedReply) => (
                            <div key={nestedReply.id} className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                              <div className="flex items-start gap-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback className="bg-gray-200 text-gray-600">
                                    {nestedReply.author.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-1">
                                    <div className="flex items-center gap-2">
                                      <span className="font-medium">{nestedReply.author}</span>
                                      <span className="text-xs text-gray-500">
                                        {formatDistanceToNow(nestedReply.timestamp, { addSuffix: true })}
                                      </span>
                                    </div>
                                    <ReportModal
                                      targetType="comment"
                                      targetId={nestedReply.id}
                                      trigger={
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="h-auto p-1 text-gray-400 hover:text-red-600"
                                        >
                                          <Flag className="h-3 w-3" />
                                        </Button>
                                      }
                                    />
                                  </div>
                                  <p className="text-sm mb-2">{nestedReply.content}</p>

                                  {/* Nested reply emotions display */}
                                  {Object.keys(nestedReply.emotions).length > 0 && (
                                    <div className="flex items-center gap-1 mb-2">
                                      {Object.entries(nestedReply.emotions).map(([emotion, count]) => {
                                        if (count > 0) {
                                          const emoji = emotionEmojis[emotion as keyof typeof emotionEmojis]
                                          return (
                                            <span key={emotion} className="text-xs bg-gray-200 rounded-full px-2 py-1">
                                              {emoji} {count}
                                            </span>
                                          )
                                        }
                                        return null
                                      })}
                                    </div>
                                  )}

                                  <EmotionSelector
                                    emotions={nestedReply.emotions}
                                    userEmotion={nestedReply.userEmotion}
                                    onEmotionSelect={(emotion) =>
                                      handleCommentEmotionSelect(comment.id, emotion, reply.id, nestedReply.id)
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Add Comment */}
      <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
        <h3 className="text-lg font-medium mb-3">Add a comment</h3>
        <Textarea
          placeholder="Write your comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="min-h-[120px] mb-3"
        />
        <div className="flex justify-end">
          <Button onClick={handleAddComment} className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span>Submit</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
