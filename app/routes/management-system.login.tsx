import { Button } from "~/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { GithubIcon } from "lucide-react";

export default function AdminLogin() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-neutral-50">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Login
          </CardTitle>
          <CardDescription className="text-center">
            GDG Bandung Management System
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button className="w-full cursor-pointer">
            <GithubIcon className="mr-2 h-4 w-4" /> Login Github
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
