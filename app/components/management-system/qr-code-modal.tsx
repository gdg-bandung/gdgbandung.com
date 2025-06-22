import { Download } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import type { Url } from "~/type/url";
import { DOMAIN } from "~/configs/domain";

export default function QrCodeModal({
  selectedUrlForQR,
  qrCodeUrl,
  qrDialogOpen,
  setQrDialogOpen,
}: {
  selectedUrlForQR: Url | null;
  qrCodeUrl: string;
  qrDialogOpen: boolean;
  setQrDialogOpen: (open: boolean) => void;
}) {
  return (
    <Dialog open={qrDialogOpen} onOpenChange={setQrDialogOpen}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>QR Code</DialogTitle>
          <DialogDescription>
            QR code for: {selectedUrlForQR?.title}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4 py-4">
          {selectedUrlForQR && (
            <>
              <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
                <img
                  src={qrCodeUrl}
                  alt={`QR Code for ${selectedUrlForQR.shortCode}`}
                  className="w-48 h-48"
                />
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Scan to visit:</p>
                <code className="bg-gray-100 px-3 py-1 rounded text-sm">
                  https://{DOMAIN}
                  {selectedUrlForQR.shortCode}
                </code>
              </div>
            </>
          )}
        </div>
        <DialogFooter className="flex justify-between">
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={() => setQrDialogOpen(false)}
          >
            Close
          </Button>
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <a
              href={qrCodeUrl}
              download={`qr-${selectedUrlForQR?.shortCode}.png`}
              target="_blank"
            >
              <Download className="w-4 h-4 mr-2" />
              Download QR Code
            </a>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
