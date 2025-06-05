import { Link, type LoaderFunctionArgs } from "react-router";
import { redirectRouteToURL } from "~/utils/router-redirect";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Home } from "lucide-react";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return redirectRouteToURL(request);
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* GDG Brand Colors */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-12 h-2 bg-gdg-blue rounded"></div>
          <div className="w-12 h-2 bg-gdg-red rounded"></div>
          <div className="w-12 h-2 bg-gdg-yellow rounded"></div>
          <div className="w-12 h-2 bg-gdg-green rounded"></div>
        </div>

        {/* 404 Display */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-300 mb-4">404</h1>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r mx-auto w-fit from-gdg-blue via-gdg-red via-gdg-yellow to-gdg-green text-transparent bg-clip-text">
              <h2 className="text-4xl font-bold">Page Not Found</h2>
            </div>
            <h2 className="text-4xl font-bold text-gray-900">Page Not Found</h2>
          </div>
        </div>

        {/* Error Message */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardContent className="pt-6">
            <p className="text-lg text-gray-600 mb-4">
              Oops! The page you're looking for doesn't exist or has been moved.
            </p>
            <p className="text-gray-500">
              Don't worry, even the best developers encounter 404 errors. Let's
              get you back on track!
            </p>
          </CardContent>
        </Card>

        <Button size="lg" variant="default" asChild>
          <Link to="/">
            <Home className="h-5 w-5 mr-2" />
            Go to Homepage
          </Link>
        </Button>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-center gap-4 mb-4">
            <img
              src="/full-logo.svg"
              alt="GDG Bandung Logo"
              className="h-10"
              fetchPriority="high"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
