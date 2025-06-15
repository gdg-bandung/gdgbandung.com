import { useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  Copy,
  Search,
  Filter,
} from "lucide-react";
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
  DialogTrigger,
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
import { QrCode, Download, User, LogOut, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { toast } from "sonner";
import { auth } from "~/lib/auth.server";
import {
  redirect,
  useLoaderData,
  useNavigate,
  type LoaderFunctionArgs,
} from "react-router";
import { authClient } from "~/lib/auth-client";

interface UrlEntry {
  id: string;
  shortCode: string;
  originalUrl: string;
  title: string;
  isActive: boolean;
  createdAt: string;
  expiresAt?: string;
}

const mockData: UrlEntry[] = [
  {
    id: "1",
    shortCode: "gdg-event-2024",
    originalUrl: "https://gdgbandung.com/events/tech-talk-2024",
    title: "GDG Tech Talk 2024",
    isActive: true,
    createdAt: "2024-01-15",
    expiresAt: "2024-12-31",
  },
  {
    id: "2",
    shortCode: "workshop-ai",
    originalUrl: "https://gdgbandung.com/workshops/ai-machine-learning",
    title: "AI & ML Workshop",
    isActive: true,
    createdAt: "2024-02-01",
  },
  {
    id: "3",
    shortCode: "community-meet",
    originalUrl: "https://gdgbandung.com/meetups/monthly-gathering",
    title: "Monthly Community Meetup",
    isActive: false,
    createdAt: "2024-01-20",
    expiresAt: "2024-03-20",
  },
];

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

  return session.user;
}

export default function HomeMS() {
  const navigate = useNavigate();

  const user = useLoaderData<typeof loader>();

  const [urls, setUrls] = useState<UrlEntry[]>(mockData);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingUrl, setEditingUrl] = useState<UrlEntry | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  const [selectedUrlForQR, setSelectedUrlForQR] = useState<UrlEntry | null>(
    null
  );

  const [formData, setFormData] = useState({
    shortCode: "",
    originalUrl: "",
    title: "",
    expiresAt: "",
    isActive: true,
  });

  const resetForm = () => {
    setFormData({
      shortCode: "",
      originalUrl: "",
      title: "",
      expiresAt: "",
      isActive: true,
    });
  };

  const handleCreate = () => {
    const newUrl: UrlEntry = {
      id: Date.now().toString(),
      shortCode: formData.shortCode,
      originalUrl: formData.originalUrl,
      title: formData.title,
      isActive: formData.isActive,
      createdAt: new Date().toISOString().split("T")[0],
      expiresAt: formData.expiresAt || undefined,
    };

    setUrls([...urls, newUrl]);
    setIsCreateDialogOpen(false);
    resetForm();
    toast.success("URL Created", {
      description: "Short URL has been created successfully.",
    });
  };

  const handleEdit = (url: UrlEntry) => {
    setEditingUrl(url);
    setFormData({
      shortCode: url.shortCode,
      originalUrl: url.originalUrl,
      title: url.title,
      expiresAt: url.expiresAt || "",
      isActive: url.isActive,
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdate = () => {
    if (!editingUrl) return;

    const updatedUrls = urls.map((url) =>
      url.id === editingUrl.id
        ? {
            ...url,
            shortCode: formData.shortCode,
            originalUrl: formData.originalUrl,
            title: formData.title,
            expiresAt: formData.expiresAt || undefined,
            isActive: formData.isActive,
          }
        : url
    );

    setUrls(updatedUrls);
    setIsEditDialogOpen(false);
    setEditingUrl(null);
    resetForm();
    toast.success("URL Updated", {
      description: "Short URL has been updated successfully.",
    });
  };

  const handleDelete = (id: string) => {
    setUrls(urls.filter((url) => url.id !== id));
    toast.success("URL Deleted", {
      description: "Short URL has been deleted successfully.",
    });
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

  const showQRCode = (url: UrlEntry) => {
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

  const handleLogout = async () => {
    await authClient.signOut();
    toast.success("Logged Out", {
      description: "You have been logged out successfully.",
    });
    navigate("/management-system/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <img
                  src="/full-logo.svg"
                  alt="GDG Bandung Logo"
                  className="h-10"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* User Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full cursor-pointer"
                    type="button"
                    onClick={handleLogout}
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.image!} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-600 cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

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
                    {urls.filter((url) => !url.isActive).length}
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
              <Dialog
                open={isCreateDialogOpen}
                onOpenChange={setIsCreateDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Short URL
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Create New Short URL</DialogTitle>
                    <DialogDescription>
                      Create a new shortened URL for your content
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="shortCode" className="text-right">
                        Short Code
                      </Label>
                      <Input
                        id="shortCode"
                        value={formData.shortCode}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            shortCode: e.target.value,
                          })
                        }
                        className="col-span-3"
                        placeholder="e.g., gdg-event-2024"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="originalUrl" className="text-right">
                        Original URL
                      </Label>
                      <Input
                        id="originalUrl"
                        value={formData.originalUrl}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            originalUrl: e.target.value,
                          })
                        }
                        className="col-span-3"
                        placeholder="https://example.com/long-url"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="title" className="text-right">
                        Title
                      </Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        className="col-span-3"
                        placeholder="URL Title"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="expiresAt" className="text-right">
                        Expires At
                      </Label>
                      <Input
                        id="expiresAt"
                        type="date"
                        value={formData.expiresAt}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            expiresAt: e.target.value,
                          })
                        }
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="isActive" className="text-right">
                        Active
                      </Label>
                      <Switch
                        id="isActive"
                        checked={formData.isActive}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, isActive: checked })
                        }
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsCreateDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleCreate}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Create URL
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
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
                      <TableCell>{url.createdAt}</TableCell>
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
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(url.id)}
                            className="text-red-600 hover:text-red-700"
                            title="Delete URL"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
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
                <Label htmlFor="edit-shortCode" className="text-right">
                  Short Code
                </Label>
                <Input
                  id="edit-shortCode"
                  value={formData.shortCode}
                  onChange={(e) =>
                    setFormData({ ...formData, shortCode: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-originalUrl" className="text-right">
                  Original URL
                </Label>
                <Input
                  id="edit-originalUrl"
                  value={formData.originalUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, originalUrl: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-title" className="text-right">
                  Title
                </Label>
                <Input
                  id="edit-title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-expiresAt" className="text-right">
                  Expires At
                </Label>
                <Input
                  id="edit-expiresAt"
                  type="date"
                  value={formData.expiresAt}
                  onChange={(e) =>
                    setFormData({ ...formData, expiresAt: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-isActive" className="text-right">
                  Active
                </Label>
                <Switch
                  id="edit-isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isActive: checked })
                  }
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
    </div>
  );
}
