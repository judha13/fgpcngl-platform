import { useState } from "react";
import { Plus, Play, Download, BookOpen, Upload, X } from "lucide-react";
import { AdminLayout } from "@/layouts/AdminLayout";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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

interface Sermon {
  id: string;
  title: string;
  speaker: string;
  date: string;
  series: string;
  duration: string;
  views: number;
  status: "published" | "draft";
  youtubeLink?: string;
  thumbnailUrl?: string;
}

const initialSermons: Sermon[] = [
  { 
    id: "1", 
    title: "Finding Peace in Chaos", 
    speaker: "Pastor James Wilson", 
    date: "Dec 22, 2024", 
    series: "Advent Series", 
    duration: "42:30", 
    views: 324, 
    status: "published",
    youtubeLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnailUrl: "https://images.pexels.com/photos/8468/candles-dark-church-religion.jpg?auto=compress&cs=tinysrgb&w=400"
  },
  { 
    id: "2", 
    title: "The Gift of Hope", 
    speaker: "Pastor James Wilson", 
    date: "Dec 15, 2024", 
    series: "Advent Series", 
    duration: "38:15", 
    views: 456, 
    status: "published",
    youtubeLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnailUrl: "https://images.pexels.com/photos/208359/pexels-photo-208359.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  { 
    id: "3", 
    title: "Walking in Faith", 
    speaker: "Pastor Sarah Miller", 
    date: "Dec 8, 2024", 
    series: "Faith Journey", 
    duration: "35:45", 
    views: 289, 
    status: "published",
    youtubeLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnailUrl: "https://images.pexels.com/photos/236339/pexels-photo-236339.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  { 
    id: "4", 
    title: "New Year, New Beginnings", 
    speaker: "Pastor James Wilson", 
    date: "Dec 29, 2024", 
    series: "Special Messages", 
    duration: "40:00", 
    views: 0, 
    status: "draft"
  },
];

