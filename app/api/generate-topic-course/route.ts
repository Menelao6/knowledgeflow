import { NextResponse } from "next/server";
import { openai } from "../../lib/ai/openai";
import type { GeneratedCourseShape } from "../../lib/ai/types";
import type { Course } from "../../lib/models/course";

export async function POST(req: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY is not configured on the server." },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { category, topic, level } = body as {
      category: string;
      topic: string;
      level: "beginner" | "intermediate" | "advanced";
    };

    if (!topic || typeof topic !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid 'topic' field." },
        { status: 400 }
      );
    }

    const systemPrompt = `
You are an expert ${category} teacher.
The student wants to learn a specific topic. You design a mini-course fully from scratch.
Assume this is a self-contained course (you cannot rely on previous notes).

You **only** respond with valid JSON, no Markdown, no explanation.

JSON FORMAT (very important):

{
  "title": "string - short course title including the topic",
  "description": "string - 1-2 sentence overview mentioning the level (beginner/intermediate/advanced)",
  "modules": [
    {
      "title": "string",
      "summary": "string - 1-2 sentence summary",
      "learningOutcomes": ["string", "string"],
      "content": "string - explanation of this part of the topic, with simple examples"
    }
  ],
  "flashcards": [
    { "front": "question or term", "back": "answer or explanation" }
  ],
  "quiz": [
    {
      "question": "string",
      "options": ["string", "string", "string", "string"],
      "correctIndex": 0,
      "explanation": "string"
    }
  ]
}

Rules:
- Create 3–6 modules.
- Each module must have at least 3 learning outcomes.
- Tailor depth to the given level: beginner, intermediate, or advanced.
- Use the student’s notes as the core knowledge.
- Add small creative examples to help learning.
- Keep content accurate, beginner-friendly, and enjoyable
- Generate 10–15 flashcards total.
- Generate 5–10 quiz questions total.
- Include at least 2 checkpoint questions per module.
- Use information from the notes. If something isn't in the notes, keep it simple and introductory.
- Return VALID JSON ONLY, no extra text.
- Make the course unique and modern in style.
`;

    const userPrompt = `
Category: ${category}
Topic: ${topic}
Level: ${level}

Design a focused mini-course that teaches this topic.
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      temperature: 0.8,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      return NextResponse.json(
        { error: "No content returned from OpenAI." },
        { status: 500 }
      );
    }

    let generated: GeneratedCourseShape;
    try {
      generated = JSON.parse(content) as GeneratedCourseShape;
    } catch (err) {
      console.error("Failed to parse AI JSON:", content);
      return NextResponse.json(
        { error: "Failed to parse AI response as JSON." },
        { status: 500 }
      );
    }

    const now = new Date().toISOString();

    const course: Course = {
      id: crypto.randomUUID(),
      title:
        generated.title ||
        `${topic} (${level.charAt(0).toUpperCase() + level.slice(1)})`,
      description: generated.description ?? "",
      category,
      source: "category",
      createdAt: now,
      modules:
        generated.modules?.map((m) => ({
          id: crypto.randomUUID(),
          title: m.title,
          summary: m.summary,
          learningOutcomes: m.learningOutcomes ?? [],
          content: m.content,
        })) ?? [],
      flashcards:
        generated.flashcards?.map((f) => ({
          id: crypto.randomUUID(),
          front: f.front,
          back: f.back,
        })) ?? [],
      quiz:
        generated.quiz?.map((q) => ({
          id: crypto.randomUUID(),
          question: q.question,
          options: q.options ?? [],
          correctIndex:
            typeof q.correctIndex === "number" ? q.correctIndex : 0,
          explanation: q.explanation ?? "",
        })) ?? [],
      progress: {
        completedModuleIds: [],
        lastVisitedModuleId: undefined,
      },
    };

    return NextResponse.json(course);
  } catch (err) {
    console.error("Error in /api/generate-topic-course:", err);
    return NextResponse.json(
      { error: "Unexpected server error." },
      { status: 500 }
    );
  }
}
