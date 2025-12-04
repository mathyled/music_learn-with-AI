"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Trophy, Target, TrendingUp, Music, BookOpen, Brain, Star, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock progress data
const mockProgressData = {
  overall: {
    level: 12,
    xp: 2450,
    xpToNext: 500,
    streak: 7,
    totalSongs: 15,
    totalQuizzes: 23,
    averageScore: 78,
  },
  skills: {
    listening: { level: 8, progress: 75, xp: 1200 },
    vocabulary: { level: 6, progress: 60, xp: 800 },
    grammar: { level: 10, progress: 85, xp: 1500 },
    pronunciation: { level: 4, progress: 40, xp: 400 },
  },
  recentActivity: [
    {
      id: 1,
      type: "quiz",
      song: "Shape of You",
      artist: "Ed Sheeran",
      score: 85,
      date: "2024-01-15",
      xpGained: 50,
    },
    {
      id: 2,
      type: "song",
      song: "Imagine",
      artist: "John Lennon",
      date: "2024-01-14",
      xpGained: 25,
    },
    {
      id: 3,
      type: "quiz",
      song: "Bohemian Rhapsody",
      artist: "Queen",
      score: 92,
      date: "2024-01-13",
      xpGained: 75,
    },
    {
      id: 4,
      type: "vocabulary",
      song: "Yesterday",
      artist: "The Beatles",
      wordsLearned: 8,
      date: "2024-01-12",
      xpGained: 40,
    },
  ],
  achievements: [
    {
      id: 1,
      title: "First Steps",
      description: "Complete your first quiz",
      icon: Trophy,
      unlocked: true,
      date: "2024-01-10",
    },
    {
      id: 2,
      title: "Music Lover",
      description: "Listen to 10 different songs",
      icon: Music,
      unlocked: true,
      date: "2024-01-12",
    },
    {
      id: 3,
      title: "Quiz Master",
      description: "Score 90% or higher on 5 quizzes",
      icon: Brain,
      unlocked: true,
      date: "2024-01-14",
    },
    {
      id: 4,
      title: "Streak Keeper",
      description: "Maintain a 7-day learning streak",
      icon: Target,
      unlocked: true,
      date: "2024-01-15",
    },
    {
      id: 5,
      title: "Vocabulary Builder",
      description: "Learn 100 new words",
      icon: BookOpen,
      unlocked: false,
      progress: 67,
    },
    {
      id: 6,
      title: "Perfect Score",
      description: "Get 100% on any quiz",
      icon: Star,
      unlocked: false,
      progress: 0,
    },
  ],
  weeklyStats: [
    { day: "Mon", xp: 75, quizzes: 2 },
    { day: "Tue", xp: 50, quizzes: 1 },
    { day: "Wed", xp: 100, quizzes: 3 },
    { day: "Thu", xp: 25, quizzes: 1 },
    { day: "Fri", xp: 125, quizzes: 4 },
    { day: "Sat", xp: 75, quizzes: 2 },
    { day: "Sun", xp: 90, quizzes: 2 },
  ],
}

