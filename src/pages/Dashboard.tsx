import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';
import { Copy, Trash2, ExternalLink, QrCode } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import type { ShortUrl } from '../types/database';

export default function Dashboard() {
  const [urls, setUrls] = useState<ShortUrl[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    fetchUrls();
  }, [user, navigate]);

  const fetchUrls = async () => {
    try {
      const { data, error } = await supabase
        .from('short_urls')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUrls(data || []);
    } catch (error) {
      toast.error('Failed to fetch URLs');
    } finally {
      setLoading(false);
    }
  };

  const getShortUrl = (url: ShortUrl) => {
    if (url.custom_alias) {
      return `https://gdgbandung.com/${url.short_code}`;
    }
    return `https://shortlink.gdgbandung.com/${url.short_code}`;
  };

  const copyToClipboard = async (url: ShortUrl) => {
    const shortUrl = getShortUrl(url);
    try {
      await navigator.clipboard.writeText(shortUrl);
      toast.success('URL copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy URL');
    }
  };

  const deleteUrl = async (id: string) => {
    try {
      const { error } = await supabase
        .from('short_urls')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setUrls(urls.filter(url => url.id !== id));
      toast.success('URL deleted successfully');
    } catch (error) {
      toast.error('Failed to delete URL');
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Your Shortened URLs</h1>

      {urls.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">You haven't created any shortened URLs yet.</p>
        </div>
      ) : (
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Original URL
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Short URL
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Clicks
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {urls.map((url) => (
                <tr key={url.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <a
                        href={url.original_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="truncate max-w-md hover:text-indigo-600"
                      >
                        {url.original_url}
                      </a>
                      <ExternalLink className="h-4 w-4 ml-2 text-gray-400" />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {url.custom_alias ? (
                      `gdgbandung.com/${url.short_code}`
                    ) : (
                      `shortlink.gdgbandung.com/${url.short_code}`
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {url.click_count}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(url.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => copyToClipboard(url)}
                        className="text-gray-400 hover:text-indigo-600"
                      >
                        <Copy className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => setSelectedUrl(selectedUrl === url.id ? null : url.id)}
                        className="text-gray-400 hover:text-indigo-600"
                      >
                        <QrCode className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => deleteUrl(url.id)}
                        className="text-gray-400 hover:text-red-600"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                    {selectedUrl === url.id && (
                      <div className="absolute mt-2 p-4 bg-white rounded-lg shadow-lg">
                        <QRCodeCanvas
                          value={getShortUrl(url)}
                          size={200}
                          level="H"
                        />
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}