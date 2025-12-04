import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"

export async function POST(request: NextRequest) {
  try {
    const { lyrics, analysis } = await request.json()

    if (!lyrics || !analysis) {
      return NextResponse.json({ error: "Lyrics and analysis are required" }, { status: 400 })
    }

    const { text } = await generateText({
      model: groq("llama-3.3-70b-versatile"), // Updated model from deprecated llama-3.1-70b-versatile to llama-3.3-70b-versatile
      prompt: `Create an English learning quiz based on these song lyrics and analysis. Generate exactly 10 questions of different types.

Lyrics:
${lyrics}

Analysis:
${JSON.stringify(analysis)}

Create a quiz with these question types:
1. Fill-in-the-blank (4 questions) - Remove key words from lyric lines
2. Vocabulary meaning (3 questions) - Ask about word definitions
3. Grammar/verb tense (2 questions) - Focus on verb tenses used
4. Comprehension (1 question) - About the song's meaning

Return ONLY a valid JSON object with this structure:
{
  "questions": [
    {
      "id": 1,
      "type": "fill-blank",
      "question": "Complete the lyric: 'I can see clearly now, the ____ is gone'",
      "lyricContext": "I can see clearly now, the rain is gone",
      "options": ["rain", "pain", "stain", "main"],
      "correctAnswer": "rain",
      "explanation": "The correct word is 'rain' which fits the metaphor of clarity after a storm."
    },
    {
      "id": 2,
      "type": "vocabulary",
      "question": "What does 'clearly' mean in this context?",
      "word": "clearly",
      "options": ["loudly", "obviously", "slowly", "quietly"],
      "correctAnswer": "obviously",
      "explanation": "'Clearly' means in a way that is easy to see, hear, or understand."
    },
    {
      "id": 3,
      "type": "grammar",
      "question": "What verb tense is used in 'I have been waiting'?",
      "options": ["Present Simple", "Present Perfect Continuous", "Past Simple", "Future Simple"],
      "correctAnswer": "Present Perfect Continuous",
      "explanation": "Present Perfect Continuous shows an action that started in the past and continues to the present."
    },
    {
      "id": 4,
      "type": "comprehension",
      "question": "What is the main theme of this song?",
      "options": ["Love", "Hope", "Sadness", "Anger"],
      "correctAnswer": "Hope",
      "explanation": "The song expresses optimism and hope for better times ahead."
    }
  ]
}

IMPORTANT: Return ONLY the JSON object, no markdown code blocks, no explanations, no additional text. Start with { and end with }.`,
    })

    console.log("[generate-quiz] Raw response from Groq:", text.substring(0, 500))

    // Clean the response - remove markdown code blocks if present
    let cleanedText = text.trim()
    
    // Remove markdown code blocks (```json ... ```)
    if (cleanedText.startsWith("```")) {
      cleanedText = cleanedText.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "")
    }
    
    // Remove any leading/trailing whitespace
    cleanedText = cleanedText.trim()
    
    // Try to extract JSON if there's extra text
    const jsonMatch = cleanedText.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      cleanedText = jsonMatch[0]
    }

    let quiz
    try {
      quiz = JSON.parse(cleanedText)
      console.log("[generate-quiz] Successfully parsed quiz with", quiz.questions?.length || 0, "questions")
    } catch (parseError) {
      console.error("[generate-quiz] JSON parse error:", parseError)
      console.error("[generate-quiz] Text that failed to parse:", cleanedText.substring(0, 1000))
      // Return a default quiz if parsing fails
      quiz = {
        questions: [
          {
            id: 1,
            type: "fill-blank",
            question: "Complete the missing word in the lyrics",
            lyricContext: "Sample lyric line",
            options: ["word1", "word2", "word3", "word4"],
            correctAnswer: "word1",
            explanation: "This is the correct word based on context.",
          },
        ],
      }
    }

    return NextResponse.json(quiz)
  } catch (error) {
    console.error("Error generating quiz:", error)
    return NextResponse.json({ error: "Failed to generate quiz" }, { status: 500 })
  }
}
