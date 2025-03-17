import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart as BarChartIcon,
  Globe,
  MousePointer,
  Clock
} from 'lucide-react';
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
  Cell
} from 'recharts';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import type { UrlClick } from '../types/database';

interface ClickStats {
  totalClicks: number;
  countries: { [key: string]: number };
  referrers: { [key: string]: number };
  clicksByDay: { [key: string]: number };
}

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f97316', '#eab308'];

export default function Analytics() {
  const [stats, setStats] = useState<ClickStats>({
    totalClicks: 0,
    countries: {},
    referrers: {},
    clicksByDay: {}
  });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    fetchAnalytics();
  }, [user, navigate]);

  const fetchAnalytics = async () => {
    try {
      const { data: clicks, error } = await supabase
        .from('url_clicks')
        .select('*, short_urls!inner(*)')
        .eq('short_urls.user_id', user?.id);

      if (error) throw error;

      const stats: ClickStats = {
        totalClicks: clicks?.length || 0,
        countries: {},
        referrers: {},
        clicksByDay: {}
      };

      clicks?.forEach((click: UrlClick) => {
        // Count by country
        if (click.country) {
          stats.countries[click.country] = (stats.countries[click.country] || 0) + 1;
        }

        // Count by referrer
        const referrer = click.referrer || 'Direct';
        stats.referrers[referrer] = (stats.referrers[referrer] || 0) + 1;

        // Count by day
        const day = new Date(click.clicked_at).toLocaleDateString();
        stats.clicksByDay[day] = (stats.clicksByDay[day] || 0) + 1;
      });

      setStats(stats);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
      </div>
    );
  }

  const countryData = Object.entries(stats.countries).map(([name, value]) => ({ name, value }));
  const referrerData = Object.entries(stats.referrers).map(([name, value]) => ({ name, value }));
  const clicksByDayData = Object.entries(stats.clicksByDay)
    .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
    .map(([date, clicks]) => ({ date, clicks }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Analytics Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <MousePointer className="h-8 w-8 text-indigo-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Clicks</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalClicks}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <Globe className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Countries</p>
              <p className="text-2xl font-semibold text-gray-900">
                {Object.keys(stats.countries).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <BarChartIcon className="h-8 w-8 text-pink-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Top Country</p>
              <p className="text-2xl font-semibold text-gray-900">
                {countryData.length > 0 ? countryData[0].name : 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Clicks Over Time</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={clicksByDayData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="clicks" fill="#6366f1" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Traffic Sources</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={referrerData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {referrerData.map((entry, index) => (
                    <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}