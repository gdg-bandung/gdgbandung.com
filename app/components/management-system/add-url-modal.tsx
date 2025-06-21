import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import { InputWithLabel } from "../ui/input";
import { Plus } from "lucide-react";
import type { FetcherWithComponents } from "react-router";

export default function AddUrlModal({
  isCreateDialogOpen,
  setIsCreateDialogOpen,
  fetcher,
}: {
  isCreateDialogOpen: boolean;
  setIsCreateDialogOpen: (open: boolean) => void;
  fetcher: FetcherWithComponents<any>;
}) {
  return (
    <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Create Short URL
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <fetcher.Form method="post">
          <DialogHeader>
            <DialogTitle>Create New Short URL</DialogTitle>
            <DialogDescription>
              Create a new shortened URL for your content
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <InputWithLabel
              label="Short Code"
              name="shortCode"
              prefix="gdgbandung.com/"
              error={fetcher.data?.error?.shortCode}
            >
              <Input
                id="shortCode"
                name="shortCode"
                className="w-full"
                placeholder="e.g., gdg-event-2024"
              />
            </InputWithLabel>
            <InputWithLabel
              label="Original URL"
              name="originalUrl"
              error={fetcher.data?.error?.originalUrl}
            >
              <Input
                id="originalUrl"
                name="originalUrl"
                placeholder="https://example.com/long-url"
              />
            </InputWithLabel>
            <InputWithLabel
              label="Title"
              name="title"
              error={fetcher.data?.error?.title}
            >
              <Input id="title" name="title" placeholder="URL Title" />
            </InputWithLabel>
            <InputWithLabel
              label="Expires At"
              name="expiresAt"
              error={fetcher.data?.error?.expiresAt}
            >
              <Input id="expiresAt" name="expiresAt" type="date" />
            </InputWithLabel>
            <InputWithLabel
              label="Active"
              name="isActive"
              error={fetcher.data?.error?.isActive}
            >
              <Switch id="isActive" name="isActive" defaultChecked />
            </InputWithLabel>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              type="button"
              className="cursor-pointer"
              onClick={() => setIsCreateDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={fetcher.state !== "idle"}
              className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
            >
              Create URL
            </Button>
          </DialogFooter>
        </fetcher.Form>
      </DialogContent>
    </Dialog>
  );
}
