import { useEffect, useState } from "react";
import {
  Edit,
  Trash2,
  ExternalLink,
  Copy,
  Search,
  Filter,
  Clock,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
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
import { Badge } from "~/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { QrCode } from "lucide-react";
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
import UpdateUrlModal from "~/components/management-system/update-url-modal";
import QrCodeModal from "~/components/management-system/qr-code-modal";
import QRCode from "qrcode";
import { DOMAIN } from "~/configs/domain";
import { getFlagManagementSystem } from "~/utils/flag";
import type { Route } from "./+types/management-system._index";

export const meta: Route.MetaFunction = () => {
  return [
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
    case "reset":
      return {
        acknowledge: true,
        form: "",
        error: null,
      };
    default:
      return {
        acknowledge: false,
        form: "",
        error: null,
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
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [editingUrl, setEditingUrl] = useState<Url | null>(null);

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

  useEffect(() => {
    // reset error
    fetcher.submit({ actionType: "reset" }, { method: "post" });
  }, [isCreateDialogOpen, isEditDialogOpen]);

  const handleEdit = (url: Url) => {
    setEditingUrl(url);
    setIsEditDialogOpen(true);
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
      (statusFilter === "inactive" && !url.isActive) ||
      (statusFilter === "expired" && url.expiresAt < new Date());

    return matchesSearch && matchesStatus;
  });

  const showQRCode = async (url: Url) => {
    try {
      const qrCodeUrl = await QRCode.toDataURL(
        `https://${DOMAIN}${url.shortCode}`
      );
      setQrCodeUrl(qrCodeUrl);
      setSelectedUrlForQR(url);
      setQrDialogOpen(true);
    } catch (error) {
      console.error("Error generating QR code:", error);
      toast.error("Failed to generate QR code.", {
        description: "Please try again later.",
      });
    }
  };

  return (
    <LayoutMS user={user}>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
                    {urls.filter((url) => !url.isActive).length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Trash2 className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Expired URLs
                  </p>
                  <p className="text-3xl font-bold text-red-600">
                    {urls.filter((url) => url.expiresAt < new Date()).length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-red-600" />
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
                  <SelectItem value="expired">Expired</SelectItem>
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
                    <TableHead>Expires Status</TableHead>
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
                      <TableCell>
                        <Badge
                          variant={
                            url.expiresAt < new Date()
                              ? "destructive"
                              : "default"
                          }
                        >
                          {url.expiresAt < new Date() ? "Expired" : "Active"}
                        </Badge>
                      </TableCell>
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
        <UpdateUrlModal
          isEditDialogOpen={isEditDialogOpen}
          setIsEditDialogOpen={setIsEditDialogOpen}
          editingUrl={editingUrl}
          fetcher={fetcher}
        />

        {/* QR Code Dialog */}
        <QrCodeModal
          qrDialogOpen={qrDialogOpen}
          setQrDialogOpen={setQrDialogOpen}
          selectedUrlForQR={selectedUrlForQR}
          qrCodeUrl={qrCodeUrl}
        />
      </main>
    </LayoutMS>
  );
}
