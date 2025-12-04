"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, Music, BookOpen, Trophy, TrendingUp, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { searchSongs, type Song } from "@/lib/lyrics-api"

export default function MusicLearningApp() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Song[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [showAllSongs, setShowAllSongs] = useState(true)

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setShowAllSongs(true)
      const allSongs = await searchSongs("")
      setSearchResults(allSongs)
      return
    }

    setShowAllSongs(false)
    setIsSearching(true)
    try {
      const results = await searchSongs(searchQuery)
      setSearchResults(results)
    } catch (error) {
      console.error("[v0] Search failed:", error)
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }

  useEffect(() => {
    handleSearch()
  }, [])

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "Advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const handleSongClick = (song: Song) => {
    const params = new URLSearchParams({
      title: song.title,
      artist: song.artist,
      album: song.album || "",
      youtubeId: song.youtubeId || "",
    })
    router.push(`/song/${song.id}?${params.toString()}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Music className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">MusicLearn</h1>
            </div>
            <nav className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <BookOpen className="h-4 w-4 mr-2" />
                Lessons
              </Button>
              <Button variant="ghost" size="sm" onClick={() => router.push("/progress")}>
                <Trophy className="h-4 w-4 mr-2" />
                Progress
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 text-balance">
            Aprende Inglés a Través de la Música
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 text-pretty">
            Descubre canciones reales, analiza letras con IA, y mejora tu inglés con quizzes interactivos
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Busca canciones, artistas o álbumes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  className="pl-10 h-12 text-lg"
                />
              </div>
              <Button onClick={handleSearch} disabled={isSearching} className="h-12 px-8">
                {isSearching ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Buscando...
                  </>
                ) : (
                  "Buscar"
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Songs Analyzed</CardTitle>
              <Music className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">10,000+</div>
              <p className="text-xs text-muted-foreground">Across all genres and difficulty levels</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Learning Progress</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85%</div>
              <p className="text-xs text-muted-foreground">Average improvement in vocabulary</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Quizzes Completed</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,247</div>
              <p className="text-xs text-muted-foreground">Keep practicing to improve!</p>
            </CardContent>
          </Card>
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {showAllSongs ? "Todas las Canciones Disponibles" : "Resultados de Búsqueda"}
            </h3>
            <div className="grid gap-4">
              {searchResults.map((song) => (
                <Card key={song.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-xl font-semibold text-gray-900 dark:text-white">{song.title}</h4>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 mb-2">
                          por {song.artist} {song.album && `• ${song.album}`} {song.year && `(${song.year})`}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                          {song.lyrics.substring(0, 150)}...
                        </p>
                      </div>
                      <div className="flex flex-col gap-2 ml-4">
                        <Button size="sm" onClick={() => handleSongClick(song)}>
                          Ver Letras & Análisis
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {searchResults.length === 0 && searchQuery && !isSearching && (
          <div className="text-center py-12">
            <Music className="h-16 w-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No se encontraron canciones</h3>
            <p className="text-gray-600 dark:text-gray-300">Intenta buscar una canción, artista o álbum diferente</p>
          </div>
        )}
      </main>
    </div>
  )
}
