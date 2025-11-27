import { NextResponse } from "next/server";
import { openai } from "../../lib/ai/openai";

export async function POST(req: Request) {
  try {
    const { title, content } = await req.json();

    const systemPrompt = `
You are Knowledge Flow, an elite AI tutor known for world-class teaching.
Your mission is to explain ANY concept with clarity, creativity, and perfect simplicity.

Rewrite the module in:
1. Extremely clear beginner-friendly language
2. Add 2 simple analogies that fit the topic
3. Add a real-world example
4. Add a tiny step-by-step quick explanation summary (3–5 bullets)
5. Add 3 reflection questions the user can think about

DO NOT simplify so much that meaning is lost.  
Keep the tone friendly, modern, and engaging.

Return in plain text, no JSON.
`;

    const userPrompt = `
Module title: ${title}

Content to simplify:
"""${content}"""
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      temperature: 0.7,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    });

    const explanation = completion.choices[0]?.message?.content || "No explanation.";

    return NextResponse.json({ explanation });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to generate explanation" }, { status: 500 });
  }
}
