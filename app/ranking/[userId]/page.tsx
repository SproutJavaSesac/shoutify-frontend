"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, TrendingUp, TrendingDown, Minus, Crown, Trophy, Medal } from "lucide-react"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface RankHistory {
  date: string
  postsRank: number
  empathyRank: number
  languageRank: number
}

interface BadgeItem {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  earned: boolean
  earnedDate?: Date
  color: string
  category: "achievement" | "milestone" | "special"
}

interface UserProfile {
  id: string
  nickname: string
  avatar?: string
  currentRanks: {
    posts: number
    empathy: number
    language: number
  }
  stats: {
    postsCount: number
    empathyCount: number
    cleanLanguageScore: number
    joinDate: Date
    totalBadges: number
  }
  rankHistory: RankHistory[]
  badges: BadgeItem[]
}

export default function RankingDetailPage({ params }: { params: { userId: string } }) {
  const [activeTab, setActiveTab] = useState("posts")

  // Mock user data
  const user: UserProfile = {
    id: params.userId,
    nickname: "CodeMaster",
    currentRanks: {
      posts: 1,
      empathy: 2,
      language: 3,
    },
    stats: {
      postsCount: 156,
      empathyCount: 2847,
      cleanLanguageScore: 98,
      joinDate: new Date("2023-01-15"),
      totalBadges: 8,
    },
    rankHistory: [
      { date: "2024-01-01", postsRank: 5, empathyRank: 8, languageRank: 4 },
      { date: "2024-01-08", postsRank: 4, empathyRank: 6, languageRank: 3 },
      { date: "2024-01-15", postsRank: 3, empathyRank: 4, languageRank: 2 },
      { date: "2024-01-22", postsRank: 2, empathyRank: 3, languageRank: 3 },
      { date: "2024-01-29", postsRank: 1, empathyRank: 2, languageRank: 3 },
    ],
    badges: [
      {
        id: "1",
        name: "First Post",
        description: "Published your first post",
        icon: <Trophy className="h-6 w-6" />,
        earned: true,
        earnedDate: new Date("2023-01-16"),
        color: "bg-blue-500",
        category: "milestone",
      },
      {
        id: "2",
        name: "Popular Author",
        description: "Received 100+ empathy reactions",
        icon: <Crown className="h-6 w-6" />,
        earned: true,
        earnedDate: new Date("2023-03-22"),
        color: "bg-yellow-500",
        category: "achievement",
      },
      {
        id: "3",
        name: "Community Helper",
        description: "Left 50+ helpful comments",
        icon: <Medal className="h-6 w-6" />,
        earned: true,
        earnedDate: new Date("2023-05-10"),
        color: "bg-green-500",
        category: "achievement",
      },
      {
        id: "4",
        name: "Rising Star",
        description: "Gained 10 followers in a week",
        icon: <TrendingUp className="h-6 w-6" />,
        earned: true,
        earnedDate: new Date("2023-07-08"),
        color: "bg-purple-500",
        category: "special",
      },
      {
        id: "5",
        name: "Expert Contributor",
        description: "Published 10+ high-quality posts",
        icon: <Trophy className="h-6 w-6" />,
        earned: true,
        earnedDate: new Date("2023-09-15"),
        color: "bg-orange-500",
        category: "achievement",
      },
      {
        id: "6",
        name: "Consistent Creator",
        description: "Posted content for 30 consecutive days",
        icon: <Calendar className="h-6 w-6" />,
        earned: true,
        earnedDate: new Date("2023-11-20"),
        color: "bg-pink-500",
        category: "milestone",
      },
      {
        id: "7",
        name: "Top Contributor",
        description: "Reached #1 in posts ranking",
        icon: <Crown className="h-6 w-6" />,
        earned: true,
        earnedDate: new Date("2024-01-29"),
        color: "bg-yellow-600",
        category: "special",
      },
      {
        id: "8",
        name: "Language Champion",
        description: "Maintained 95+ clean language score",
        icon: <Medal className="h-6 w-6" />,
        earned: true,
        earnedDate: new Date("2024-01-15"),
        color: "bg-indigo-500",
        category: "achievement",
      },
    ],
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Trophy className="h-5 w-5 text-gray-400" />
      case 3:
        return <Medal className="h-5 w-5 text-amber-600" />
      default:
        return <span className="text-sm font-bold text-muted-foreground">#{rank}</span>
    }
  }

  const getRankTrend = (currentRank: number, previousRank: number) => {
    const change = previousRank - currentRank
    if (change > 0) {
      return (
        <div className="flex items-center text-green-600">
          <TrendingUp className="h-4 w-4 mr-1" />
          <span className="text-sm">+{change}</span>
        </div>
      )
    } else if (change < 0) {
      return (
        <div className="flex items-center text-red-600">
          <TrendingDown className="h-4 w-4 mr-1" />
          <span className="text-sm">{change}</span>
        </div>
      )
    } else {
      return (
        <div className="flex items-center text-gray-400">
          <Minus className="h-4 w-4" />
        </div>
      )
    }
  }

  const getChartData = (type: "posts" | "empathy" | "language") => {
    return user.rankHistory.map((entry) => ({
      date: new Date(entry.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      rank: type === "posts" ? entry.postsRank : type === "empathy" ? entry.empathyRank : entry.languageRank,
    }))
  }

  const earnedBadges = user.badges.filter((badge) => badge.earned)
  const badgesByCategory = {
    achievement: earnedBadges.filter((badge) => badge.category === "achievement"),
    milestone: earnedBadges.filter((badge) => badge.category === "milestone"),
    special: earnedBadges.filter((badge) => badge.category === "special"),
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/ranking">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Ranking
            </Button>
          </Link>
        </div>

        {/* User Profile Header */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="bg-blue-500 text-white text-2xl font-bold">
                  {user.nickname.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{user.nickname}</h1>
                <p className="text-muted-foreground mb-4">
                  Member since{" "}
                  {user.stats.joinDate.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>

                {/* Current Rankings */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-2">
                      {getRankIcon(user.currentRanks.posts)}
                      <span className="font-medium">Posts</span>
                    </div>
                    {getRankTrend(user.currentRanks.posts, 2)}
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-2">
                      {getRankIcon(user.currentRanks.empathy)}
                      <span className="font-medium">Empathy</span>
                    </div>
                    {getRankTrend(user.currentRanks.empathy, 3)}
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-2">
                      {getRankIcon(user.currentRanks.language)}
                      <span className="font-medium">Language</span>
                    </div>
                    {getRankTrend(user.currentRanks.language, 2)}
                  </div>
                </div>
              </div>

              {/* Stats Summary */}
              <div className="grid grid-cols-2 md:grid-cols-1 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">{user.stats.postsCount}</div>
                  <div className="text-sm text-muted-foreground">Posts</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{user.stats.empathyCount.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Empathy</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">{user.stats.cleanLanguageScore}%</div>
                  <div className="text-sm text-muted-foreground">Language Score</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600">{user.stats.totalBadges}</div>
                  <div className="text-sm text-muted-foreground">Badges</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Rank History Chart */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Rank History</CardTitle>
                <CardDescription>Track ranking changes over time (lower is better)</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="posts">Posts</TabsTrigger>
                    <TabsTrigger value="empathy">Empathy</TabsTrigger>
                    <TabsTrigger value="language">Language</TabsTrigger>
                  </TabsList>

                  <TabsContent value="posts" className="space-y-4">
                    <ChartContainer
                      config={{
                        rank: {
                          label: "Rank",
                          color: "hsl(var(--chart-1))",
                        },
                      }}
                      className="h-[300px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={getChartData("posts")}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis domain={[1, 10]} reversed={true} tickFormatter={(value) => `#${value}`} />
                          <ChartTooltip
                            content={<ChartTooltipContent />}
                            formatter={(value) => [`#${value}`, "Rank"]}
                          />
                          <Line
                            type="monotone"
                            dataKey="rank"
                            stroke="var(--color-rank)"
                            strokeWidth={3}
                            dot={{ fill: "var(--color-rank)", strokeWidth: 2, r: 6 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </TabsContent>

                  <TabsContent value="empathy" className="space-y-4">
                    <ChartContainer
                      config={{
                        rank: {
                          label: "Rank",
                          color: "hsl(var(--chart-2))",
                        },
                      }}
                      className="h-[300px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={getChartData("empathy")}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis domain={[1, 10]} reversed={true} tickFormatter={(value) => `#${value}`} />
                          <ChartTooltip
                            content={<ChartTooltipContent />}
                            formatter={(value) => [`#${value}`, "Rank"]}
                          />
                          <Line
                            type="monotone"
                            dataKey="rank"
                            stroke="var(--color-rank)"
                            strokeWidth={3}
                            dot={{ fill: "var(--color-rank)", strokeWidth: 2, r: 6 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </TabsContent>

                  <TabsContent value="language" className="space-y-4">
                    <ChartContainer
                      config={{
                        rank: {
                          label: "Rank",
                          color: "hsl(var(--chart-3))",
                        },
                      }}
                      className="h-[300px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={getChartData("language")}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis domain={[1, 10]} reversed={true} tickFormatter={(value) => `#${value}`} />
                          <ChartTooltip
                            content={<ChartTooltipContent />}
                            formatter={(value) => [`#${value}`, "Rank"]}
                          />
                          <Line
                            type="monotone"
                            dataKey="rank"
                            stroke="var(--color-rank)"
                            strokeWidth={3}
                            dot={{ fill: "var(--color-rank)", strokeWidth: 2, r: 6 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Badges Section */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Badges Earned</CardTitle>
                <CardDescription>
                  {earnedBadges.length} of {user.badges.length} badges collected
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Achievement Badges */}
                <div>
                  <h3 className="font-semibold mb-3 text-sm text-muted-foreground uppercase tracking-wide">
                    Achievements ({badgesByCategory.achievement.length})
                  </h3>
                  <div className="space-y-3">
                    {badgesByCategory.achievement.map((badge) => (
                      <div key={badge.id} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className={`${badge.color} p-2 rounded-full text-white flex-shrink-0`}>{badge.icon}</div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm">{badge.name}</h4>
                          <p className="text-xs text-muted-foreground mb-1">{badge.description}</p>
                          {badge.earnedDate && (
                            <p className="text-xs text-green-600">Earned {badge.earnedDate.toLocaleDateString()}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Milestone Badges */}
                <div>
                  <h3 className="font-semibold mb-3 text-sm text-muted-foreground uppercase tracking-wide">
                    Milestones ({badgesByCategory.milestone.length})
                  </h3>
                  <div className="space-y-3">
                    {badgesByCategory.milestone.map((badge) => (
                      <div key={badge.id} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className={`${badge.color} p-2 rounded-full text-white flex-shrink-0`}>{badge.icon}</div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm">{badge.name}</h4>
                          <p className="text-xs text-muted-foreground mb-1">{badge.description}</p>
                          {badge.earnedDate && (
                            <p className="text-xs text-green-600">Earned {badge.earnedDate.toLocaleDateString()}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Special Badges */}
                <div>
                  <h3 className="font-semibold mb-3 text-sm text-muted-foreground uppercase tracking-wide">
                    Special ({badgesByCategory.special.length})
                  </h3>
                  <div className="space-y-3">
                    {badgesByCategory.special.map((badge) => (
                      <div key={badge.id} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className={`${badge.color} p-2 rounded-full text-white flex-shrink-0`}>{badge.icon}</div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm">{badge.name}</h4>
                          <p className="text-xs text-muted-foreground mb-1">{badge.description}</p>
                          {badge.earnedDate && (
                            <p className="text-xs text-green-600">Earned {badge.earnedDate.toLocaleDateString()}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
