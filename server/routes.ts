import { type Express, type Request, type Response } from "express";

const BOTSPACE_API_BASE = "https://public-api.bot.space";
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

async function handleBotSpaceRequest(pathname: string, res: Response) {
  try {
    const channelId = requireEnv("BOTSPACE_CHANNEL_ID");
    const apiKey = requireEnv("BOTSPACE_API_KEY");

    const response = await fetch(
      `${BOTSPACE_API_BASE}/v1/${channelId}${pathname}?apiKey=${apiKey}`
    );

    if (!response.ok) {
      const errorText = await response.text();
      res.status(response.status).json({
        error: "BotSpace API request failed",
        details: errorText || response.statusText,
      });
      return;
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown server error";
    const statusCode = message.includes("Missing required environment variable")
      ? 500
      : 502;

    res.status(statusCode).json({ error: message });
  }
}

async function handleGeminiRequest(req: Request, res: Response) {
  try {
    const apiKey = requireEnv("GEMINI_API_KEY");

    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      res.status(response.status).json({
        error: "Gemini API request failed",
        details: errorText || response.statusText,
      });
      return;
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown server error";
    const statusCode = message.includes("Missing required environment variable")
      ? 500
      : 502;

    res.status(statusCode).json({ error: message });
  }
}

export function registerApiRoutes(app: Express) {
  app.get("/api/botspace/conversations", async (_req, res) => {
    await handleBotSpaceRequest("/conversation", res);
  });

  app.get("/api/botspace/conversations/:conversationId", async (req, res) => {
    const { conversationId } = req.params;
    await handleBotSpaceRequest(`/conversation/${conversationId}`, res);
  });

  app.post("/api/gemini/generate", async (req, res) => {
    await handleGeminiRequest(req, res);
  });
}
