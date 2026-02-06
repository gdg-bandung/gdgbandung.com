import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { scanQRCode } from "~/services/scan";
import type { ScanResult } from "~/type/scan";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Camera, CheckCircle2, XCircle, Loader2, AlertCircle } from "lucide-react";

interface QRScannerProps {
    onScanSuccess?: (result: ScanResult) => void;
    onScanError?: (error: string) => void;
}

type ScanStatus = "idle" | "scanning" | "processing" | "success" | "error";

export default function QRScanner({ onScanSuccess, onScanError }: QRScannerProps) {
    const [scanStatus, setScanStatus] = useState<ScanStatus>("idle");
    const [scanResult, setScanResult] = useState<ScanResult | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [cameraError, setCameraError] = useState<string>("");
    const [countdown, setCountdown] = useState(3);
    const scannerRef = useRef<Html5Qrcode | null>(null);
    const scannerDivId = "qr-scanner-container";
    const isProcessingRef = useRef(false);
    const autoResumeTimerRef = useRef<NodeJS.Timeout | null>(null);
    const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const startScanner = async () => {
        try {
            setCameraError("");
            setScanStatus("scanning");

            // Wait for the DOM element to be rendered
            await new Promise(resolve => setTimeout(resolve, 100));

            // Check if element exists
            const element = document.getElementById(scannerDivId);
            if (!element) {
                throw new Error(`HTML Element with id=${scannerDivId} not found`);
            }

            const scanner = new Html5Qrcode(scannerDivId);
            scannerRef.current = scanner;

            await scanner.start(
                { facingMode: "environment" }, // Use back camera on mobile
                {
                    fps: 10,
                    qrbox: { width: 250, height: 250 },
                },
                handleQRCodeDetected,
                handleQRCodeScanFailure
            );
        } catch (error) {
            console.error("Error starting scanner:", error);
            setCameraError("Akses kamera diperlukan untuk scan QR. Pastikan Anda memberikan izin akses kamera.");
            setScanStatus("error");
        }
    };

    const stopScanner = async () => {
        if (scannerRef.current) {
            try {
                await scannerRef.current.stop();
                scannerRef.current.clear();
                scannerRef.current = null;
            } catch (error) {
                console.error("Error stopping scanner:", error);
            }
        }
    };

    const handleQRCodeDetected = async (decodedText: string) => {
        // Prevent multiple simultaneous scans
        if (isProcessingRef.current) {
            return;
        }

        isProcessingRef.current = true;
        setScanStatus("processing");

        try {
            // Stop scanner while processing
            await stopScanner();

            // Call API
            const result = await scanQRCode(decodedText);

            setScanResult(result);

            if (result.success) {
                setScanStatus("success");
                onScanSuccess?.(result);

                // Start countdown from 3
                setCountdown(3);

                // Countdown visual feedback
                countdownIntervalRef.current = setInterval(() => {
                    setCountdown(prev => {
                        if (prev <= 1) {
                            if (countdownIntervalRef.current) {
                                clearInterval(countdownIntervalRef.current);
                            }
                            return 0;
                        }
                        return prev - 1;
                    });
                }, 1000);

                // Auto-resume scanning after 3 seconds for next participant
                autoResumeTimerRef.current = setTimeout(() => {
                    resumeScanning();
                }, 3000);
            } else {
                setScanStatus("error");
                setErrorMessage(result.error?.message || "Terjadi kesalahan");
                onScanError?.(result.error?.message || "Unknown error");
            }
        } catch (error) {
            setScanStatus("error");
            const message = error instanceof Error ? error.message : "Terjadi kesalahan tidak terduga";
            setErrorMessage(message);
            onScanError?.(message);
        } finally {
            isProcessingRef.current = false;
        }
    };

    const resumeScanning = async () => {
        // Clear any active timers
        if (autoResumeTimerRef.current) {
            clearTimeout(autoResumeTimerRef.current);
            autoResumeTimerRef.current = null;
        }
        if (countdownIntervalRef.current) {
            clearInterval(countdownIntervalRef.current);
            countdownIntervalRef.current = null;
        }

        setScanStatus("idle");
        setScanResult(null);
        setCountdown(3);

        // Auto-restart scanner for continuous scanning
        setTimeout(() => {
            startScanner();
        }, 300);
    };

    const handleQRCodeScanFailure = (errorMessage: string) => {
        // This is called for every frame without a valid QR code
        // We can ignore these errors as they're just "no QR found" messages
        // console.log("Scan attempt:", errorMessage);
    };

    const resetScanner = async () => {
        await stopScanner();
        setScanStatus("idle");
        setScanResult(null);
        setErrorMessage("");
        setCameraError("");
        isProcessingRef.current = false;
    };

    useEffect(() => {
        // Cleanup on unmount
        return () => {
            stopScanner();
            if (autoResumeTimerRef.current) {
                clearTimeout(autoResumeTimerRef.current);
            }
            if (countdownIntervalRef.current) {
                clearInterval(countdownIntervalRef.current);
            }
        };
    }, []);

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">
            {/* Scanner Container */}
            <Card className="p-6">
                <div className="space-y-4">
                    {/* Status Badge */}
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">QR Scanner</h3>
                        {scanStatus === "scanning" && (
                            <Badge variant="outline" className="bg-blue-50">
                                <Camera className="w-3 h-3 mr-1" />
                                Scanning...
                            </Badge>
                        )}
                        {scanStatus === "processing" && (
                            <Badge variant="outline" className="bg-yellow-50">
                                <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                                Processing...
                            </Badge>
                        )}
                        {scanStatus === "success" && (
                            <Badge variant="outline" className="bg-green-50">
                                <CheckCircle2 className="w-3 h-3 mr-1 text-green-600" />
                                Success
                            </Badge>
                        )}
                        {scanStatus === "error" && (
                            <Badge variant="outline" className="bg-red-50">
                                <XCircle className="w-3 h-3 mr-1 text-red-600" />
                                Error
                            </Badge>
                        )}
                    </div>

                    {/* Camera View / Status Display */}
                    <div className="relative">
                        {scanStatus === "idle" && (
                            <div className="bg-gray-50 rounded-lg p-12 text-center border-2 border-dashed border-gray-300">
                                <Camera className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                                <p className="text-gray-600 mb-4">Siap untuk scan QR Code peserta</p>
                                <Button onClick={startScanner} className="bg-blue-600 hover:bg-blue-700">
                                    <Camera className="w-4 h-4 mr-2" />
                                    Mulai Scan
                                </Button>
                            </div>
                        )}

                        {scanStatus === "scanning" && (
                            <div className="space-y-4">
                                <div id={scannerDivId} className="rounded-lg overflow-hidden border-2 border-blue-500" />
                                <div className="text-center">
                                    <p className="text-sm text-gray-600">Arahkan kamera ke QR Code</p>
                                    <Button onClick={resetScanner} variant="outline" className="mt-2">
                                        Batal
                                    </Button>
                                </div>
                            </div>
                        )}

                        {scanStatus === "processing" && (
                            <div className="bg-yellow-50 rounded-lg p-12 text-center border-2 border-yellow-200">
                                <Loader2 className="w-16 h-16 mx-auto text-yellow-600 mb-4 animate-spin" />
                                <p className="text-gray-600">Memproses check-in...</p>
                            </div>
                        )}

                        {scanStatus === "success" && (
                            <div className="bg-green-50 rounded-lg p-6 border-2 border-green-200">
                                <div className="text-center mb-4">
                                    <CheckCircle2 className="w-16 h-16 mx-auto text-green-600 mb-2" />
                                    <h4 className="text-xl font-bold text-green-900">Check-in Berhasil!</h4>
                                </div>

                                {scanResult?.data ? (
                                    <div className="bg-white rounded-lg p-4 space-y-2">
                                        {scanResult.data.name && (
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Nama:</span>
                                                <span className="font-semibold">{scanResult.data.name}</span>
                                            </div>
                                        )}
                                        {scanResult.data.email && (
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Email:</span>
                                                <span className="font-semibold">{scanResult.data.email}</span>
                                            </div>
                                        )}
                                        {scanResult.data.ticket_type && (
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Tipe Tiket:</span>
                                                <span className="font-semibold">{scanResult.data.ticket_type}</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">ID Transaksi:</span>
                                            <span className="font-mono text-sm">{scanResult.data.transaction_id || "-"}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">ID Peserta:</span>
                                            <span className="font-mono text-sm">{scanResult.data.participant_id || "-"}</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="bg-white rounded-lg p-4 text-center text-gray-500 italic">
                                        Data peserta tidak tersedia
                                    </div>
                                )}

                                {/* Auto-resume countdown - More prominent */}
                                <div className="mt-6 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-200">
                                    <div className="text-center mb-4">
                                        {/* Big countdown number */}
                                        <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 text-white rounded-full mb-3 shadow-lg animate-pulse">
                                            <span className="text-4xl font-bold">{countdown}</span>
                                        </div>
                                        <p className="text-lg font-semibold text-gray-700">
                                            Scanner akan otomatis siap...
                                        </p>
                                        <p className="text-sm text-gray-500 mt-1">
                                            Atau klik button di bawah untuk scan sekarang
                                        </p>
                                    </div>
                                    <Button
                                        onClick={resumeScanning}
                                        className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
                                    >
                                        <Camera className="w-5 h-5 mr-2" />
                                        Scan Peserta Berikutnya Sekarang
                                    </Button>
                                </div>
                            </div>
                        )}

                        {scanStatus === "error" && (
                            <div className="bg-red-50 rounded-lg p-6 border-2 border-red-200">
                                <div className="text-center mb-4">
                                    <AlertCircle className="w-16 h-16 mx-auto text-red-600 mb-2" />
                                    <h4 className="text-xl font-bold text-red-900">Check-in Gagal</h4>
                                </div>

                                <div className="bg-white rounded-lg p-4 mb-4">
                                    <p className="text-gray-800 text-center">{errorMessage || cameraError}</p>
                                </div>

                                <Button onClick={resetScanner} className="w-full bg-blue-600 hover:bg-blue-700">
                                    Coba Lagi
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Camera Error Display */}
                    {cameraError && scanStatus !== "error" && (
                        <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                            <div className="flex items-start">
                                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 mr-2 flex-shrink-0" />
                                <p className="text-sm text-red-800">{cameraError}</p>
                            </div>
                        </div>
                    )}
                </div>
            </Card>

            {/* Instructions */}
            <Card className="p-4 bg-blue-50">
                <h4 className="font-semibold mb-2 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-2 text-blue-600" />
                    Petunjuk
                </h4>
                <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                    <li>Pastikan QR Code dalam kondisi jelas dan tidak rusak</li>
                    <li>Format QR Code harus: ID_TRANSAKSI:ID_PESERTA</li>
                    <li>Izinkan akses kamera saat diminta oleh browser</li>
                    <li>Gunakan pencahayaan yang cukup untuk hasil scan terbaik</li>
                </ul>
            </Card>
        </div>
    );
}
