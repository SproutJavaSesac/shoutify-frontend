"use client"

import { useState } from "react"
import { AlertTriangle, Users, Settings, Ban, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

interface Report {
  id: string
  type: "post" | "comment"
  contentId: string
  contentTitle: string
  reportReason: string
  reportedBy: string
  reportedUser: string
  timestamp: Date
  status: "pending" | "resolved" | "dismissed"
}

interface User {
  id: string
  nickname: string
  email: string
  status: "active" | "suspended" | "banned"
  joinDate: Date
  postsCount: number
  reportsCount: number
}

export default function AdminPage() {
  const { toast } = useToast()

  // Mock data
  const [reports] = useState<Report[]>([
    {
      id: "1",
      type: "post",
      contentId: "123",
      contentTitle: "Inappropriate Content Example",
      reportReason: "Spam content",
      reportedBy: "user123",
      reportedUser: "spammer99",
      timestamp: new Date("2024-01-21T10:30:00"),
      status: "pending",
    },
    {
      id: "2",
      type: "comment",
      contentId: "456",
      contentTitle: "Offensive comment on React post",
      reportReason: "Harassment",
      reportedBy: "developer1",
      reportedUser: "troll_user",
      timestamp: new Date("2024-01-20T15:20:00"),
      status: "pending",
    },
  ])

  const [users] = useState<User[]>([
    {
      id: "1",
      nickname: "spammer99",
      email: "spam@example.com",
      status: "active",
      joinDate: new Date("2024-01-15"),
      postsCount: 25,
      reportsCount: 5,
    },
    {
      id: "2",
      nickname: "troll_user",
      email: "troll@example.com",
      status: "active",
      joinDate: new Date("2024-01-10"),
      postsCount: 12,
      reportsCount: 3,
    },
  ])

  const [aiPrompt, setAiPrompt] =
    useState(`You are a content moderator for a developer community platform. Your role is to:

1. Detect inappropriate content including:
   - Spam or promotional content
   - Harassment or bullying
   - Offensive language
   - Off-topic discussions

2. Suggest appropriate emotions for posts based on content sentiment
3. Provide content improvement suggestions

Please be fair and consider the context of technical discussions.`)

  const handleReportAction = (reportId: string, action: "resolve" | "dismiss") => {
    toast({
      title: `Report ${action}d`,
      description: `The report has been ${action}d successfully.`,
    })
  }

  const handleUserAction = (userId: string, action: "suspend" | "ban" | "unban") => {
    toast({
      title: `User ${action}ned`,
      description: `The user has been ${action}ned successfully.`,
      variant: action === "ban" ? "destructive" : "default",
    })
  }

  const handleSaveAiPrompt = () => {
    toast({
      title: "AI Prompt Updated",
      description: "The AI moderation prompt has been updated successfully.",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-600">Manage reports, users, and system settings</p>
        </div>

        <Tabs defaultValue="reports" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Reports
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              User Management
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              AI Settings
            </TabsTrigger>
          </TabsList>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Content Reports</CardTitle>
                <CardDescription>Review and manage user reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reports.map((report) => (
                    <Card key={report.id} className="border-l-4 border-l-red-500">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Badge variant={report.type === "post" ? "default" : "secondary"}>{report.type}</Badge>
                              <span className="font-semibold">{report.contentTitle}</span>
                            </div>
                            <p className="text-sm text-gray-600">
                              <strong>Reason:</strong> {report.reportReason}
                            </p>
                            <p className="text-sm text-gray-600">
                              <strong>Reported by:</strong> {report.reportedBy} |<strong> Reported user:</strong>{" "}
                              {report.reportedUser}
                            </p>
                            <p className="text-xs text-gray-500">
                              {report.timestamp.toLocaleDateString()} {report.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleReportAction(report.id, "dismiss")}
                            >
                              Dismiss
                            </Button>
                            <Button size="sm" onClick={() => handleReportAction(report.id, "resolve")}>
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Resolve
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage user accounts and permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user) => (
                    <Card key={user.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">{user.nickname}</span>
                              <Badge
                                variant={
                                  user.status === "active"
                                    ? "default"
                                    : user.status === "suspended"
                                      ? "secondary"
                                      : "destructive"
                                }
                              >
                                {user.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600">{user.email}</p>
                            <div className="text-xs text-gray-500">
                              Joined: {user.joinDate.toLocaleDateString()} | Posts: {user.postsCount} | Reports:{" "}
                              {user.reportsCount}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            {user.status === "active" && (
                              <>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleUserAction(user.id, "suspend")}
                                >
                                  Suspend
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleUserAction(user.id, "ban")}
                                >
                                  <Ban className="h-4 w-4 mr-1" />
                                  Ban
                                </Button>
                              </>
                            )}
                            {user.status !== "active" && (
                              <Button size="sm" onClick={() => handleUserAction(user.id, "unban")}>
                                Unban
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Settings Tab */}
          <TabsContent value="ai" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>AI Moderation Settings</CardTitle>
                <CardDescription>Configure AI content moderation prompts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ai-prompt">AI Moderation Prompt</Label>
                  <Textarea
                    id="ai-prompt"
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    rows={12}
                    className="font-mono text-sm"
                  />
                </div>
                <Button onClick={handleSaveAiPrompt}>Save AI Prompt</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
