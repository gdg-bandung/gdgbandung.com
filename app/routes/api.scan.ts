import type { Route } from "./+types/api.scan";

const SCAN_API_URL = "https://go-be.vercel.app/api/v1/checkin";

export async function action({ request }: Route.ActionArgs) {
    try {
        const body = await request.json();

        const response = await fetch(SCAN_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();

        return Response.json(data, {
            status: response.status,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("Proxy error:", error);
        return Response.json(
            {
                success: false,
                message: error instanceof Error ? error.message : "Internal server error",
            },
            { status: 500 }
        );
    }
}
