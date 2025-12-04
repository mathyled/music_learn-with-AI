import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"

export async function POST(request: NextRequest) {
  try {
    const { lyrics } = await request.json()

    if (!lyrics) {
      return NextResponse.json({ error: "Lyrics are required" }, { status: 400 })
    }

    const { text } = await generateText({
      model: groq("llama-3.3-70b-versatile"),
      prompt: `Analyze these song lyrics for English language learning. Provide a detailed analysis in JSON format:

Lyrics:
${lyrics}

Please analyze and return ONLY a valid JSON object with this exact structure:
{
  "difficulty": "Beginner" | "Intermediate" | "Advanced",
  "verbTenses": ["Present Simple", "Past Simple", etc.],
  "vocabulary": [
    {
      "word": "example",
      "definition": "a thing characteristic of its kind",
      "difficulty": "easy" | "medium" | "hard",
      "partOfSpeech": "noun"
    }
  ],
  "grammarPoints": ["Uses present simple tense", "Contains phrasal verbs"],
  "readingLevel": 1-10
}

Focus on:
1. Overall difficulty level based on vocabulary complexity and grammar structures
2. All verb tenses used in the lyrics
3. Key vocabulary words (10-15 most important/difficult words)
4. Main grammar points that learners should focus on
5. Reading level from 1 (very easy) to 10 (very difficult)

Return only the JSON object, no additional text.`,
    })

    // Parse the response and ensure it's valid JSON
    let analysis
    try {
      analysis = JSON.parse(text)
    } catch (parseError) {
      // If parsing fails, return a default analysis
      analysis = {
        difficulty: "Intermediate",
        verbTenses: ["Present Simple"],
        vocabulary: [],
        grammarPoints: ["Mixed grammar structures"],
        readingLevel: 5,
      }
    }

    return NextResponse.json(analysis)
  } catch (error) {
    console.error("Error analyzing lyrics:", error)
    return NextResponse.json({ error: "Failed to analyze lyrics" }, { status: 500 })
  }
}
