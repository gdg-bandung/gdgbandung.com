import type { Route } from "./+types/checkin";
import { useState } from "react";
import QRScanner from "~/components/management-system/qr-scanner";
import type { ScanResult } from "~/type/scan";
import { Card } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { auth } from "~/lib/auth.server";
import { authClient } from "~/lib/auth-client";
import { redirect, useNavigate } from "react-router";
import { LogOut } from "lucide-react";

// Loader untuk cek autentikasi
export async function loader({ request }: Route.LoaderArgs) {
    const session = await auth.api.getSession({ headers: request.headers });

    if (!session) {
        return redirect("/login");
    }

    return {
        user: session.user,
    };
}

export default function CheckInPage({ loaderData }: Route.ComponentProps) {
    const { user } = loaderData;
    const navigate = useNavigate();
    const [totalScans, setTotalScans] = useState(0);
    const [successfulScans, setSuccessfulScans] = useState(0);
    const [failedScans, setFailedScans] = useState(0);

    const handleScanSuccess = (result: ScanResult) => {
        setTotalScans((prev) => prev + 1);
        setSuccessfulScans((prev) => prev + 1);
    };

    const handleScanError = (error: string) => {
        setTotalScans((prev) => prev + 1);
        setFailedScans((prev) => prev + 1);
    };

    const handleLogout = async () => {
        try {
            await fetch("https://gdgbandung.com/api/auth/sign-out", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
        } catch (error) {
            console.error("Logout failed", error);
        }

        // Clear local session state
        await authClient.signOut();
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border border-blue-100">
                    <div className="text-center md:text-left">
                        <h1 className="text-2xl font-bold text-gray-900">Check-in Peserta</h1>
                        <p className="text-gray-600">Scan QR Code tiket peserta</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="text-right hidden md:block">
                            <p className="text-sm font-medium text-gray-900">{user.name}</p>
                            <p className="text-xs text-gray-500">Staff</p>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleLogout}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                        </Button>
                    </div>
                </div>

                {/* QR Scanner */}
                <QRScanner onScanSuccess={handleScanSuccess} onScanError={handleScanError} />
            </div>
        </div>
    );
}
