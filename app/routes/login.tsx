import type { Route } from "./+types/login";
import { redirect } from "react-router";
import { auth } from "~/lib/auth.server";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";

export async function action({ request }: Route.ActionArgs) {
    // Better Auth needs to handle the request directly to set cookies properly
    return await auth.handler(request);
}

export async function loader({ request }: Route.LoaderArgs) {
    const session = await auth.api.getSession({ headers: request.headers });

    if (session) {
        return redirect("/checkin");
    }

    return {};
}

export default function LoginPage({ actionData }: Route.ComponentProps) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
            <Card className="w-full max-w-md p-8 bg-white shadow-lg">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Login</h1>
                    <p className="text-gray-600">GDG Bandung Check-in System</p>
                </div>

                {/* Use Better Auth client for proper redirect */}
                <form
                    onSubmit={async (e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        const email = formData.get('email') as string;
                        const password = formData.get('password') as string;

                        try {
                            const response = await fetch('/api/auth/sign-in/email', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ email, password }),
                            });

                            const data = await response.json();

                            if (data.user) {
                                // Redirect on successful login
                                window.location.href = '/checkin';
                            } else {
                                alert('Invalid email or password');
                            }
                        } catch (error) {
                            console.error('Login error:', error);
                            alert('Login failed. Please try again.');
                        }
                    }}
                    className="space-y-4"
                >
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>

                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                        Login
                    </Button>
                </form>
            </Card>
        </div>
    );
}
