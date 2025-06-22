import type { Url } from "~/type/url";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input, InputWithLabel } from "../ui/input";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import type { FetcherWithComponents } from "react-router";

export default function UpdateUrlModal({
  isEditDialogOpen,
  setIsEditDialogOpen,
  editingUrl,
  fetcher,
}: {
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: (open: boolean) => void;
  editingUrl: Url | null;
  fetcher: FetcherWithComponents<any>;
}) {
  return (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <fetcher.Form method="post">
          <input className="hidden" name="actionType" value="update" />
          <input className="hidden" name="id" value={editingUrl?.id} />
          <DialogHeader>
            <DialogTitle>Edit Short URL</DialogTitle>
            <DialogDescription>
              Update the details of your shortened URL
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <InputWithLabel
              name="shortCode"
              label="Short Code"
              error={fetcher.data?.error?.shortCode}
            >
              <Input
                id="edit-shortCode"
                name="shortCode"
                defaultValue={editingUrl?.shortCode}
                className="col-span-3"
              />
            </InputWithLabel>
            <InputWithLabel
              name="originalUrl"
              label="Original URL"
              error={fetcher.data?.error?.originalUrl}
            >
              <Input
                id="edit-originalUrl"
                name="originalUrl"
                defaultValue={editingUrl?.originalUrl}
                className="col-span-3"
              />
            </InputWithLabel>
            <InputWithLabel
              name="title"
              label="Title"
              error={fetcher.data?.error?.title}
            >
              <Input
                id="edit-title"
                name="title"
                defaultValue={editingUrl?.title}
                className="col-span-3"
              />
            </InputWithLabel>
            <InputWithLabel
              name="expiresAt"
              label="Expires At"
              error={fetcher.data?.error?.expiresAt}
            >
              <Input
                id="edit-expiresAt"
                name="expiresAt"
                type="date"
                defaultValue={
                  editingUrl?.expiresAt?.toISOString().split("T")[0]
                }
                className="col-span-3"
              />
            </InputWithLabel>
            <InputWithLabel
              name="isActive"
              label="Active"
              error={fetcher.data?.error?.isActive}
            >
              <Switch
                id="edit-isActive"
                name="isActive"
                defaultChecked={editingUrl?.isActive}
                className="col-span-3"
              />
            </InputWithLabel>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              type="button"
              disabled={fetcher.state !== "idle"}
              className="cursor-pointer"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={fetcher.state !== "idle"}
              className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
            >
              Update URL
            </Button>
          </DialogFooter>
        </fetcher.Form>
      </DialogContent>
    </Dialog>
  );
}
