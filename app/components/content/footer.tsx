import { Separator } from "@radix-ui/react-separator";
import { Button } from "../ui/button";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";

interface ContentFooterProps {
  description: string;
  links: {
    label: string;
    href: string;
    target?: string;
  }[];
}

export default function ContentFooter({
  description,
  links,
}: ContentFooterProps) {
  return (
    <>
      <Separator className="my-12" />
      <div className="text-center space-y-4">
        <p className="text-sm text-gray-500">{description}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="outline" className="cursor-pointer">
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          {links.map((link) => (
            <Button key={link.href} asChild className="cursor-pointer">
              <Link to={link.href} target={link.target}>
                {link.label}
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </>
  );
}
