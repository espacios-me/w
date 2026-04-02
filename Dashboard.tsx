import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useBotSpaceData } from "@/hooks/useBotSpaceData";
import AIInsights from "@/components/AIInsights";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  MessageSquare,
  Phone,
  CheckCircle2,
  Clock,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

export default function Dashboard() {
  const { conversations, stats, loading, error, refetch } = useBotSpaceData();

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-red-500 mb-2">Error Loading Data</h3>
              <p className="text-red-400 text-sm">{error}</p>
              <Button
                onClick={refetch}
                variant="outline"
                size="sm"
                className="mt-4"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Retry
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const chartData = [
    {
      name: "Open",
      value: stats?.openConversations || 0,
      fill: "#10b981",
    },
    {
      name: "Closed",
      value: stats?.closedConversations || 0,
      fill: "#6b7280",
    },
  ];

  const barChartData = conversations
    .slice(0, 10)
    .map((conv) => ({
      name: conv.name || conv.phone,
      status: conv.conversationStatus === "OPEN" ? 1 : 0,
    }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">BotSpace Dashboard</h1>
              <p className="text-slate-400 text-sm mt-1">
                Real-time WhatsApp conversation analytics
              </p>
            </div>
            <Button
              onClick={refetch}
              disabled={loading}
              variant="outline"
              size="sm"
            >
              <RefreshCw
                className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* AI Insights */}
        {stats && (
          <div className="mb-8">
            <AIInsights stats={stats} />
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-slate-800/50 border-slate-700/50 hover:border-slate-600/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">
                Total Conversations
              </CardTitle>
              <MessageSquare className="w-4 h-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {loading ? "..." : stats?.totalConversations || 0}
              </div>
              <p className="text-xs text-slate-500 mt-1">All time</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700/50 hover:border-slate-600/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">
                Open Conversations
              </CardTitle>
              <CheckCircle2 className="w-4 h-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {loading ? "..." : stats?.openConversations || 0}
              </div>
              <p className="text-xs text-slate-500 mt-1">Active now</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700/50 hover:border-slate-600/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">
                Closed Conversations
              </CardTitle>
              <Clock className="w-4 h-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {loading ? "..." : stats?.closedConversations || 0}
              </div>
              <p className="text-xs text-slate-500 mt-1">Completed</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700/50 hover:border-slate-600/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">
                Conversation Rate
              </CardTitle>
              <Phone className="w-4 h-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {loading || !stats?.totalConversations
                  ? "0%"
                  : Math.round(
                      ((stats.openConversations / stats.totalConversations) *
                        100)
                    ) + "%"}
              </div>
              <p className="text-xs text-slate-500 mt-1">Open ratio</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Pie Chart */}
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white">Conversation Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center">
                {loading ? (
                  <div className="text-slate-400">Loading...</div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Bar Chart */}
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white">Recent Conversations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                {loading ? (
                  <div className="text-slate-400 flex items-center justify-center h-full">
                    Loading...
                  </div>
                ) : barChartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                      <XAxis dataKey="name" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1e293b",
                          border: "1px solid #475569",
                        }}
                      />
                      <Bar dataKey="status" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="text-slate-400 flex items-center justify-center h-full">
                    No data available
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Conversations Table */}
        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-white">Recent Conversations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700/50">
                    <th className="text-left py-3 px-4 font-semibold text-slate-300">
                      Contact
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-300">
                      Phone
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-300">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-300">
                      Created
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={4} className="text-center py-8 text-slate-400">
                        Loading conversations...
                      </td>
                    </tr>
                  ) : conversations.length > 0 ? (
                    conversations.slice(0, 10).map((conv) => (
                      <tr
                        key={conv.id}
                        className="border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors"
                      >
                        <td className="py-3 px-4 text-white">{conv.name}</td>
                        <td className="py-3 px-4 text-slate-300">
                          {conv.fullPhoneNumber}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              conv.conversationStatus === "OPEN"
                                ? "bg-green-500/20 text-green-400"
                                : "bg-gray-500/20 text-gray-400"
                            }`}
                          >
                            {conv.conversationStatus}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-400">
                          {new Date(conv.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="text-center py-8 text-slate-400">
                        No conversations found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