export default function ProgressPage() {
  const router = useRouter()
  const [selectedTab, setSelectedTab] = useState("overview")

  const getSkillColor = (skill: string) => {
    switch (skill) {
      case "listening":
        return "bg-blue-500"
      case "vocabulary":
        return "bg-green-500"
      case "grammar":
        return "bg-purple-500"
      case "pronunciation":
        return "bg-orange-500"
      default:
        return "bg-gray-500"
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "quiz":
        return Trophy
      case "song":
        return Music
      case "vocabulary":
        return BookOpen
      default:
        return Target
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => router.push("/")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Your Learning Progress</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Level and XP */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Level</CardTitle>
                  <Award className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockProgressData.overall.level}</div>
                  <div className="mt-2">
                    <Progress
                      value={
                        (mockProgressData.overall.xp /
                          (mockProgressData.overall.xp + mockProgressData.overall.xpToNext)) *
                        100
                      }
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {mockProgressData.overall.xp} / {mockProgressData.overall.xp + mockProgressData.overall.xpToNext}{" "}
                      XP
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Streak</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">{mockProgressData.overall.streak}</div>
                  <p className="text-xs text-muted-foreground">days in a row</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Songs Studied</CardTitle>
                  <Music className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockProgressData.overall.totalSongs}</div>
                  <p className="text-xs text-muted-foreground">across all genres</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{mockProgressData.overall.averageScore}%</div>
                  <p className="text-xs text-muted-foreground">quiz performance</p>
                </CardContent>
              </Card>
            </div>

            {/* Weekly Activity Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Activity</CardTitle>
                <CardDescription>Your learning activity over the past week</CardDescription>
              </CardHeader>
                <CardContent>
                  <div className="flex items-end justify-between h-40 gap-2">
                    {mockProgressData.weeklyStats.map((day, index) => (
                      <div key={index} className="flex flex-col items-center flex-1">
                        <div
                          className="bg-blue-500 rounded-t w-full mb-2 transition-all hover:bg-blue-600"
                          style={{ height: `${(day.xp / 125) * 100}%`, minHeight: "4px" }}
                        />
                        <span className="text-xs text-gray-600 dark:text-gray-400">{day.day}</span>
                        <span className="text-xs font-medium text-gray-900 dark:text-white">{day.xp} XP</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(mockProgressData.skills).map(([skill, data]) => (
                <Card key={skill}>
                  <CardHeader>
                    <CardTitle className="capitalize flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${getSkillColor(skill)}`} />
                      {skill}
                    </CardTitle>
                    <CardDescription>Level {data.level}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{data.progress}%</span>
                      </div>
                      <Progress value={data.progress} />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>XP Earned</span>
                      <span className="font-medium">{data.xp} XP</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Skill Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>Recommended Practice</CardTitle>
                <CardDescription>Focus on these areas to improve faster</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <div className="w-2 h-2 bg-orange-500 rounded-full" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">Pronunciation</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Your lowest skill - practice with audio exercises</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Practice
                  </Button>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">Vocabulary</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Good progress - keep building your word bank</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Continue
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your learning history over the past week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockProgressData.recentActivity.map((activity) => {
                    const Icon = getActivityIcon(activity.type)
                    return (
                      <div
                        key={activity.id}
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <div className="flex-shrink-0">
                          <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-medium truncate text-gray-900 dark:text-white">{activity.song}</p>
                            <Badge variant="outline" className="text-xs">
                              {activity.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            by {activity.artist}
                            {activity.score && ` • ${activity.score}% score`}
                            {activity.wordsLearned && ` • ${activity.wordsLearned} words learned`}
                          </p>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-sm font-medium text-green-600 dark:text-green-400">+{activity.xpGained} XP</span>
                          <span className="text-xs text-gray-600 dark:text-gray-400">{formatDate(activity.date)}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockProgressData.achievements.map((achievement) => {
                const Icon = achievement.icon
                return (
                  <Card
                    key={achievement.id}
                    className={`${achievement.unlocked ? "border-green-200 dark:border-green-800" : "opacity-75"}`}
                  >
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-lg ${achievement.unlocked ? "bg-green-100 dark:bg-green-900" : "bg-gray-100 dark:bg-gray-800"}`}
                        >
                          <Icon
                            className={`h-6 w-6 ${achievement.unlocked ? "text-green-600 dark:text-green-400" : "text-gray-400"}`}
                          />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg text-gray-900 dark:text-white">{achievement.title}</CardTitle>
                          <CardDescription>{achievement.description}</CardDescription>
                        </div>
                        {achievement.unlocked && (
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            Unlocked
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    {!achievement.unlocked && achievement.progress !== undefined && (
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{achievement.progress}%</span>
                          </div>
                          <Progress value={achievement.progress} />
                        </div>
                      </CardContent>
                    )}
                    {achievement.unlocked && achievement.date && (
                      <CardContent>
                        <p className="text-sm text-muted-foreground">Unlocked on {formatDate(achievement.date)}</p>
                      </CardContent>
                    )}
                  </Card>
                )
              })}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
