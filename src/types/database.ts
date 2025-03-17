export interface ShortUrl {
  id: string;
  original_url: string;
  short_code: string;
  custom_alias: string | null;
  created_at: string;
  expires_at: string | null;
  password: string | null;
  user_id: string;
  click_count: number;
}

export interface UrlClick {
  id: string;
  url_id: string;
  clicked_at: string;
  referrer: string | null;
  ip_address: string;
  user_agent: string;
  country: string | null;
  city: string | null;
}