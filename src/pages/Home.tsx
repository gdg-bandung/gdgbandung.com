import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link2, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { z } from 'zod';

const urlSchema = z.string().url().min(1);

export default function Home() {
  const [url, setUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const generateShortCode = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please login to shorten URLs');
      navigate('/login');
      return;
    }

    try {
      setLoading(true);
      
      // Validate URL
      urlSchema.parse(url);
      
      const shortCode = customAlias || generateShortCode();
      
      const { error } = await supabase
        .from('short_urls')
        .insert({
          original_url: url,
          short_code: shortCode,
          custom_alias: customAlias || null,
          user_id: user.id
        });

      if (error) throw error;

      toast.success('URL shortened successfully!');
      setUrl('');
      setCustomAlias('');
      navigate('/dashboard');
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error('Please enter a valid URL');
      } else {
        toast.error('Failed to shorten URL. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-3xl w-full text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Transform Your Links into Short, Powerful URLs
        </h1>
        <p className="text-xl text-gray-600">
          Create memorable, trackable links that help you share and analyze your content effectively
        </p>
      </div>

      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700">
              Enter your long URL
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Link2 className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="url"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="https://example.com/very/long/url"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="custom-alias" className="block text-sm font-medium text-gray-700">
              Custom alias (optional)
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                gdgbandung.com/
              </span>
              <input
                type="text"
                id="custom-alias"
                value={customAlias}
                onChange={(e) => setCustomAlias(e.target.value)}
                className="flex-1 min-w-0 block w-full px-3 py-3 rounded-none rounded-r-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="custom-alias"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              'Shorten URL'
            )}
          </button>
        </form>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Custom Branding</h3>
          <p className="text-gray-600">Create memorable links with your own custom aliases</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Detailed Analytics</h3>
          <p className="text-gray-600">Track clicks, locations, and referral sources</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Secure & Reliable</h3>
          <p className="text-gray-600">Enterprise-grade security with 99.9% uptime</p>
        </div>
      </div>
    </div>
  );
}