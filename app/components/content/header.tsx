import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

interface ContentHeaderProps {
  title: string;
  subtitle?: string;
}

export default function ContentHeader({ title, subtitle }: ContentHeaderProps) {
  return (
    <div className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link
          to="/"
          className="text-gray-300 hover:text-white mb-6 flex items-center gap-2 font-medium"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        <div className="colorful-bar">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-xl text-gray-300">{subtitle}</p>
      </div>
    </div>
  );
}
