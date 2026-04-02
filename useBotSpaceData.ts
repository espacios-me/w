import { useEffect, useState } from "react";
import {
  Conversation,
  DashboardStats,
  getConversations,
  getDashboardStats,
} from "@/lib/botspace-api";

export interface UseBotSpaceDataResult {
  conversations: Conversation[];
  stats: DashboardStats | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useBotSpaceData(): UseBotSpaceDataResult {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [conversationsData, statsData] = await Promise.all([
        getConversations(),
        getDashboardStats(),
      ]);

      setConversations(conversationsData);
      setStats(statsData);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch data";
      setError(errorMessage);
      console.error("Error fetching BotSpace data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // Refresh data every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  return {
    conversations,
    stats,
    loading,
    error,
    refetch: fetchData,
  };
}
