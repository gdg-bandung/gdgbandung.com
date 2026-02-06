import type { ScanRequest, ScanResponse, ScanResult } from "~/type/scan";

// Use local proxy to avoid CORS and mixed content issues
const SCAN_API_URL = "/api/scan";

/**
 * Validates QR code format
 * Expected format: "ID_TRANSAKSI:ID_PESERTA" (e.g., "113632:2687785")
 */
export function validateQRFormat(qrData: string): boolean {
    if (!qrData || typeof qrData !== "string") {
        return false;
    }

    // Must contain exactly one colon separator
    const parts = qrData.split(":");
    if (parts.length !== 2) {
        return false;
    }

    // Both parts should be non-empty and contain only digits
    return parts.every(part => part.trim().length > 0 && /^\d+$/.test(part.trim()));
}

/**
 * Scans QR code and sends check-in request to the API
 */
export async function scanQRCode(qrData: string): Promise<ScanResult> {
    // Validate format first
    if (!validateQRFormat(qrData)) {
        return {
            success: false,
            error: {
                type: "validation",
                message: "Format QR tidak valid. Format yang benar: ID_TRANSAKSI:ID_PESERTA",
            },
        };
    }

    try {
        const payload: ScanRequest = {
            qr_data: qrData.trim(),
        };

        const response = await fetch(SCAN_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const data: ScanResponse = await response.json();

        if (!response.ok) {
            // API returned error status
            return {
                success: false,
                error: {
                    type: "api",
                    message: data.message || `Error ${response.status}: ${response.statusText}`,
                },
            };
        }

        // Success response
        return {
            success: true,
            data: data.data,
        };
    } catch (error) {
        // Network or other errors
        if (error instanceof TypeError && error.message.includes("fetch")) {
            return {
                success: false,
                error: {
                    type: "network",
                    message: "Koneksi bermasalah, silakan coba lagi",
                },
            };
        }

        return {
            success: false,
            error: {
                type: "network",
                message: error instanceof Error ? error.message : "Terjadi kesalahan tidak terduga",
            },
        };
    }
}
