import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function Redirect() {
  const { shortCode } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleRedirect = async () => {
      try {
        if (!shortCode) {
          navigate('/');
          return;
        }

        // Get the original URL from the database
        const { data, error } = await supabase
          .from('short_urls')
          .select('id, original_url')
          .eq('short_code', shortCode)
          .single();

        if (error || !data) {
          setError('URL not found');
          return;
        }

        // Record the click
        await supabase.from('url_clicks').insert({
          url_id: data.id,
          ip_address: '0.0.0.0', // We'll get this from the server in production
          user_agent: navigator.userAgent,
          referrer: document.referrer || null
        });

        // Update click count
        await supabase
          .from('short_urls')
          .update({ click_count: supabase.sql`click_count + 1` })
          .eq('id', data.id);

        // Redirect to the original URL
        window.location.href = data.original_url;
      } catch (err) {
        setError('An error occurred');
      }
    };

    handleRedirect();
  }, [shortCode, navigate]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-8">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="text-indigo-600 hover:text-indigo-500"
          >
            Go back home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
    </div>
  );
}