export default function Sermons() {
  const [sermons, setSermons] = useState<Sermon[]>(initialSermons);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSermon, setEditingSermon] = useState<Sermon | null>(null);
  const [newSermon, setNewSermon] = useState({ 
    title: "", 
    speaker: "", 
    series: "", 
    description: "",
    youtubeLink: ""
  });
  const [selectedThumbnailFile, setSelectedThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

  const handleThumbnailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedThumbnailFile(file);
      const previewUrl = URL.createObjectURL(file);
      setThumbnailPreview(previewUrl);
    }
  };

  const removeThumbnail = () => {
    setSelectedThumbnailFile(null);
    if (thumbnailPreview) {
      URL.revokeObjectURL(thumbnailPreview);
      setThumbnailPreview(null);
    }
  };

  const handleAddSermon = () => {
    if (!newSermon.title || !newSermon.speaker) {
      toast.error("Please fill in required fields");
      return;
    }

    if (editingSermon) {
      // Update existing sermon
      const updatedSermon: Sermon = {
        ...editingSermon,
        title: newSermon.title,
        speaker: newSermon.speaker,
        series: newSermon.series || "Uncategorized",
        youtubeLink: newSermon.youtubeLink || undefined,
        thumbnailUrl: thumbnailPreview || editingSermon.thumbnailUrl,
      };

      setSermons(sermons.map(s => s.id === editingSermon.id ? updatedSermon : s));
      toast.success("Sermon updated successfully!");
    } else {
      // Create new sermon
      const sermon: Sermon = {
        id: String(sermons.length + 1),
        title: newSermon.title,
        speaker: newSermon.speaker,
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        series: newSermon.series || "Uncategorized",
        duration: "00:00",
        views: 0,
        status: "draft",
        youtubeLink: newSermon.youtubeLink || undefined,
        thumbnailUrl: thumbnailPreview || undefined,
      };

      setSermons([sermon, ...sermons]);
      toast.success("Sermon created as draft. Upload media to publish.");
    }

    setNewSermon({ title: "", speaker: "", series: "", description: "", youtubeLink: "" });
    setEditingSermon(null);
    setSelectedThumbnailFile(null);
    setThumbnailPreview(null);
    setIsDialogOpen(false);
  };

  const handleEditSermon = (sermon: Sermon) => {
    setEditingSermon(sermon);
    setNewSermon({
      title: sermon.title,
      speaker: sermon.speaker,
      series: sermon.series,
      description: "",
      youtubeLink: sermon.youtubeLink || "",
    });
    setThumbnailPreview(sermon.thumbnailUrl || null);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingSermon(null);
    setNewSermon({ title: "", speaker: "", series: "", description: "", youtubeLink: "" });
    setSelectedThumbnailFile(null);
    if (thumbnailPreview && !editingSermon?.thumbnailUrl) {
      URL.revokeObjectURL(thumbnailPreview);
    }
    setThumbnailPreview(null);
  };

  const handleDelete = (sermon: Sermon) => {
    setSermons(sermons.filter((s) => s.id !== sermon.id));
    toast.success("Sermon deleted from all connected websites.");
  };

  const handlePublish = (sermon: Sermon) => {
    setSermons(sermons.map((s) => 
      s.id === sermon.id ? { ...s, status: "published" as const } : s
    ));
    toast.success("Sermon published to all connected websites!");
  };

  return (
    <AdminLayout>
      <AdminHeader />
      
      <div className="p-6 space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Sermons</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Manage and publish sermons across all websites</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4" />
                Add Sermon
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md" onInteractOutside={handleCloseDialog}>
              <DialogHeader>
                <DialogTitle className="font-display">
                  {editingSermon ? "Edit Sermon" : "Upload New Sermon"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div>
                  <Label htmlFor="title">Sermon Title *</Label>
                  <Input
                    id="title"
                    value={newSermon.title}
                    onChange={(e) => setNewSermon({ ...newSermon, title: e.target.value })}
                    placeholder="The Power of Prayer"
                  />
                </div>
                <div>
                  <Label htmlFor="speaker">Speaker *</Label>
                  <Select onValueChange={(value) => setNewSermon({ ...newSermon, speaker: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select speaker" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pastor James Wilson">Pastor James Wilson</SelectItem>
                      <SelectItem value="Pastor Sarah Miller">Pastor Sarah Miller</SelectItem>
                      <SelectItem value="Guest Speaker">Guest Speaker</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="series">Series</Label>
                  <Input
                    id="series"
                    value={newSermon.series}
                    onChange={(e) => setNewSermon({ ...newSermon, series: e.target.value })}
                    placeholder="Series name"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newSermon.description}
                    onChange={(e) => setNewSermon({ ...newSermon, description: e.target.value })}
                    placeholder="Sermon summary..."
                  />
                </div>
                <div>
                  <Label htmlFor="youtubeLink">YouTube Link</Label>
                  <Input
                    id="youtubeLink"
                    value={newSermon.youtubeLink}
                    onChange={(e) => setNewSermon({ ...newSermon, youtubeLink: e.target.value })}
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                </div>
                <div>
                  <Label htmlFor="thumbnail">Sermon Thumbnail</Label>
                  {!thumbnailPreview ? (
                    <div className="p-4 border-2 border-dashed border-border rounded-lg text-center">
                      <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Upload sermon thumbnail image
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleThumbnailChange}
                        className="hidden"
                        id="thumbnail-upload"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => document.getElementById('thumbnail-upload')?.click()}
                      >
                        Choose Image
                      </Button>
                    </div>
                  ) : (
                    <div className="relative">
                      <img
                        src={thumbnailPreview}
                        alt="Thumbnail preview"
                        className="w-full h-32 object-cover rounded-lg border"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-6 w-6"
                        onClick={removeThumbnail}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleAddSermon} className="flex-1">
                    {editingSermon ? "Update Sermon" : "Create Sermon"}
                  </Button>
                  <Button variant="outline" onClick={handleCloseDialog}>
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Sermons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sermons.map((sermon, index) => (
            <div
              key={sermon.id}
              className="bg-card rounded-xl border border-border overflow-hidden card-hover animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Thumbnail */}
              <div 
                className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center relative group bg-cover bg-center"
                style={{
                  backgroundImage: sermon.thumbnailUrl ? `url(${sermon.thumbnailUrl})` : undefined
                }}
              >
                {sermon.thumbnailUrl && (
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                )}
                <div className="relative z-10">
                  {sermon.youtubeLink ? (
                    <a
                      href={sermon.youtubeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center cursor-pointer transition-transform group-hover:scale-110"
                    >
                      <Play className="w-6 h-6 text-primary-foreground ml-1" />
                    </a>
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center cursor-pointer transition-transform group-hover:scale-110">
                      <Play className="w-6 h-6 text-primary-foreground ml-1" />
                    </div>
                  )}
                </div>
                <Badge 
                  className={`absolute top-3 right-3 ${sermon.status === "draft" ? "bg-warning text-warning-foreground" : "bg-success text-success-foreground"}`}
                >
                  {sermon.status}
                </Badge>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-display font-semibold text-foreground mb-1 line-clamp-1">
                  {sermon.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">{sermon.speaker}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                  <span>{sermon.date}</span>
                  <span>•</span>
                  <span>{sermon.duration}</span>
                  <span>•</span>
                  <span>{sermon.views} views</span>
                </div>
                <Badge variant="outline" className="mb-4">{sermon.series}</Badge>
                <div className="flex gap-2">
                  {sermon.status === "draft" ? (
                    <Button size="sm" className="flex-1" onClick={() => handlePublish(sermon)}>
                      Publish
                    </Button>
                  ) : (
                    <Button size="sm" variant="outline" className="flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  )}
                  <Button size="sm" variant="outline" onClick={() => handleEditSermon(sermon)}>
                    Edit
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => handleDelete(sermon)}>
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
