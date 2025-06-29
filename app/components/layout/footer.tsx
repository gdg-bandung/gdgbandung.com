import {
  Instagram,
  Youtube,
  Facebook,
  Mail,
  MessageCircle,
  Send,
  Linkedin,
  Twitter,
  Users,
} from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router";
import { CHANNEL, SOCIAL_MEDIA } from "~/data/footer";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 items-center pb-8">
          {/* Logo and Name */}
          <div className="flex justify-center md:justify-start items-center gap-4">
            <img
              src="/full-logo-dark.svg"
              alt="GDG Bandung Logo"
              className="h-10 md:h-14"
              fetchPriority="low"
              loading="lazy"
            />
          </div>

          {/* Channels and Social Media */}
          <div className="text-center">
            <p className="font-semibold text-white mb-4">Connect With Us</p>
            <div className="flex justify-center gap-4 mb-4">
              {CHANNEL.map((item, index) => (
                <Button
                  size="sm"
                  className="flex items-center gap-2 border-gray-600 bg-white text-gray-400 hover:bg-gray-800 hover:text-white"
                  asChild
                  key={item.name + index}
                >
                  <Link to={item.url} target="_blank" aria-label={item.name}>
                    {item.icon}
                    {item.name}
                  </Link>
                </Button>
              ))}
            </div>
            <div className="flex justify-center gap-3">
              {SOCIAL_MEDIA.map((item, index) => (
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 hover:bg-gray-800"
                  asChild
                  key={item.name + index}
                >
                  <Link to={item.url} target="_blank" aria-label={item.name}>
                    {item.icon}
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          {/* Join Community Button */}
          <div className="text-center md:text-right">
            <p className="font-semibold text-white mb-2">
              Google Developer Group Bandung
            </p>
            <div className="space-y-2 mb-6">
              <div>
                <Link
                  to="/code-of-conduct"
                  className="text-gray-300 hover:text-white transition-colors text-sm block mx-auto md:mx-0 md:ml-auto"
                >
                  Code of Conduct
                </Link>
              </div>
              <div>
                <Link
                  to="/terms-and-conditions"
                  className="text-gray-300 hover:text-white transition-colors text-sm block mx-auto md:mx-0 md:ml-auto"
                >
                  Request for Media Partner
                </Link>
              </div>
              <div>
                <Link
                  to="/brand-guidelines"
                  className="text-gray-300 hover:text-white transition-colors text-sm block mx-auto md:mx-0 md:ml-auto"
                >
                  Brand Guidelines
                </Link>
              </div>
            </div>
            <p className="font-semibold text-white mb-4">Join Our Community</p>
            <Button
              className="bg-gdg-blue hover:bg-blue-600 duration-300 ease-in-out text-white"
              asChild
            >
              <Link to="https://gdg.community.dev/gdg-bandung/" target="_blank">
                <Users className="h-4 w-4 mr-2" />
                Join Community
              </Link>
            </Button>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-700 flex items-center">
          <p className="text-gray-400 text-sm mb-4 w-full md:mb-0 text-center">
            &copy; {currentYear} Google Developer Group Bandung. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
