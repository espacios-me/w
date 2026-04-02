import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generateDashboardSummary } from "@/lib/gemini-ai";
import { Sparkles, Loader2 } from "lucide-react";

interface AIInsightsProps {
  stats: {
    totalConversations: number;
    openConversations: number;
    closedConversations: number;
  };
}

export default function AIInsights({ stats }: AIInsightsProps) {
  const [summary, setSummary] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setLoading(true);
        setError(null);
        const aiSummary = await generateDashboardSummary(stats);
        setSummary(aiSummary);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to generate summary";
        setError(errorMessage);
        console.error("Error fetching AI summary:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [stats]);

  return (
    <Card className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-purple-500/20 hover:border-purple-500/40 transition-colors">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-400" />
          AI Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center gap-2 text-slate-400">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm">Analyzing conversations...</span>
          </div>
        ) : error ? (
          <p className="text-sm text-red-400">{error}</p>
        ) : (
          <p className="text-sm text-slate-300 leading-relaxed">{summary}</p>
        )}
      </CardContent>
    </Card>
  );
}
