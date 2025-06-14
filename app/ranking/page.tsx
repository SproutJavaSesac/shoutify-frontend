"use client"

import { useState } from "react"
import { Crown, Trophy, Medal, Award, FileText, Heart, Shield, ArrowUp, ArrowDown, Minus } from "lucide-react"
import Link from "next/link"

import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface User {
  id: string
  nickname: string
  avatar?: string
  postsCount: number
  empathyCount: number
  cleanLanguageScore: number
  badges: string[]
  previousRanks: {
    posts: number
    empathy: number
    language: number
  }
}

interface RankingUser extends User {
  rank: number
  score: number
  rankChange: number
}

export default function RankingPage() {
  // Mock users data with previous ranks
  const users: User[] = [
    {
      id: "1",
      nickname: "CodeMaster",
      postsCount: 156,
      empathyCount: 2847,
      cleanLanguageScore: 98,
      badges: ["Expert", "Mentor"],
      previousRanks: {
        posts: 2,
        empathy: 1,
        language: 3,
      },
    },
    {
      id: "2",
      nickname: "DevGuru",
      postsCount: 203,
      empathyCount: 3421,
      cleanLanguageScore: 96,
      badges: ["Popular", "Helper"],
      previousRanks: {
        posts: 1,
        empathy: 2,
        language: 4,
      },
    },
    {
      id: "3",
      nickname: "TechWizard",
      postsCount: 89,
      empathyCount: 1923,
      cleanLanguageScore: 99,
      badges: ["Rising Star"],
      previousRanks: {
        posts: 5,
        empathy: 4,
        language: 1,
      },
    },
    {
      id: "4",
      nickname: "Anonymous_4521",
      postsCount: 134,
      empathyCount: 2156,
      cleanLanguageScore: 94,
      badges: ["Contributor"],
      previousRanks: {
        posts: 3,
        empathy: 3,
        language: 5,
      },
    },
    {
      id: "5",
      nickname: "BuilderBot",
      postsCount: 178,
      empathyCount: 2634,
      cleanLanguageScore: 97,
      badges: ["Consistent", "Quality"],
      previousRanks: {
        posts: 4,
        empathy: 5,
        language: 2,
      },
    },
    {
      id: "6",
      nickname: "Anonymous_7832",
      postsCount: 67,
      empathyCount: 1456,
      cleanLanguageScore: 95,
      badges: ["Newcomer"],
      previousRanks: {
        posts: 8,
        empathy: 7,
        language: 6,
      },
    },
    {
      id: "7",
      nickname: "ScriptNinja",
      postsCount: 145,
      empathyCount: 1987,
      cleanLanguageScore: 92,
      badges: ["Active"],
      previousRanks: {
        posts: 6,
        empathy: 6,
        language: 8,
      },
    },
    {
      id: "8",
      nickname: "DataDriven",
      postsCount: 98,
      empathyCount: 1678,
      cleanLanguageScore: 93,
      badges: ["Analytical"],
      previousRanks: {
        posts: 7,
        empathy: 8,
        language: 7,
      },
    },
    {
      id: "9",
      nickname: "Anonymous_2341",
      postsCount: 112,
      empathyCount: 1834,
      cleanLanguageScore: 91,
      badges: ["Regular"],
      previousRanks: {
        posts: 9,
        empathy: 9,
        language: 9,
      },
    },
    {
      id: "10",
      nickname: "CloudSurfer",
      postsCount: 87,
      empathyCount: 1523,
      cleanLanguageScore: 89,
      badges: ["Explorer"],
      previousRanks: {
        posts: 10,
        empathy: 10,
        language: 10,
      },
    },
  ]

  const [activeTab, setActiveTab] = useState("posts")

  const getRankingData = (criteria: string): RankingUser[] => {
    let sortedUsers: RankingUser[]

    switch (criteria) {
      case "posts":
        sortedUsers = users
          .map((user) => ({
            ...user,
            score: user.postsCount,
            rankChange: user.previousRanks.posts - 0,
          }))
          .sort((a, b) => b.score - a.score)
        break
      case "empathy":
        sortedUsers = users
          .map((user) => ({
            ...user,
            score: user.empathyCount,
            rankChange: user.previousRanks.empathy - 0,
          }))
          .sort((a, b) => b.score - a.score)
        break
      case "language":
        sortedUsers = users
          .map((user) => ({
            ...user,
            score: user.cleanLanguageScore,
            rankChange: user.previousRanks.language - 0,
          }))
          .sort((a, b) => b.score - a.score)
        break
      default:
        sortedUsers = users.map((user) => ({
          ...user,
          score: user.postsCount,
          rankChange: 0,
        }))
    }

    // Update with actual ranks and calculate rank changes
    return sortedUsers.map((user, index) => {
      const currentRank = index + 1
      let previousRank = 0

      switch (criteria) {
        case "posts":
          previousRank = user.previousRanks.posts
          break
        case "empathy":
          previousRank = user.previousRanks.empathy
          break
        case "language":
          previousRank = user.previousRanks.language
          break
      }

      return {
        ...user,
        rank: currentRank,
        rankChange: previousRank - currentRank,
      }
    })
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />
      case 2:
        return <Trophy className="h-6 w-6 text-gray-400" />
      case 3:
        return <Medal className="h-6 w-6 text-amber-600" />
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>
    }
  }

  const getRankChangeIcon = (change: number) => {
    if (change > 0) {
      return (
        <div className="flex items-center text-green-600">
          <ArrowUp className="h-4 w-4 mr-1" />
          <span className="text-xs font-medium">{change}</span>
        </div>
      )
    } else if (change < 0) {
      return (
        <div className="flex items-center text-red-600">
          <ArrowDown className="h-4 w-4 mr-1" />
          <span className="text-xs font-medium">{Math.abs(change)}</span>
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

  const getRankCardStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return "border-yellow-200 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950/20 dark:to-amber-950/20"
      case 2:
        return "border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-950/20 dark:to-slate-950/20"
      case 3:
        return "border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20"
      default:
        return ""
    }
  }

  const getScoreLabel = (criteria: string) => {
    switch (criteria) {
      case "posts":
        return "Posts"
      case "empathy":
        return "Empathy"
      case "language":
        return "Score"
      default:
        return "Score"
    }
  }

  const getTabIcon = (tab: string) => {
    switch (tab) {
      case "posts":
        return <FileText className="h-4 w-4" />
      case "empathy":
        return <Heart className="h-4 w-4" />
      case "language":
        return <Shield className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Community Ranking</h1>
        <p className="text-muted-foreground">Celebrating our most active and positive community members</p>
      </div>

      {/* Ranking Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="posts" className="flex items-center gap-2">
            {getTabIcon("posts")}
            Most Posts
          </TabsTrigger>
          <TabsTrigger value="empathy" className="flex items-center gap-2">
            {getTabIcon("empathy")}
            Most Empathy
          </TabsTrigger>
          <TabsTrigger value="language" className="flex items-center gap-2">
            {getTabIcon("language")}
            Clean Language Score
          </TabsTrigger>
        </TabsList>

        {/* Posts Ranking */}
        <TabsContent value="posts" className="space-y-4">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold mb-2">Most Active Contributors</h2>
            <p className="text-sm text-muted-foreground">Ranked by total number of posts published</p>
          </div>
          {getRankingData("posts").map((user) => (
            <Link key={user.id} href={`/ranking/${user.id}`}>
              <Card className={`${getRankCardStyle(user.rank)} transition-all hover:shadow-md cursor-pointer`}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-center justify-center w-12">
                      <div className="flex items-center justify-center h-12">{getRankIcon(user.rank)}</div>
                      <div className="mt-1">{getRankChangeIcon(user.rankChange)}</div>
                    </div>
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-blue-500 text-white font-semibold">
                        {user.nickname.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold">{user.nickname}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        {user.badges.map((badge) => (
                          <Badge key={badge} variant="secondary" className="text-xs">
                            {badge}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{user.score}</div>
                      <div className="text-sm text-muted-foreground">{getScoreLabel("posts")}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </TabsContent>

        {/* Recommendations Ranking */}
        <TabsContent value="empathy" className="space-y-4">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold mb-2">Most Appreciated Authors</h2>
            <p className="text-sm text-muted-foreground">Ranked by total empathy reactions received</p>
          </div>
          {getRankingData("empathy").map((user) => (
            <Link key={user.id} href={`/ranking/${user.id}`}>
              <Card className={`${getRankCardStyle(user.rank)} transition-all hover:shadow-md cursor-pointer`}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-center justify-center w-12">
                      <div className="flex items-center justify-center h-12">{getRankIcon(user.rank)}</div>
                      <div className="mt-1">{getRankChangeIcon(user.rankChange)}</div>
                    </div>
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-green-500 text-white font-semibold">
                        {user.nickname.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold">{user.nickname}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        {user.badges.map((badge) => (
                          <Badge key={badge} variant="secondary" className="text-xs">
                            {badge}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{user.score.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">{getScoreLabel("empathy")}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </TabsContent>

        {/* Clean Language Ranking */}
        <TabsContent value="language" className="space-y-4">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold mb-2">Positive Communication Champions</h2>
            <p className="text-sm text-muted-foreground">Ranked by clean language and positive interaction score</p>
          </div>
          {getRankingData("language").map((user) => (
            <Link key={user.id} href={`/ranking/${user.id}`}>
              <Card className={`${getRankCardStyle(user.rank)} transition-all hover:shadow-md cursor-pointer`}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-center justify-center w-12">
                      <div className="flex items-center justify-center h-12">{getRankIcon(user.rank)}</div>
                      <div className="mt-1">{getRankChangeIcon(user.rankChange)}</div>
                    </div>
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-purple-500 text-white font-semibold">
                        {user.nickname.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold">{user.nickname}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        {user.badges.map((badge) => (
                          <Badge key={badge} variant="secondary" className="text-xs">
                            {badge}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{user.score}%</div>
                      <div className="text-sm text-muted-foreground">{getScoreLabel("language")}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </TabsContent>
      </Tabs>

      {/* Footer Message */}
      <div className="text-center mt-12 p-6 bg-muted/50 rounded-lg">
        <Award className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          Rankings are updated daily. Keep contributing positively to climb the leaderboard!
        </p>
      </div>
    </div>
  )
}
