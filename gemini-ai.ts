/**
 * Gemini AI Integration
 * Provides AI-powered insights and analysis for BotSpace conversations
 */

const GEMINI_API_KEY = "AIzaSyBDW85y2XgKnmeGJ2DSEX5qZZbQPW_Pri0";
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

export interface AIInsight {
  summary: string;
  sentiment: "positive" | "negative" | "neutral";
  keyTopics: string[];
  recommendations: string[];
}

/**
 * Generate AI insights for conversations
 */
export async function generateConversationInsights(
  conversationText: string
): Promise<AIInsight | null> {
  try {
    const prompt = `Analyze the following WhatsApp conversation and provide:
1. A brief summary (1-2 sentences)
2. Overall sentiment (positive/negative/neutral)
3. Key topics discussed (list 3-5)
4. Recommendations for improvement (list 2-3)

Format your response as JSON with keys: summary, sentiment, keyTopics, recommendations

Conversation:
${conversationText}`;

    const response = await fetch(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data = await response.json();
    const responseText =
      data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // Parse JSON from response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Could not parse AI response");
    }

    const insight = JSON.parse(jsonMatch[0]);
    return {
      summary: insight.summary || "",
      sentiment: (insight.sentiment || "neutral").toLowerCase() as
        | "positive"
        | "negative"
        | "neutral",
      keyTopics: Array.isArray(insight.keyTopics) ? insight.keyTopics : [],
      recommendations: Array.isArray(insight.recommendations)
        ? insight.recommendations
        : [],
    };
  } catch (error) {
    console.error("Error generating AI insights:", error);
    return null;
  }
}

/**
 * Generate dashboard summary using AI
 */
export async function generateDashboardSummary(stats: {
  totalConversations: number;
  openConversations: number;
  closedConversations: number;
}): Promise<string> {
  try {
    const prompt = `Based on these WhatsApp bot statistics, provide a brief professional summary (2-3 sentences):
- Total Conversations: ${stats.totalConversations}
- Open Conversations: ${stats.openConversations}
- Closed Conversations: ${stats.closedConversations}

Provide actionable insights about the conversation status.`;

    const response = await fetch(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 256,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data = await response.json();
    const summary =
      data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    return summary;
  } catch (error) {
    console.error("Error generating dashboard summary:", error);
    return "";
  }
}

/**
 * Get AI-powered response suggestions for a conversation
 */
export async function getResponseSuggestions(
  lastMessage: string
): Promise<string[]> {
  try {
    const prompt = `Based on this WhatsApp message, suggest 3 professional response options:

Message: "${lastMessage}"

Provide exactly 3 different response suggestions as a JSON array. Format:
["suggestion 1", "suggestion 2", "suggestion 3"]`;

    const response = await fetch(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.8,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 512,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data = await response.json();
    const responseText =
      data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // Parse JSON array from response
    const jsonMatch = responseText.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      return [];
    }

    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error("Error getting response suggestions:", error);
    return [];
  }
}
