"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Trash2, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"

export default function EditProfilePage() {
  const router = useRouter()
  const { toast } = useToast()

  const [nickname, setNickname] = useState("CodeExplorer")
  const [isLoading, setIsLoading] = useState(false)

  const handleSaveProfile = async () => {
    if (!nickname.trim()) {
      toast({
        title: "Nickname required",
        description: "Please enter a nickname",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully",
    })

    setIsLoading(false)
    router.push("/mypage")
  }

  const handleDeleteAccount = async () => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Account deleted",
      description: "Your account has been permanently deleted",
      variant: "destructive",
    })

    setIsLoading(false)
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-2xl mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/mypage">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to My Page
            </Button>
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-2xl font-bold">Edit Profile</h1>
          <p className="text-gray-600">Update your profile information</p>
        </div>

        <div className="space-y-6">
          {/* Profile Information */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your basic profile information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Preview */}
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-blue-500 text-white text-xl">{nickname.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm text-gray-600">Your avatar is automatically generated from your nickname</p>
                </div>
              </div>

              {/* Nickname Input */}
              <div className="space-y-2">
                <Label htmlFor="nickname">Nickname</Label>
                <Input
                  id="nickname"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="Enter your nickname"
                  maxLength={20}
                />
                <p className="text-xs text-gray-500">Your nickname will be visible to other users</p>
              </div>

              {/* Save Button */}
              <div className="flex justify-end">
                <Button onClick={handleSaveProfile} disabled={isLoading} className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-red-200 dark:border-red-800">
            <CardHeader>
              <CardTitle className="text-red-600 dark:text-red-400">Danger Zone</CardTitle>
              <CardDescription>Permanently delete your account and all associated data</CardDescription>
            </CardHeader>
            <CardContent>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="flex items-center gap-2">
                    <Trash2 className="h-4 w-4" />
                    Delete Account
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your account and remove all your data
                      from our servers, including all posts, comments, and badges.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDeleteAccount}
                      className="bg-red-600 hover:bg-red-700"
                      disabled={isLoading}
                    >
                      {isLoading ? "Deleting..." : "Delete Account"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
