import { useState } from "react";
import { Globe, Plus, Settings, ExternalLink, CheckCircle, AlertCircle, RefreshCw, Trash2 } from "lucide-react";
import { AdminLayout } from "@/layouts/AdminLayout";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface Website {
  id: string;
  name: string;
  url: string;
  status: "online" | "offline" | "syncing";
  lastSync: string;
  syncEvents: boolean;
  syncSermons: boolean;
  syncAnnouncements: boolean;
  visitors: number;
}

const initialWebsites: Website[] = [
  {
    id: "1",
    name: "Main Church Website",
    url: "gracechurch.org",
    status: "online",
    lastSync: "2 min ago",
    syncEvents: true,
    syncSermons: true,
    syncAnnouncements: true,
    visitors: 1250,
  },
  {
    id: "2",
    name: "Youth Ministry Site",
    url: "youth.gracechurch.org",
    status: "online",
    lastSync: "5 min ago",
    syncEvents: true,
    syncSermons: false,
    syncAnnouncements: true,
    visitors: 340,
  },
  {
    id: "3",
    name: "Spanish Language Site",
    url: "es.gracechurch.org",
    status: "syncing",
    lastSync: "Syncing...",
    syncEvents: true,
    syncSermons: true,
    syncAnnouncements: true,
    visitors: 520,
  },
];

export default function Websites() {
  const [websites, setWebsites] = useState<Website[]>(initialWebsites);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newWebsite, setNewWebsite] = useState({ name: "", url: "" });

  const handleToggleSync = (websiteId: string, syncType: keyof Website) => {
    setWebsites(websites.map((w) => 
      w.id === websiteId ? { ...w, [syncType]: !w[syncType] } : w
    ));
    toast.success("Sync settings updated");
  };

  const handleAddWebsite = () => {
    if (!newWebsite.name || !newWebsite.url) {
      toast.error("Please fill in all fields");
      return;
    }

    const website: Website = {
      id: String(websites.length + 1),
      name: newWebsite.name,
      url: newWebsite.url,
      status: "syncing",
      lastSync: "Just now",
      syncEvents: true,
      syncSermons: true,
      syncAnnouncements: true,
      visitors: 0,
    };

    setWebsites([...websites, website]);
    setNewWebsite({ name: "", url: "" });
    setIsDialogOpen(false);
    toast.success("Website connected! Initial sync in progress...");
  };

  const handleRemoveWebsite = (id: string) => {
    setWebsites(websites.filter((w) => w.id !== id));
    toast.success("Website disconnected from admin panel");
  };

  const handleForceSync = (id: string) => {
    setWebsites(websites.map((w) => 
      w.id === id ? { ...w, status: "syncing" as const, lastSync: "Syncing..." } : w
    ));
    toast.success("Force sync initiated...");
    
    setTimeout(() => {
      setWebsites((prev) => prev.map((w) => 
        w.id === id ? { ...w, status: "online" as const, lastSync: "Just now" } : w
      ));
      toast.success("Sync completed successfully!");
    }, 2000);
  };

  return (
    <AdminLayout>
      <AdminHeader />
      
      <div className="p-6 space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Connected Websites</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Manage sync settings for all your church websites</p>
        </div>
        {/* Header Actions */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3 p-4 rounded-lg bg-info/10 border border-info/20">
            <Globe className="w-5 h-5 text-info" />
            <p className="text-sm text-foreground">
              <span className="font-medium">{websites.length} websites</span> connected to this admin panel. Changes sync automatically.
            </p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4" />
                Connect Website
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="font-display">Connect New Website</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div>
                  <Label htmlFor="name">Website Name</Label>
                  <Input
                    id="name"
                    value={newWebsite.name}
                    onChange={(e) => setNewWebsite({ ...newWebsite, name: e.target.value })}
                    placeholder="My Church Website"
                  />
                </div>
                <div>
                  <Label htmlFor="url">Website URL</Label>
                  <Input
                    id="url"
                    value={newWebsite.url}
                    onChange={(e) => setNewWebsite({ ...newWebsite, url: e.target.value })}
                    placeholder="mychurch.org"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  After connecting, you'll need to add the sync script to your website.
                </p>
                <Button onClick={handleAddWebsite} className="w-full">
                  Connect Website
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Websites Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {websites.map((website, index) => (
            <div
              key={website.id}
              className="bg-card rounded-xl border border-border overflow-hidden animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Header */}
              <div className="p-6 border-b border-border">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Globe className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-foreground">
                        {website.name}
                      </h3>
                      <a
                        href={`https://${website.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1"
                      >
                        {website.url}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {website.status === "online" ? (
                      <CheckCircle className="w-5 h-5 text-success" />
                    ) : website.status === "syncing" ? (
                      <RefreshCw className="w-5 h-5 text-warning animate-spin" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-destructive" />
                    )}
                    <Badge
                      className={
                        website.status === "online"
                          ? "bg-success text-success-foreground"
                          : website.status === "syncing"
                          ? "bg-warning text-warning-foreground"
                          : "bg-destructive text-destructive-foreground"
                      }
                    >
                      {website.status}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                  <span>Last sync: {website.lastSync}</span>
                  <span>•</span>
                  <span>{website.visitors.toLocaleString()} visitors this month</span>
                </div>
              </div>

              {/* Sync Settings */}
              <div className="p-6 space-y-4">
                <h4 className="text-sm font-medium text-foreground">Sync Settings</h4>
                
                <div className="space-y-3">
                  <SyncToggle
                    label="Events"
                    description="Sync events to this website"
                    checked={website.syncEvents}
                    onToggle={() => handleToggleSync(website.id, "syncEvents")}
                  />
                  <SyncToggle
                    label="Sermons"
                    description="Sync sermons to this website"
                    checked={website.syncSermons}
                    onToggle={() => handleToggleSync(website.id, "syncSermons")}
                  />
                  <SyncToggle
                    label="Announcements"
                    description="Sync announcements to this website"
                    checked={website.syncAnnouncements}
                    onToggle={() => handleToggleSync(website.id, "syncAnnouncements")}
                  />
                </div>

                <div className="flex gap-2 pt-4 border-t border-border">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleForceSync(website.id)}
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Force Sync
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Settings className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={() => handleRemoveWebsite(website.id)}
                  >
                    <Trash2 className="w-4 h-4" />
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

function SyncToggle({
  label,
  description,
  checked,
  onToggle,
}: {
  label: string;
  description: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onToggle} />
    </div>
  );
}
