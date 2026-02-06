import type { Route } from "./+types/management-system.check-in";
import { useState } from "react";
import QRScanner from "~/components/management-system/qr-scanner";
import type { ScanResult } from "~/type/scan";
import { Card } from "~/components/ui/card";
import Layout from "~/components/management-system/layout";
import { CheckCircle2 } from "lucide-react";
import { auth } from "~/lib/auth.server";
import { redirect, type LoaderFunctionArgs } from "react-router";
import { getFlagManagementSystem } from "~/utils/flag";

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Check-in Peserta - GDG Bandung Management System" },
        { name: "description", content: "Scan QR Code untuk check-in peserta acara" },
        {
            name: "robots",
            content: "noindex, nofollow",
        },
    ];
};

export async function loader({ request }: LoaderFunctionArgs) {
    const flag = getFlagManagementSystem();
    if (!flag) {
        return redirect("/");
    }
    const session = await auth.api.getSession({
        headers: request.headers,
    });

    if (!session?.user) {
        return redirect("/management-system/login");
    }

    return {
        user: session.user,
    };
}

export default function CheckInPage({ loaderData }: Route.ComponentProps) {
    const { user } = loaderData;
    const [totalScanned, setTotalScanned] = useState(0);
    const [successCount, setSuccessCount] = useState(0);
    const [errorCount, setErrorCount] = useState(0);

    const handleScanSuccess = (result: ScanResult) => {
        setTotalScanned(prev => prev + 1);
        setSuccessCount(prev => prev + 1);
    };

    const handleScanError = (error: string) => {
        setTotalScanned(prev => prev + 1);
        setErrorCount(prev => prev + 1);
    };

    return (
        <Layout user={user}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Check-in Peserta</h1>
                    <p className="text-gray-600">
                        Scan QR Code tiket peserta untuk melakukan check-in
                    </p>
                </div>

                {/* Stats Section */}
                {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <Card className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Scan</p>
                                <p className="text-2xl font-bold">{totalScanned}</p>
                            </div>
                            <div className="bg-blue-100 p-3 rounded-full">
                                <CheckCircle2 className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </Card>

                    <Card className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Berhasil</p>
                                <p className="text-2xl font-bold text-green-600">{successCount}</p>
                            </div>
                            <div className="bg-green-100 p-3 rounded-full">
                                <CheckCircle2 className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </Card>

                    <Card className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Gagal</p>
                                <p className="text-2xl font-bold text-red-600">{errorCount}</p>
                            </div>
                            <div className="bg-red-100 p-3 rounded-full">
                                <CheckCircle2 className="w-6 h-6 text-red-600" />
                            </div>
                        </div>
                    </Card>
                </div> */}

                {/* QR Scanner */}
                <QRScanner
                    onScanSuccess={handleScanSuccess}
                    onScanError={handleScanError}
                />
            </div>
        </Layout>
    );
}
