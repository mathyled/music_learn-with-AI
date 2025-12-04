"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, CheckCircle, XCircle, Trophy, RotateCcw, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { SAMPLE_SONGS } from "@/lib/lyrics-api"

interface QuizQuestion {
  id: number
  type: "fill-blank" | "vocabulary" | "grammar" | "comprehension"
  question: string
  options?: string[]
  correctAnswer: string
  explanation: string
  lyricContext?: string
  word?: string
}

interface Quiz {
  songTitle: string
  artist: string
  difficulty: string
  questions: QuizQuestion[]
}

export default function QuizPage() {
  const params = useParams()
  const router = useRouter()
  const songId = Number.parseInt(params.id as string)
  const song = SAMPLE_SONGS.find((s) => s.id === songId)

  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [isLoadingQuiz, setIsLoadingQuiz] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [userAnswers, setUserAnswers] = useState<string[]>([])
  const [showResult, setShowResult] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [score, setScore] = useState(0)

  useEffect(() => {
    if (song && !quiz) {
      setIsLoadingQuiz(true)
      
      // First, get the analysis
      fetch("/api/analyze-lyrics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lyrics: song.lyrics }),
      })
        .then((res) => res.json())
        .then((analysis) => {
          console.log("[v0] Analysis received for quiz:", analysis)
          
          // Then, generate the quiz with both lyrics and analysis
          return fetch("/api/generate-quiz", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ lyrics: song.lyrics, analysis }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log("[v0] Quiz received:", data)
              
              // The API returns { questions: [...] } directly, not wrapped in quiz
              if (data.error) {
                console.error("[v0] Quiz error:", data.error)
                return
              }
              
              // Create quiz object with song info and difficulty from analysis
              const quizData: Quiz = {
                songTitle: song.title,
                artist: song.artist,
                difficulty: analysis.difficulty || "Intermediate",
                questions: data.questions || [],
              }
              
              setQuiz(quizData)
              setUserAnswers(new Array(quizData.questions.length).fill(""))
            })
        })
        .catch((err) => {
          console.error("[v0] Error fetching quiz:", err)
        })
        .finally(() => setIsLoadingQuiz(false))
    }
  }, [song, quiz])

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

  if (isLoadingQuiz) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Generando quiz con IA...</h2>
          <p className="text-muted-foreground">Por favor espera mientras Groq analiza la canción</p>
        </div>
      </div>
    )
  }

  if (!quiz) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Error al cargar el quiz</h2>
          <Button onClick={() => router.push(`/song/${songId}`)}>Volver a la canción</Button>
        </div>
      </div>
    )
  }

  const currentQ = quiz.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer)
    const newAnswers = [...userAnswers]
    newAnswers[currentQuestion] = answer
    setUserAnswers(newAnswers)
  }

  const handleNext = () => {
    if (!selectedAnswer) return

    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(userAnswers[currentQuestion + 1] || "")
      setShowResult(false)
    } else {
      const finalScore = userAnswers.reduce((acc, answer, index) => {
        return acc + (answer === quiz.questions[index].correctAnswer ? 1 : 0)
      }, 0)
      setScore(finalScore)
      setQuizCompleted(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setSelectedAnswer(userAnswers[currentQuestion - 1] || "")
      setShowResult(false)
    }
  }

  const handleShowResult = () => {
    setShowResult(true)
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setSelectedAnswer("")
    setUserAnswers(new Array(quiz.questions.length).fill(""))
    setShowResult(false)
    setQuizCompleted(false)
    setScore(0)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
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

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600 dark:text-green-400"
    if (percentage >= 60) return "text-yellow-600 dark:text-yellow-400"
    return "text-destructive"
  }

  if (quizCompleted) {
    const percentage = Math.round((score / quiz.questions.length) * 100)

    return (
      <div className="min-h-screen bg-background">
        <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => router.push(`/song/${songId}`)}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver a la canción
              </Button>
              <h1 className="text-xl font-bold text-foreground">
                Resultados del Quiz - {quiz.songTitle}
              </h1>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4">
                  <Trophy className={`h-16 w-16 ${getScoreColor(percentage)}`} />
                </div>
                <CardTitle className="text-3xl">¡Quiz Completado!</CardTitle>
                <CardDescription>
                  {quiz.songTitle} - {quiz.artist}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className={`text-6xl font-bold mb-2 ${getScoreColor(percentage)}`}>{percentage}%</div>
                  <p className="text-lg text-muted-foreground">
                    Respondiste correctamente {score} de {quiz.questions.length} preguntas
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Desglose de Rendimiento:</h3>
                  {quiz.questions.map((question, index) => {
                    const isCorrect = userAnswers[index] === question.correctAnswer
                    return (
                      <div
                        key={question.id}
                        className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
                      >
                        {isCorrect ? (
                          <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                        ) : (
                          <XCircle className="h-5 w-5 text-destructive" />
                        )}
                        <div className="flex-1">
                          <p className="font-medium text-foreground">Pregunta {index + 1}</p>
                          <p className="text-sm text-muted-foreground">{question.question}</p>
                          {!isCorrect && (
                            <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                              Respuesta correcta: {question.correctAnswer}
                            </p>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="flex gap-4">
                  <Button onClick={handleRestart} className="flex-1">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Intentar de Nuevo
                  </Button>
                  <Button variant="outline" onClick={() => router.push(`/song/${songId}`)} className="flex-1">
                    Volver a la Canción
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => router.push(`/song/${songId}`)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-foreground">
                Quiz: {quiz.songTitle} - {quiz.artist}
              </h1>
              <Badge className={getDifficultyColor(quiz.difficulty)}>{quiz.difficulty}</Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span>
                Pregunta {currentQuestion + 1} de {quiz.questions.length}
              </span>
              <span>{Math.round(progress)}% Completado</span>
            </div>
            <Progress value={progress} />
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="capitalize">
                  {currentQ.type.replace("-", " ")}
                </Badge>
              </div>
              <CardTitle className="text-xl">{currentQ.question}</CardTitle>
              {currentQ.lyricContext && (
                <CardDescription className="text-base italic bg-primary/10 p-3 rounded-lg border-l-2 border-primary">
                  <Play className="h-4 w-4 inline mr-2" />"{currentQ.lyricContext}"
                </CardDescription>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              {(currentQ.type === "vocabulary" ||
                currentQ.type === "grammar" ||
                currentQ.type === "comprehension") &&
                currentQ.options && (
                  <RadioGroup value={selectedAnswer} onValueChange={handleAnswerSelect}>
                    {currentQ.options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <RadioGroupItem value={option} id={`option-${index}`} />
                        <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}

              {currentQ.type === "fill-blank" && (
                <div>
                  <Input
                    type="text"
                    placeholder="Escribe tu respuesta aquí..."
                    value={selectedAnswer}
                    onChange={(e) => handleAnswerSelect(e.target.value)}
                    className="text-lg"
                  />
                </div>
              )}

              {showResult && (
                <div
                  className={`p-4 rounded-lg border ${
                    selectedAnswer.toLowerCase().trim() === currentQ.correctAnswer.toLowerCase().trim()
                      ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                      : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {selectedAnswer.toLowerCase().trim() === currentQ.correctAnswer.toLowerCase().trim() ? (
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                    ) : (
                      <XCircle className="h-5 w-5 text-destructive" />
                    )}
                    <span className="font-semibold text-foreground">
                      {selectedAnswer.toLowerCase().trim() === currentQ.correctAnswer.toLowerCase().trim()
                        ? "¡Correcto!"
                        : "Incorrecto"}
                    </span>
                  </div>
                  {selectedAnswer.toLowerCase().trim() !== currentQ.correctAnswer.toLowerCase().trim() && (
                    <p className="text-sm mb-2 text-foreground">
                      <strong>Respuesta correcta:</strong> {currentQ.correctAnswer}
                    </p>
                  )}
                  <p className="text-sm text-muted-foreground">{currentQ.explanation}</p>
                </div>
              )}

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
                  Anterior
                </Button>

                <div className="flex gap-2">
                  {!showResult && selectedAnswer && (
                    <Button variant="outline" onClick={handleShowResult}>
                      Verificar Respuesta
                    </Button>
                  )}
                  <Button onClick={handleNext} disabled={!selectedAnswer}>
                    {currentQuestion === quiz.questions.length - 1 ? "Finalizar Quiz" : "Siguiente"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
