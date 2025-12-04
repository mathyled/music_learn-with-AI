"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Play, Pause, Volume2, BookOpen, Brain, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SAMPLE_SONGS } from "@/lib/lyrics-api"

interface VocabularyItem {
  word: string
  definition: string
  difficulty: "easy" | "medium" | "hard"
  partOfSpeech: string
}

interface LyricAnalysis {
  difficulty: string
  readingLevel: number
  grammarPoints: string[]
  vocabulary: VocabularyItem[]
  verbTenses: string[]
}

export default function SongPage() {
  const params = useParams()
  const router = useRouter()
  const songId = Number.parseInt(params.id as string)
  const song = SAMPLE_SONGS.find((s) => s.id === songId)

  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(233) // Default duration for now
  const [analysis, setAnalysis] = useState<LyricAnalysis | null>(null)
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(false)

  useEffect(() => {
    if (song && !analysis) {
      setIsLoadingAnalysis(true)
      fetch("/api/analyze-lyrics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lyrics: song.lyrics, title: song.title, artist: song.artist }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("[v0] Analysis received:", data)
          setAnalysis(data)
        })
        .catch((err) => console.error("[v0] Error fetching analysis:", err))
        .finally(() => setIsLoadingAnalysis(false))
    }
  }, [song, analysis])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false)
            return 0
          }
          return prev + 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, duration])

  if (!song) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Canción no encontrada</h2>
          <Button onClick={() => router.push("/")}>Volver a la búsqueda</Button>
        </div>
      </div>
    )
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty?.toLowerCase()) {
      case "beginner":
      case "principiante":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
      case "intermediate":
      case "intermedio":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200"
      case "advanced":
      case "avanzado":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => router.push("/")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-foreground">
                {song.title} - {song.artist}
              </h1>
              {analysis && <Badge className={getDifficultyColor(analysis.difficulty)}>{analysis.difficulty}</Badge>}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-0">
                <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${song.youtubeId}?enablejsapi=1`}
                    title={`${song.title} - ${song.artist}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Volume2 className="h-5 w-5" />
                  Controles de Audio
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Button size="sm" onClick={() => setIsPlaying(!isPlaying)} className="flex items-center gap-2">
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    {isPlaying ? "Pausar" : "Reproducir"}
                  </Button>
                  <div className="flex-1">
                    <Progress value={(currentTime / duration) * 100} className="w-full" />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Usa el reproductor de YouTube arriba para la experiencia de audio completa
                </p>
              </CardContent>
            </Card>

            <Tabs defaultValue="lyrics" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="lyrics">Letras</TabsTrigger>
                <TabsTrigger value="analysis">Análisis de IA</TabsTrigger>
              </TabsList>

              <TabsContent value="lyrics" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Letras de la Canción</CardTitle>
                    <CardDescription>Sigue la letra para mejorar tu comprensión auditiva</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="whitespace-pre-line text-lg leading-relaxed">{song.lyrics}</div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analysis" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="h-5 w-5" />
                      Análisis de Lenguaje con IA
                    </CardTitle>
                    <CardDescription>Análisis generado por Groq AI</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {isLoadingAnalysis ? (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">Analizando letras con IA...</p>
                      </div>
                    ) : analysis ? (
                      <>
                        <div>
                          <h4 className="font-semibold mb-2">Nivel de Dificultad</h4>
                          <Badge className={getDifficultyColor(analysis.difficulty)}>
                            {analysis.difficulty} (Nivel {analysis.readingLevel}/10)
                          </Badge>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">Tiempos Verbales</h4>
                          <div className="flex flex-wrap gap-2">
                            {analysis.verbTenses?.map((tense, index) => (
                              <Badge key={index} variant="outline">
                                {tense}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">Puntos Gramaticales</h4>
                          <div className="flex flex-wrap gap-2">
                            {analysis.grammarPoints?.map((point, index) => (
                              <Badge key={index} variant="outline">
                                {point}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2 text-foreground">Vocabulario Clave</h4>
                          {analysis.vocabulary?.length > 0 ? (
                            <div className="space-y-2">
                              {analysis.vocabulary?.map((item, index) => (
                                <div key={index} className="p-3 border rounded-lg bg-card">
                                  <div className="flex items-start justify-between gap-2">
                                    <div className="flex-1">
                                      <span className="font-semibold text-foreground">{item.word}</span>
                                      <span className="text-sm text-muted-foreground ml-2">({item.partOfSpeech})</span>
                                      <p className="text-sm text-muted-foreground mt-1">{item.definition}</p>
                                    </div>
                                    <Badge
                                      variant={
                                        item.difficulty === "easy"
                                          ? "default"
                                          : item.difficulty === "medium"
                                            ? "secondary"
                                            : "destructive"
                                      }
                                    >
                                      {item.difficulty}
                                    </Badge>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm text-muted-foreground">No hay vocabulario disponible</p>
                          )}
                        </div>
                      </>
                    ) : (
                      <p className="text-muted-foreground">No se pudo cargar el análisis</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Información de la Canción</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <span className="font-medium">Artista:</span> {song.artist}
                </div>
                <div>
                  <span className="font-medium">Año:</span> {song.year}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Herramientas de Aprendizaje
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" size="lg" onClick={() => router.push(`/quiz/${song.id}`)}>
                  <Trophy className="h-4 w-4 mr-2" />
                  Hacer Quiz
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
