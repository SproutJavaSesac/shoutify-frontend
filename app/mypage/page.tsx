"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import {
  FileText,
  Award,
  Edit,
  Heart,
  MessageSquare,
  Star,
  Trophy,
  Target,
  Zap,
  Calendar,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Post {
  id: string;
  title: string;
  content: string;
  timestamp: Date;
  empathyCount: number;
  commentCount: number;
}

interface BadgeItem {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  earned: boolean;
  earnedDate?: Date;
  color: string;
}

export default function MyPage() {
  // Mock user data
  const user = {
    nickname: "CodeExplorer",
    rank: 15,
    totalPosts: 12,
    totalComments: 45,
    earnedBadges: 6,
  };

  // Mock posts data
  const [posts] = useState<Post[]>([
    {
      id: "1",
      title: "Understanding React Hooks in Depth",
      content: "React Hooks have revolutionized how we write components...",
      timestamp: new Date("2024-01-20T10:30:00"),
      empathyCount: 31,
      commentCount: 8,
    },
    {
      id: "2",
      title: "Building Responsive Layouts with Tailwind CSS",
      content:
        "Tailwind CSS makes it incredibly easy to build responsive designs...",
      timestamp: new Date("2024-01-18T14:15:00"),
      empathyCount: 24,
      commentCount: 12,
    },
    {
      id: "3",
      title: "JavaScript Performance Optimization Tips",
      content:
        "Here are some practical tips to optimize your JavaScript code...",
      timestamp: new Date("2024-01-15T09:45:00"),
      empathyCount: 42,
      commentCount: 15,
    },
  ]);

  // Mock badges data
  const [badges] = useState<BadgeItem[]>([
    {
      id: "1",
      name: "First Post",
      description: "Published your first post",
      icon: <FileText className="h-6 w-6" />,
      earned: true,
      earnedDate: new Date("2023-01-16"),
      color: "bg-blue-500",
    },
    {
      id: "2",
      name: "Popular Author",
      description: "Received 100+ empathy reactions",
      icon: <Heart className="h-6 w-6" />,
      earned: true,
      earnedDate: new Date("2023-03-22"),
      color: "bg-green-500",
    },
    {
      id: "3",
      name: "Community Helper",
      description: "Left 50+ helpful comments",
      icon: <Heart className="h-6 w-6" />,
      earned: true,
      earnedDate: new Date("2023-05-10"),
      color: "bg-pink-500",
    },
    {
      id: "4",
      name: "Rising Star",
      description: "Gained 10 followers in a week",
      icon: <Star className="h-6 w-6" />,
      earned: true,
      earnedDate: new Date("2023-07-08"),
      color: "bg-yellow-500",
    },
    {
      id: "5",
      name: "Expert Contributor",
      description: "Published 10+ high-quality posts",
      icon: <Trophy className="h-6 w-6" />,
      earned: true,
      earnedDate: new Date("2023-09-15"),
      color: "bg-purple-500",
    },
    {
      id: "6",
      name: "Consistent Creator",
      description: "Posted content for 30 consecutive days",
      icon: <Target className="h-6 w-6" />,
      earned: true,
      earnedDate: new Date("2023-11-20"),
      color: "bg-orange-500",
    },
    {
      id: "7",
      name: "Lightning Fast",
      description: "First to comment on 10 posts",
      icon: <Zap className="h-6 w-6" />,
      earned: false,
      color: "bg-gray-400",
    },
    {
      id: "8",
      name: "Mentor",
      description: "Help 100+ community members",
      icon: <Award className="h-6 w-6" />,
      earned: false,
      color: "bg-gray-400",
    },
  ]);

  const earnedBadges = badges.filter((badge) => badge.earned);

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* User Profile Card */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-blue-500 text-white text-xl">
                    {user.nickname.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold">{user.nickname}</h1>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-sm">
                      #{user.rank} Rank
                    </Badge>
                  </div>
                </div>
              </div>
              <Link href="/mypage/edit">
                <Button variant="outline" className="flex items-center gap-2">
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="posts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="posts" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              My Posts ({posts.length})
            </TabsTrigger>
            <TabsTrigger value="badges" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              Badges ({earnedBadges.length}/{badges.length})
            </TabsTrigger>
          </TabsList>

          {/* My Posts Tab */}
          <TabsContent value="posts" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">My Posts</h2>
            </div>

            <div className="space-y-4">
              {posts.map((post) => (
                <Card key={post.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <Link
                          href={`/posts/${post.id}`}
                          className="text-lg font-semibold hover:text-blue-600"
                        >
                          {post.title}
                        </Link>
                        <p className="text-gray-600 mt-1 mb-3 line-clamp-2">
                          {post.content}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>
                            {formatDistanceToNow(post.timestamp, {
                              addSuffix: true,
                            })}
                          </span>
                          <div className="flex items-center gap-1">
                            <Heart className="h-4 w-4" />
                            <span>{post.empathyCount} empathy</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageSquare className="h-4 w-4" />
                            <span>{post.commentCount} comments</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Badges Tab */}
          <TabsContent value="badges" className="space-y-4">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">My Badges</h2>
              <p className="text-gray-600">
                {earnedBadges.length} of {badges.length} badges earned
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {badges.map((badge) => (
                <Card
                  key={badge.id}
                  className={`${badge.earned ? "" : "opacity-60"}`}
                >
                  <CardContent className="pt-4">
                    <div className="flex items-start gap-3">
                      <div
                        className={`${badge.color} p-3 rounded-full text-white`}
                      >
                        {badge.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{badge.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {badge.description}
                        </p>
                        {badge.earned && badge.earnedDate ? (
                          <Badge variant="secondary" className="text-xs">
                            <Calendar className="h-3 w-3 mr-1" />
                            Earned{" "}
                            {formatDistanceToNow(badge.earnedDate, {
                              addSuffix: true,
                            })}
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-xs">
                            Not earned yet
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
