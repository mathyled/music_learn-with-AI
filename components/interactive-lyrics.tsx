"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { BookOpen, Volume2, Eye, EyeOff } from "lucide-react"

interface LyricsLine {
  id: number
  text: string
  timestamp: number
  words: Array<{
    word: string
    difficulty: "easy" | "medium" | "hard"
    definition?: string
    partOfSpeech?: string
  }>
}

interface InteractiveLyricsProps {
  lyrics: LyricsLine[]
  currentTime: number
  showDefinitions: boolean
  onToggleDefinitions: () => void
}

export default function InteractiveLyrics({
  lyrics,
  currentTime,
  showDefinitions,
  onToggleDefinitions,
}: InteractiveLyricsProps) {
  const [selectedWord, setSelectedWord] = useState<string | null>(null)

  const getDifficultyColor = (difficulty: "easy" | "medium" | "hard") => {
    switch (difficulty) {
      case "easy":
        return "text-green-600 dark:text-green-400"
      case "medium":
        return "text-yellow-600 dark:text-yellow-400"
      case "hard":
        return "text-red-600 dark:text-red-400"
      default:
        return "text-gray-600 dark:text-gray-400"
    }
  }

  const isLineActive = (timestamp: number, nextTimestamp?: number) => {
    return currentTime >= timestamp && (nextTimestamp ? currentTime < nextTimestamp : true)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Interactive Lyrics
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onToggleDefinitions}
              className="flex items-center gap-2 bg-transparent"
            >
              {showDefinitions ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              {showDefinitions ? "Hide" : "Show"} Definitions
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {lyrics.map((line, index) => {
            const nextLine = lyrics[index + 1]
            const isActive = isLineActive(line.timestamp, nextLine?.timestamp)

            return (
              <div
                key={line.id}
                className={`p-3 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500"
                    : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                }`}
              >
                <div className="flex flex-wrap gap-1 text-lg leading-relaxed">
                  {line.words.map((wordObj, wordIndex) => (
                    <Popover key={wordIndex}>
                      <PopoverTrigger asChild>
                        <span
                          className={`cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 px-1 rounded transition-colors ${
                            showDefinitions ? getDifficultyColor(wordObj.difficulty) : ""
                          } ${isActive ? "font-semibold" : ""}`}
                          onClick={() => setSelectedWord(wordObj.word)}
                        >
                          {wordObj.word}
                        </span>
                      </PopoverTrigger>
                      {wordObj.definition && (
                        <PopoverContent className="w-80">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold">{wordObj.word}</h4>
                              <Badge variant="outline" className="text-xs">
                                {wordObj.partOfSpeech}
                              </Badge>
                              <Badge
                                className={`text-xs ${
                                  wordObj.difficulty === "easy"
                                    ? "bg-green-100 text-green-800"
                                    : wordObj.difficulty === "medium"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-red-100 text-red-800"
                                }`}
                              >
                                {wordObj.difficulty}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{wordObj.definition}</p>
                            <Button size="sm" variant="outline" className="w-full bg-transparent">
                              <Volume2 className="h-3 w-3 mr-1" />
                              Pronounce
                            </Button>
                          </div>
                        </PopoverContent>
                      )}
                    </Popover>
                  ))}
                </div>
                {isActive && <div className="mt-2 text-xs text-blue-600 dark:text-blue-400">Currently playing</div>}
              </div>
            )
          })}
        </div>

        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h4 className="font-semibold mb-2 text-sm text-gray-900 dark:text-white">Legend:</h4>
          <div className="flex flex-wrap gap-4 text-xs text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 bg-green-500 rounded"></span>
              <span>Easy words</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 bg-yellow-500 rounded"></span>
              <span>Medium words</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 bg-red-500 rounded"></span>
              <span>Hard words</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
