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
    const { notes, subject, title } = body as {
      notes: string;
      subject: string;
      title?: string;
    };

    if (!notes || typeof notes !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid 'notes' field." },
        { status: 400 }
      );
    }

    const systemPrompt = `
You are an expert ${subject} teacher and course designer.
You create clear, beginner-friendly mini-courses from raw notes.
You **only** respond with valid JSON, no Markdown, no explanation.

JSON FORMAT (very important):

{
  "title": "string - short course title",
  "description": "string - 1-2 sentence overview",
  "modules": [
    {
      "title": "string",
      "summary": "string - 1-2 sentence summary",
      "learningOutcomes": ["string", "string"],
      "content": "string - clear lesson explanation based on the notes"
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
      "explanation": "string - short explanation of the correct answer"
    }
  ]
}

Rules:
- Create 3–6 modules.
- Each module must have at least 3 learning outcomes.
- Generate 10–15 flashcards total.
- Generate 5–10 quiz questions total.
- Use information from the notes. If something isn't in the notes, keep it simple and introductory.
- Return VALID JSON ONLY, no extra text.
`;

    const userPrompt = `
These are the student's raw notes:

"""${notes}"""

Use them to create a focused mini-course in ${subject}.
If a title was provided, use it (or refine it slightly). Otherwise, infer a good title from the notes.

Provided title (may be empty): "${title ?? ""}"
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      temperature: 0.7,
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

    // Build Course object
    const now = new Date().toISOString();

    const course: Course = {
      id: crypto.randomUUID(),
      title: generated.title || title || "Generated Course",
      description: generated.description ?? "",
      category: subject,
      source: "notes",
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
    console.error("Error in /api/generate-course:", err);
    return NextResponse.json(
      { error: "Unexpected server error." },
      { status: 500 }
    );
  }
}
