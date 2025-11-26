import { NextResponse } from "next/server";
import { openai } from "../../lib/ai/openai";

export async function POST(req: Request) {
  try {
    const { title, content } = await req.json();

    const systemPrompt = `
You are a friendly tutor. Explain the user's module content in **simple and clear terms**.
Write as if you're explaining to a beginner student.
Return plain text only.
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
