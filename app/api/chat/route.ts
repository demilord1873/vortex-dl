import { NextRequest } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://vortex-dl.vercel.app",
        "X-Title": "Vortex AI",
      },
      body: JSON.stringify({
        model: "arcee-ai/trinity-mini",
        stream: true,
        messages,
      }),
    }
  );

  if (!response.ok) {
    return new Response("OpenRouter error", { status: 500 });
  }

  return new Response(response.body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
    },
  });
}
