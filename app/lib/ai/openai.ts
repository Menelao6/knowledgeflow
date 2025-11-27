// lib/ai/openai.ts
import OpenAI from "openai";

if (!process.env.OPENAI_API_KEY) {
  console.warn(
    "[Knowledge Flow] OPENAI_API_KEY is not set. API routes will return errors until it is configured."
  );
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
