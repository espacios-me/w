/**
 * BotSpace API Client
 * Uses internal backend proxy routes so secrets remain server-side
 */

const BOTSPACE_PROXY_BASE = "/api/botspace";

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
 * Derive dashboard statistics from a conversations array.
 */
export function computeDashboardStats(
  conversations: Conversation[]
): DashboardStats {
  return {
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
}

/**
 * Fetch conversations for the channel
 */
export async function getConversations(): Promise<Conversation[]> {
  try {
    const response = await fetch(`${BOTSPACE_PROXY_BASE}/conversations`);

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
      `${BOTSPACE_PROXY_BASE}/conversations/${conversationId}`
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
