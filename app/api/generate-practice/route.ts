import { NextResponse } from "next/server";
import { openai } from "../../lib/ai/openai";

export async function POST(req: Request) {
  try {
    const { title, content } = await req.json();

    const systemPrompt = `
Generate 10 mixed-format practice questions based on the module.

Include:
- 3 recall questions (easy)
- 3 understanding questions
- 2 application questions (real-world scenario)
- 1 fill-in-the-blank
- 1 reverse question: “Given the answer, what was the question?”

Return ONLY JSON:

{
  "questions": [
    { "type": "recall", "question": "" },
    { "type": "scenario", "question": "" },
    { "type": "fill_blank", "question": "" }
  ]
}
`;

    const userPrompt = `
Module title: ${title}

Content:
"""${content}"""
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      temperature: 0.8,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    });

    const raw = completion.choices[0]?.message?.content || "[]";
    let questions = [];

    try {
      questions = JSON.parse(raw);
    } catch {
      questions = ["Could not parse response - try again."];
    }

    return NextResponse.json({ questions });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to generate practice questions" }, { status: 500 });
  }
}
