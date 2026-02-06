export interface ScanRequest {
    qr_data: string;
}

export interface ScanResponse {
    acknowledge: boolean;
    data?: {
        participant_id: string;
        transaction_id: string;
        name?: string;
        email?: string;
        ticket_type?: string;
        checked_in_at?: string;
        [key: string]: unknown;
    };
    message?: string;
}

export interface ScanError {
    type: 'network' | 'validation' | 'api';
    message: string;
}

export interface ScanResult {
    success: boolean;
    data?: ScanResponse['data'];
    error?: ScanError;
}
