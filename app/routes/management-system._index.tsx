import { useEffect, useState } from "react";
import { Edit, Trash2, ExternalLink, Copy, Search, Filter } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Badge } from "~/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Switch } from "~/components/ui/switch";
import { QrCode, Download } from "lucide-react";
import { toast } from "sonner";
import { auth } from "~/lib/auth.server";
import {
  redirect,
  useFetcher,
  useLoaderData,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "react-router";
import {
  actionCreateUrl,
  actionDeleteUrl,
  actionUpdateUrl,
  getUrls,
} from "~/services/url";
import type { Url } from "~/type/url";
import AddUrlModal from "~/components/management-system/add-url-modal";
import LayoutMS from "~/components/management-system/layout";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";

const DOMAIN = "gdgbandung.com/";

const generateQRCode = (text: string): string => {
  // Using QR Server API for QR code generation
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
    text
  )}`;
};

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session?.user) {
    return redirect("/management-system/login");
  }

  const urls = await getUrls();

  return {
    user: session.user,
    response: urls,
  };
}

export async function action({ request }: ActionFunctionArgs) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session?.user) {
    return redirect("/management-system/login");
  }

  const formData = await request.formData();

  switch (formData.get("actionType")) {
    case "create":
      return await actionCreateUrl(formData);
    case "update":
      return await actionUpdateUrl(formData);
    case "delete":
      return await actionDeleteUrl(formData);
    default:
      return {
        acknowledge: false,
        form: "",
        error: true,
      };
  }
}

export default function HomeMS() {
  const fetcher = useFetcher();

  const { user, response } = useLoaderData<typeof loader>();

  const urls = response.data;
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  const [selectedUrlForQR, setSelectedUrlForQR] = useState<Url | null>(null);

  useEffect(() => {
    if (fetcher.data?.form === "create") {
      if (fetcher.data.acknowledge) {
        toast.success("URL Created", {
          description: "Short URL has been created successfully.",
        });
        setIsCreateDialogOpen(false);
      } else if (!fetcher.data.error) {
        toast.error("URL Creation Failed", {
          description: "Failed to create short URL.",
        });
      }
    }

    if (fetcher.data?.form === "update") {
      if (fetcher.data.acknowledge) {
        toast.success("URL Updated", {
          description: "Short URL has been updated successfully.",
        });
        setIsEditDialogOpen(false);
      } else if (!fetcher.data.error) {
        toast.error("URL Update Failed", {
          description: "Failed to update short URL.",
        });
      }
    }

    if (fetcher.data?.form === "delete") {
      if (fetcher.data.acknowledge) {
        toast.success("URL Deleted", {
          description: "Short URL has been deleted successfully.",
        });
      } else if (!fetcher.data.error) {
        toast.error("URL Delete Failed", {
          description: "Failed to delete short URL.",
        });
      }
    }
  }, [fetcher.data]);

  const handleEdit = (url: Url) => {
    // setEditingUrl(url);
    // setFormData({
    //   shortCode: url.shortCode,
    //   originalUrl: url.originalUrl,
    //   title: url.title,
    //   expiresAt: url.expiresAt,
    //   isActive: url.isActive,
    // });
    // setIsEditDialogOpen(true);
  };

  const handleUpdate = () => {
    // if (!editingUrl) return;
    // const updatedUrls = urls.map((url) =>
    //   url.id === editingUrl.id
    //     ? {
    //         ...url,
    //         shortCode: formData.shortCode,
    //         originalUrl: formData.originalUrl,
    //         title: formData.title,
    //         expiresAt: formData.expiresAt || undefined,
    //         isActive: formData.isActive,
    //       }
    //     : url
    // );
    // // setUrls(updatedUrls);
    // setIsEditDialogOpen(false);
    // setEditingUrl(null);
    // resetForm();
    // toast.success("URL Updated", {
    //   description: "Short URL has been updated successfully.",
    // });
  };

  const handleDelete = (id: string) => {
    fetcher.submit({ id, actionType: "delete" }, { method: "post" });
  };

  const copyToClipboard = (shortCode: string) => {
    navigator.clipboard.writeText(`https://${DOMAIN}${shortCode}`);
    toast.success("Copied!", {
      description: "Short URL copied to clipboard.",
    });
  };

  const filteredUrls = urls.filter((url) => {
    const matchesSearch =
      url.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      url.shortCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      url.originalUrl.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && url.isActive) ||
      (statusFilter === "inactive" && !url.isActive);

    return matchesSearch && matchesStatus;
  });

  const showQRCode = (url: Url) => {
    setSelectedUrlForQR(url);
    setQrDialogOpen(true);
  };

  const downloadQRCode = (shortCode: string) => {
    const qrUrl = generateQRCode(`https://${DOMAIN}${shortCode}`);
    const link = document.createElement("a");
    link.href = qrUrl;
    link.download = `qr-${shortCode}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("QR Code Downloaded", {
      description: "QR code has been downloaded successfully.",
    });
  };

  return (
    <LayoutMS user={user}>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total URLs
                  </p>
                  <p className="text-3xl font-bold text-blue-600">
                    {urls.length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <ExternalLink className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Active URLs
                  </p>
                  <p className="text-3xl font-bold text-green-600">
                    {urls.filter((url) => url.isActive).length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Badge className="w-6 h-6 bg-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Inactive URLs
                  </p>
                  <p className="text-3xl font-bold text-red-600">
                    {
                      urls.filter(
                        (url) => !url.isActive || url.expiresAt < new Date()
                      ).length
                    }
                  </p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Trash2 className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* URL Management */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle>URL Management</CardTitle>
                <CardDescription>Manage your shortened URLs</CardDescription>
              </div>
              <AddUrlModal
                isCreateDialogOpen={isCreateDialogOpen}
                setIsCreateDialogOpen={setIsCreateDialogOpen}
                fetcher={fetcher}
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search URLs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>

          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Short Code</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Original URL</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUrls.map((url) => (
                    <TableRow key={url.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-2">
                          <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                            {DOMAIN}
                            {url.shortCode}
                          </code>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(url.shortCode)}
                            className="cursor-pointer"
                            title="Copy Short Code"
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{url.title}</div>
                      </TableCell>
                      <TableCell>
                        <a
                          href={url.originalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline truncate max-w-[300px] block"
                        >
                          {url.originalUrl}
                        </a>
                      </TableCell>
                      <TableCell>
                        <Badge variant={url.isActive ? "default" : "secondary"}>
                          {url.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>{url.createdAt.toISOString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => showQRCode(url)}
                            title="Generate QR Code"
                          >
                            <QrCode className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(url)}
                            title="Edit URL"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <AlertDialog>
                            <Button
                              variant="ghost"
                              size="sm"
                              type="button"
                              className="text-red-600 hover:text-red-700 cursor-pointer"
                              title="Delete URL"
                              asChild
                            >
                              <AlertDialogTrigger>
                                <Trash2 className="w-4 h-4" />
                              </AlertDialogTrigger>
                            </Button>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will
                                  permanently delete your account and remove
                                  your data from our servers.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel
                                  disabled={fetcher.state !== "idle"}
                                >
                                  Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  disabled={fetcher.state !== "idle"}
                                  onClick={() => handleDelete(url.id)}
                                >
                                  Continue
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit Short URL</DialogTitle>
              <DialogDescription>
                Update the details of your shortened URL
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-shortCode" className="text-left">
                  Short Code
                </Label>
                <Input
                  id="edit-shortCode"
                  // value={formData.shortCode}
                  // onChange={(e) =>
                  //   setFormData({ ...formData, shortCode: e.target.value })
                  // }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-originalUrl" className="text-left">
                  Original URL
                </Label>
                <Input
                  id="edit-originalUrl"
                  // value={formData.originalUrl}
                  // onChange={(e) =>
                  //   setFormData({ ...formData, originalUrl: e.target.value })
                  // }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-title" className="text-left">
                  Title
                </Label>
                <Input
                  id="edit-title"
                  // value={formData.title}
                  // onChange={(e) =>
                  //   setFormData({ ...formData, title: e.target.value })
                  // }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-expiresAt" className="text-left">
                  Expires At
                </Label>
                <Input
                  id="edit-expiresAt"
                  type="date"
                  // value={formData.expiresAt}
                  // onChange={(e) =>
                  //   setFormData({ ...formData, expiresAt: e.target.value })
                  // }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-isActive" className="text-left">
                  Active
                </Label>
                <Switch
                  id="edit-isActive"
                  // checked={formData.isActive}
                  // onCheckedChange={(checked) =>
                  //   setFormData({ ...formData, isActive: checked })
                  // }
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpdate}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Update URL
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* QR Code Dialog */}
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
                      src={generateQRCode(
                        `https://${DOMAIN}${
                          selectedUrlForQR.shortCode || "/placeholder.svg"
                        }`
                      )}
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
              <Button variant="outline" onClick={() => setQrDialogOpen(false)}>
                Close
              </Button>
              <Button
                onClick={() =>
                  selectedUrlForQR && downloadQRCode(selectedUrlForQR.shortCode)
                }
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Download className="w-4 h-4 mr-2" />
                Download QR Code
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </LayoutMS>
  );
}
