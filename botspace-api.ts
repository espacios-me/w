/**
 * BotSpace API Client
 * Handles communication with the BotSpace Public API
 */

const API_BASE = "https://public-api.bot.space";
const CHANNEL_ID = "690c66ec2a221421bdc2b6d1";
const API_KEY = "botspace_5ed2f2b9-d7e2-444f-9dee-3411273c5848";

export interface Conversation {
  id: string;
  name: string;
  countryCode: string;
  phone: string;
  fullPhoneNumber: string;
  conversationStatus: "OPEN" | "CLOSED";
  assignmentType: string;
  assignedTo?: string;
  createdAt: string;
}

export interface Message {
  id: string;
  content: string;
  direction: "INBOUND" | "OUTBOUND";
  status: string;
  createdAt: string;
}

export interface DashboardStats {
  totalConversations: number;
  openConversations: number;
  closedConversations: number;
  totalMessages: number;
  lastUpdated: string;
}

/**
 * Fetch conversations for the channel
 */
export async function getConversations(): Promise<Conversation[]> {
  try {
    const response = await fetch(
      `${API_BASE}/v1/${CHANNEL_ID}/conversation?apiKey=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching conversations:", error);
    return [];
  }
}

/**
 * Fetch a specific conversation by ID
 */
export async function getConversation(
  conversationId: string
): Promise<Conversation | null> {
  try {
    const response = await fetch(
      `${API_BASE}/v1/${CHANNEL_ID}/conversation/${conversationId}?apiKey=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data || null;
  } catch (error) {
    console.error("Error fetching conversation:", error);
    return null;
  }
}

/**
 * Calculate dashboard statistics
 */
export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    const conversations = await getConversations();

    const stats: DashboardStats = {
      totalConversations: conversations.length,
      openConversations: conversations.filter(
        (c) => c.conversationStatus === "OPEN"
      ).length,
      closedConversations: conversations.filter(
        (c) => c.conversationStatus === "CLOSED"
      ).length,
      totalMessages: 0, // This would require fetching individual messages
      lastUpdated: new Date().toISOString(),
    };

    return stats;
  } catch (error) {
    console.error("Error calculating stats:", error);
    return {
      totalConversations: 0,
      openConversations: 0,
      closedConversations: 0,
      totalMessages: 0,
      lastUpdated: new Date().toISOString(),
    };
  }
}
