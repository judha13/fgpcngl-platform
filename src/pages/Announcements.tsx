import { useState } from "react";
import { Plus, Search, Megaphone, Globe, Eye, EyeOff } from "lucide-react";
import { AdminLayout } from "@/layouts/AdminLayout";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface Announcement {
  id: string;
  title: string;
  content: string;
  priority: "low" | "normal" | "high" | "urgent";
  publishedAt: string;
  expiresAt: string;
  isActive: boolean;
  websites: string[];
}

const initialAnnouncements: Announcement[] = [
  {
    id: "1",
    title: "Christmas Eve Service Times",
    content: "Join us for Christmas Eve services at 4 PM (family), 7 PM (contemporary), and 11 PM (candlelight).",
    priority: "high",
    publishedAt: "Dec 20, 2024",
    expiresAt: "Dec 26, 2024",
    isActive: true,
    websites: ["Main Site", "Youth Site", "Spanish Site"],
  },
  {
    id: "2",
    title: "New Year's Prayer Vigil",
    content: "Ring in the new year with prayer! Join us December 31st at 11 PM for our annual prayer vigil.",
    priority: "normal",
    publishedAt: "Dec 22, 2024",
    expiresAt: "Jan 1, 2025",
    isActive: true,
    websites: ["Main Site", "Spanish Site"],
  },
  {
    id: "3",
    title: "Winter Bible Study Registration",
    content: "Registration is now open for our winter Bible study series starting January 8th.",
    priority: "normal",
    publishedAt: "Dec 15, 2024",
    expiresAt: "Jan 8, 2025",
    isActive: true,
    websites: ["Main Site"],
  },
  {
    id: "4",
    title: "Building Fund Update",
    content: "We've reached 75% of our building fund goal! Thank you for your generous giving.",
    priority: "low",
    publishedAt: "Dec 10, 2024",
    expiresAt: "Jan 31, 2025",
    isActive: false,
    websites: ["Main Site"],
  },
];

const priorityColors = {
  low: "bg-muted text-muted-foreground",
  normal: "bg-info/10 text-info",
  high: "bg-warning/10 text-warning",
  urgent: "bg-destructive/10 text-destructive",
};

export default function Announcements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState<{ title: string; content: string; priority: "low" | "normal" | "high" | "urgent" }>({ title: "", content: "", priority: "normal" });

  const handleToggleActive = (id: string) => {
    setAnnouncements(announcements.map((a) => 
      a.id === id ? { ...a, isActive: !a.isActive } : a
    ));
    const announcement = announcements.find((a) => a.id === id);
    toast.success(
      announcement?.isActive 
        ? "Announcement hidden from all websites" 
        : "Announcement is now visible on selected websites"
    );
  };

  const handleAddAnnouncement = () => {
    if (!newAnnouncement.title || !newAnnouncement.content) {
      toast.error("Please fill in required fields");
      return;
    }

    const announcement: Announcement = {
      id: String(announcements.length + 1),
      title: newAnnouncement.title,
      content: newAnnouncement.content,
      priority: newAnnouncement.priority,
      publishedAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      expiresAt: "Never",
      isActive: true,
      websites: ["Main Site", "Youth Site", "Spanish Site"],
    };

    setAnnouncements([announcement, ...announcements]);
    setNewAnnouncement({ title: "", content: "", priority: "normal" });
    setIsDialogOpen(false);
    toast.success("Announcement published to all connected websites!");
  };

  const handleDelete = (id: string) => {
    setAnnouncements(announcements.filter((a) => a.id !== id));
    toast.success("Announcement deleted from all websites.");
  };

  return (
    <AdminLayout>
      <AdminHeader />
      
      <div className="p-6 space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Announcements</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Broadcast messages across all church websites</p>
        </div>
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search announcements..." className="pl-9 w-64" />
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4" />
                New Announcement
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle className="font-display">Create Announcement</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={newAnnouncement.title}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                    placeholder="Announcement title"
                  />
                </div>
                <div>
                  <Label htmlFor="content">Message *</Label>
                  <Textarea
                    id="content"
                    value={newAnnouncement.content}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
                    placeholder="Write your announcement..."
                    rows={4}
                  />
                </div>
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select 
                    value={newAnnouncement.priority}
                    onValueChange={(value: "low" | "normal" | "high" | "urgent") => 
                      setNewAnnouncement({ ...newAnnouncement, priority: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleAddAnnouncement} className="w-full">
                  Publish Announcement
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Sync Notice */}
        <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary/10 border border-secondary/20">
          <Globe className="w-5 h-5 text-secondary" />
          <p className="text-sm text-foreground">
            Announcements sync in real-time to all selected websites. Toggle visibility to control which sites display each message.
          </p>
        </div>

        {/* Announcements List */}
        <div className="space-y-4">
          {announcements.map((announcement, index) => (
            <div
              key={announcement.id}
              className="bg-card rounded-xl border border-border p-6 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Megaphone className="w-5 h-5 text-primary" />
                    <h3 className="font-display font-semibold text-foreground">
                      {announcement.title}
                    </h3>
                    <Badge className={priorityColors[announcement.priority]}>
                      {announcement.priority}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-4">{announcement.content}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span>Published: {announcement.publishedAt}</span>
                    <span>•</span>
                    <span>Expires: {announcement.expiresAt}</span>
                    <span>•</span>
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      <span>{announcement.websites.length} websites</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {announcement.websites.map((site) => (
                      <Badge key={site} variant="outline" className="text-xs">
                        {site}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {announcement.isActive ? (
                      <Eye className="w-4 h-4 text-success" />
                    ) : (
                      <EyeOff className="w-4 h-4 text-muted-foreground" />
                    )}
                    <Switch
                      checked={announcement.isActive}
                      onCheckedChange={() => handleToggleActive(announcement.id)}
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={() => handleDelete(announcement.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
