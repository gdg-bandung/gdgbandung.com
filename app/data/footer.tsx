import {
  Facebook,
  Instagram,
  Linkedin,
  MessageCircle,
  Send,
  Twitter,
  Youtube,
} from "lucide-react";

export const CHANNEL = [
  {
    name: "WhatsApp",
    icon: <MessageCircle className="h-4 w-4 text-green-400" />,
    url: "https://whatsapp.com/channel/0029Vb6x1Tv1yT25CEdqap2C",
  },
  {
    name: "Telegram",
    icon: <Send className="h-4 w-4 text-blue-400" />,
    url: "https://t.me/gdgbandung",
  },
];

export const SOCIAL_MEDIA = [
  {
    name: "LinkedIn",
    icon: <Linkedin className="h-5 w-5 text-blue-400" />,
    url: "https://www.linkedin.com/company/gdg-bandung/",
  },
  {
    name: "X/Twitter",
    icon: (
      <svg
        className="h-5 w-5 text-gray-300"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    url: "https://x.com/GDGBandung",
  },
  {
    name: "Facebook",
    icon: <Facebook className="h-5 w-5 text-blue-400" />,
    url: "https://www.facebook.com/gdgbdg",
  },
  {
    name: "YouTube",
    icon: <Youtube className="h-5 w-5 text-red-400" />,
    url: "https://www.youtube.com/@gdgbandung",
  },
  {
    name: "Instagram",
    icon: <Instagram className="h-5 w-5 text-pink-400" />,
    url: "https://www.instagram.com/gdg_bandung",
  },
];
