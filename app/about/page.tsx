import Link from "next/link"
import { ArrowLeft, Users, MessageSquare, Award, Shield, Zap, Heart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
  const features = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community Driven",
      description:
        "Built by developers, for developers. Share knowledge and learn from each other in a supportive environment.",
    },
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: "Meaningful Discussions",
      description: "Engage in thoughtful conversations about code, best practices, and the latest technologies.",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Recognition System",
      description: "Earn badges and climb the leaderboard by contributing valuable content and helping others.",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Clean Environment",
      description: "AI-powered content moderation ensures a positive and professional community atmosphere.",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Fast & Simple",
      description: "Minimal design focused on what matters most - sharing knowledge and building connections.",
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Open Source Spirit",
      description: "Embracing the values of open source: collaboration, transparency, and continuous improvement.",
    },
  ]

  const stats = [
    { number: "10K+", label: "Active Members" },
    { number: "50K+", label: "Posts Shared" },
    { number: "200K+", label: "Comments" },
    { number: "95%", label: "Positive Interactions" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-xl font-bold">About Community</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">Building the Future of Developer Community</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            A platform where developers share knowledge, learn from each other, and grow together in a positive,
            supportive environment.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/signup">
              <Button size="lg">Join Community</Button>
            </Link>
            <Link href="/posts">
              <Button variant="outline" size="lg">
                Explore Posts
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
              <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-12">Why Choose Our Community?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="text-blue-600 mb-4 flex justify-center">{feature.icon}</div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-white dark:bg-gray-950 rounded-lg p-8 mb-16">
          <h2 className="text-2xl font-bold mb-6">Our Mission</h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-400">
            <p>
              We believe that knowledge sharing is the foundation of innovation. Our platform is designed to break down
              barriers between developers of all skill levels, creating an environment where everyone can learn, teach,
              and grow together.
            </p>
            <p>
              Through thoughtful design, AI-powered moderation, and community-driven features, we're building more than
              just a platform – we're fostering a movement toward more collaborative, inclusive, and positive developer
              culture.
            </p>
            <p>
              Whether you're a beginner looking for guidance or an expert wanting to share your knowledge, our community
              provides the tools and environment you need to succeed and make meaningful connections.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <h3 className="font-semibold mb-2">Inclusivity</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Everyone is welcome, regardless of experience level, background, or technology preferences.
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold mb-2">Quality</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                We prioritize helpful, accurate, and well-thought-out content that truly benefits the community.
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold mb-2">Respect</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Constructive feedback, positive interactions, and mutual respect form the foundation of our community.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-blue-50 dark:bg-blue-950/20 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Ready to Join?</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Start sharing your knowledge and connecting with fellow developers today.
          </p>
          <Link href="/signup">
            <Button size="lg">Get Started</Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
