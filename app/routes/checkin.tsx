import type { Route } from "./+types/checkin";
import { useState } from "react";
import QRScanner from "~/components/management-system/qr-scanner";
import type { ScanResult } from "~/type/scan";
import { Card } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { auth } from "~/lib/auth.server";
import { redirect } from "react-router";

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

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold text-gray-900">Check-in Peserta</h1>
                    <p className="text-gray-600">
                        Scan QR Code tiket peserta untuk melakukan check-in
                    </p>
                    <p className="text-sm text-gray-500">
                        Logged in as: <span className="font-semibold">{user.name}</span>
                    </p>
                </div>

                {/* Stats
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="p-6 bg-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Total Scan</p>
                                <p className="text-3xl font-bold text-blue-600">{totalScans}</p>
                            </div>
                            <Badge variant="outline" className="bg-blue-50">
                                📊
                            </Badge>
                        </div>
                    </Card>

                    <Card className="p-6 bg-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Berhasil</p>
                                <p className="text-3xl font-bold text-green-600">{successfulScans}</p>
                            </div>
                            <Badge variant="outline" className="bg-green-50">
                                ✅
                            </Badge>
                        </div>
                    </Card>

                    <Card className="p-6 bg-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Gagal</p>
                                <p className="text-3xl font-bold text-red-600">{failedScans}</p>
                            </div>
                            <Badge variant="outline" className="bg-red-50">
                                ❌
                            </Badge>
                        </div>
                    </Card>
                </div> */}

                {/* QR Scanner */}
                <QRScanner onScanSuccess={handleScanSuccess} onScanError={handleScanError} />
            </div>
        </div>
    );
}
