import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { redirect, useFetcher } from "react-router";
import { Input } from "~/components/ui/input";
import { auth } from "~/lib/auth.server";
import type { Route } from "./+types/_index";
import { toast } from "sonner";
import { useEffect } from "react";
import { getFlagManagementSystem } from "~/utils/flag";

export const meta: Route.MetaFunction = () => {
  return [
    {
      name: "robots",
      content: "noindex, nofollow",
    },
  ];
};

export async function loader() {
  const flag = getFlagManagementSystem();
  if (!flag) {
    return redirect("/");
  }
}

export async function action({ request }: Route.ActionArgs) {
  try {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");

    const session = await auth.api.signInEmail({
      body: {
        email: email as string,
        password: password as string,
      },
      returnHeaders: true,
    });

    return redirect("/management-system", {
      headers: session.headers,
    });
  } catch (error) {
    return {
      error,
    };
  }
}

export default function AdminLogin() {
  const fetcher = useFetcher();
  const busy = fetcher.state !== "idle";

  useEffect(() => {
    if (fetcher.data?.error) {
      toast.error("Login Failed", {
        description: fetcher.data.error.message,
      });
    }
  }, [fetcher.data]);

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
        <CardContent>
          <fetcher.Form method="post" className="space-y-4">
            <Input
              type="email"
              name="email"
              placeholder="Email"
              disabled={busy}
              required
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              disabled={busy}
              required
            />
            <Button className="w-full" type="submit" disabled={busy}>
              Login
            </Button>
          </fetcher.Form>
        </CardContent>
      </Card>
    </div>
  );
}
