import { useState, useEffect } from "react";
import {
  redirect,
  useLoaderData,
  useNavigate,
  type LoaderFunctionArgs,
} from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {
  BarChart3,
  Eye,
  Globe,
  Monitor,
  Smartphone,
  Tablet,
  Chrome,
  Calendar,
  TrendingUp,
  Users,
  Clock,
  ExternalLink,
  ArrowLeft,
  RefreshCw,
} from "lucide-react";
import { format } from "date-fns";
import { auth } from "~/lib/auth.server";
import { getUrlAnalyticsSummary, getRecentVisits } from "~/services/analytics";
import { findUrlById } from "~/services/url";
import { getFlagManagementSystem } from "~/utils/flag";
import LayoutMS from "~/components/management-system/layout";
import type { Route } from "./+types/management-system.analytics.$urlId";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const flag = getFlagManagementSystem();
  if (!flag) {
    return redirect("/");
  }

  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session?.user) {
    return redirect("/management-system/login");
  }

  const { urlId } = params;
  if (!urlId) {
    return redirect("/management-system");
  }

  // Get URL data first to verify it exists
  const urlResult = await findUrlById(urlId);
  if (!urlResult.acknowledge || !urlResult.data) {
    return redirect("/management-system");
  }

  // Get analytics data
  const analyticsData = await getUrlAnalyticsSummary(urlId);
  const recentVisitsResult = await getRecentVisits(urlId, 50);

  return {
    user: session.user,
    url: urlResult.data,
    analyticsData,
    recentVisits: recentVisitsResult.success ? recentVisitsResult.data : [],
  };
}

export default function AnalyticsPage() {
  const { user, url, analyticsData, recentVisits } =
    useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate refresh - in a real app, you'd refetch the data
    setTimeout(() => {
      setIsRefreshing(false);
      window.location.reload();
    }, 1000);
  };

  const getDeviceIcon = (device: string) => {
    switch (device?.toLowerCase()) {
      case "mobile":
        return <Smartphone className="w-4 h-4" />;
      case "tablet":
        return <Tablet className="w-4 h-4" />;
      default:
        return <Monitor className="w-4 h-4" />;
    }
  };

  const getBrowserIcon = (browser: string) => {
    switch (browser?.toLowerCase()) {
      case "chrome":
        return <Chrome className="w-4 h-4" />;
      default:
        return <Globe className="w-4 h-4" />;
    }
  };

  const formatReferrer = (referrer: string | null) => {
    if (!referrer || referrer === "Direct") return "Direct";
    try {
      const url = new URL(referrer);
      return url.hostname;
    } catch {
      return referrer;
    }
  };

  return (
    <LayoutMS user={user}>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/management-system")}
                className="flex items-center gap-2 cursor-pointer"
                title="back"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                  <BarChart3 className="w-8 h-8" />
                  Analytics
                </h1>
                <p className="text-gray-600 mt-1">
                  Detailed analytics for your shortened URL
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-2"
            >
              <RefreshCw
                className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
          </div>
        </div>

        {/* URL Info Card */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  {url.title}
                </h2>
                <p className="text-gray-600 mt-1">/{url.shortCode}</p>
                <div className="flex items-center gap-4 mt-3">
                  <Badge variant={url.isActive ? "default" : "secondary"}>
                    {url.isActive ? "Active" : "Inactive"}
                  </Badge>
                  <Badge
                    variant={
                      url.expiresAt < new Date() ? "destructive" : "default"
                    }
                  >
                    {url.expiresAt < new Date() ? "Expired" : "Valid"}
                  </Badge>
                  <span className="text-sm text-gray-500">
                    Expires: {format(new Date(url.expiresAt), "MMM d, yyyy")}
                  </span>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={() => window.open(url.originalUrl, "_blank")}
                className="flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                View Original
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Analytics Content */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="breakdown">Breakdown</TabsTrigger>
            <TabsTrigger value="recent">Recent Visits</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Total Clicks
                      </p>
                      <p className="text-3xl font-bold text-blue-600">
                        {analyticsData.totalClicks}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Eye className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Unique Visitors
                      </p>
                      <p className="text-3xl font-bold text-green-600">
                        {analyticsData.uniqueClicks}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Clicks Today
                      </p>
                      <p className="text-3xl font-bold text-purple-600">
                        {analyticsData.clicksToday}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        This Month
                      </p>
                      <p className="text-3xl font-bold text-orange-600">
                        {analyticsData.clicksThisMonth}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Time Period Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Time Period Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">Today</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {analyticsData.clicksToday}
                    </p>
                  </div>
                  <div className="text-center p-6 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">This Week</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {analyticsData.clicksThisWeek}
                    </p>
                  </div>
                  <div className="text-center p-6 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">This Month</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {analyticsData.clicksThisMonth}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="breakdown" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Top Referrers */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Referrers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.topReferrers.length > 0 ? (
                      analyticsData.topReferrers.map((referrer, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <Globe className="w-5 h-5 text-gray-500" />
                            <span className="font-medium">
                              {formatReferrer(referrer.referrer)}
                            </span>
                          </div>
                          <Badge variant="secondary">
                            {referrer.count} clicks
                          </Badge>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-center py-4">
                        No referrer data available
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Device Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Device Types</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.deviceBreakdown.length > 0 ? (
                      analyticsData.deviceBreakdown.map((device, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            {getDeviceIcon(device.device)}
                            <span className="font-medium capitalize">
                              {device.device}
                            </span>
                          </div>
                          <Badge variant="secondary">
                            {device.count} clicks
                          </Badge>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-center py-4">
                        No device data available
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Browser Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Browsers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.browserBreakdown.length > 0 ? (
                      analyticsData.browserBreakdown.map((browser, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            {getBrowserIcon(browser.browser)}
                            <span className="font-medium capitalize">
                              {browser.browser}
                            </span>
                          </div>
                          <Badge variant="secondary">
                            {browser.count} clicks
                          </Badge>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-center py-4">
                        No browser data available
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="recent" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Visits</CardTitle>
                <p className="text-sm text-gray-600">
                  Last 50 visits to this URL
                </p>
              </CardHeader>
              <CardContent>
                {recentVisits && recentVisits.length > 0 ? (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Time</TableHead>
                          <TableHead>Referrer</TableHead>
                          <TableHead>Device</TableHead>
                          <TableHead>Browser</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recentVisits.map((visit) => (
                          <TableRow key={visit.id}>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-gray-500" />
                                <span className="text-sm">
                                  {format(
                                    new Date(visit.visitedAt),
                                    "MMM d, yyyy HH:mm"
                                  )}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Globe className="w-4 h-4 text-gray-500" />
                                <span className="text-sm">
                                  {formatReferrer(visit.referrer)}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                {getDeviceIcon(visit.device || "unknown")}
                                <span className="text-sm capitalize">
                                  {visit.device || "Unknown"}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                {getBrowserIcon(visit.browser || "unknown")}
                                <span className="text-sm capitalize">
                                  {visit.browser || "Unknown"}
                                </span>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Eye className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No visits recorded yet
                    </h3>
                    <p className="text-gray-500">
                      Share your URL to start tracking analytics
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </LayoutMS>
  );
}
