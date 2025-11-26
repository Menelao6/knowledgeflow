import { NextResponse } from "next/server";
import { openai } from "../../lib/ai/openai";

export async function POST(req: Request) {
  try {
    const { title, content } = await req.json();

    const systemPrompt = `
You are a helpful tutor. Generate **5 practice questions** about this module.
Return them as an array of strings in valid JSON only.
Example:
["Question 1...", "Question 2...", ...]
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
