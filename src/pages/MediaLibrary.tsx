import { useState, useEffect, useCallback } from "react";
import { 
  Folder, 
  Plus, 
  Search, 
  Grid2x2, 
  List, 
  MoreVertical, 
  Upload, 
  Image as ImageIcon, 
  ChevronRight,
  FolderPlus,
  Trash2,
  Download,
  ExternalLink,
  Loader2,
  X,
  ChevronLeft
} from "lucide-react";
import { AdminLayout } from "@/layouts/AdminLayout";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { galleryApi, GalleryFolder, GalleryImage } from "@/services/galleryApi";
import { cn } from "@/lib/utils";
import { BASE_URL } from "@/lib/api";

type ViewMode = "grid" | "list";

export default function MediaLibrary() {
  const [folders, setFolders] = useState<GalleryFolder[]>([]);
  const [currentFolder, setCurrentFolder] = useState<GalleryFolder | null>(null);
  const [folderPath, setFolderPath] = useState<GalleryFolder[]>([]);
  const [images, setImages] = useState<GalleryImage[]>([]);
  
  const [loadingFolders, setLoadingFolders] = useState(true);
  const [loadingImages, setLoadingImages] = useState(false);
  
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Dialog states
  const [isFolderDialogOpen, setIsFolderDialogOpen] = useState(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [folderToDelete, setFolderToDelete] = useState<number | null>(null);
  const [isImageDeleteDialogOpen, setIsImageDeleteDialogOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState<number | null>(null);
  const [newFolder, setNewFolder] = useState({ name: "", description: "" });
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const loadData = useCallback(async (folder: GalleryFolder | null) => {
    setLoadingFolders(true);
    setCurrentFolder(folder);
    
    // Update path
    if (!folder) {
      setFolderPath([]);
    } else {
      setFolderPath(prevPath => {
        const index = prevPath.findIndex(f => f.id === folder.id);
        if (index !== -1) {
          return prevPath.slice(0, index + 1);
        } else {
          return [...prevPath, folder];
        }
      });
    }

    try {
      // Load subfolders
      const folderId = folder?.id;
      const foldersResponse = await galleryApi.getFolders(1, 100, folderId);
      setFolders(foldersResponse.data);

      // Load images if not at root
      if (folderId) {
        setLoadingImages(true);
        const imagesResponse = await galleryApi.getImagesByFolder(folderId);
        setImages(imagesResponse.data);
      } else {
        setImages([]);
      }
    } catch (error) {
      toast.error("Failed to load library content");
    } finally {
      setLoadingFolders(false);
      setLoadingImages(false);
    }
  }, []);

  // Load initial root folders
  useEffect(() => {
    loadData(null);
  }, [loadData]);

  const handleCreateFolder = async () => {
    if (!newFolder.name) {
      toast.error("Folder name is required");
      return;
    }

    try {
      await galleryApi.createFolder(
        newFolder.name,
        newFolder.description,
        currentFolder?.id
      );
      toast.success("Folder created successfully");
      setIsFolderDialogOpen(false);
      setNewFolder({ name: "", description: "" });
      loadData(currentFolder);
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      toast.error(axiosError.response?.data?.message || "Failed to create folder");
    }
  };

  const handleDeleteFolder = (id: number) => {
    setFolderToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteFolder = async () => {
    if (!folderToDelete) return;
    
    try {
      await galleryApi.deleteFolder(folderToDelete);
      toast.success("Folder deleted");
      loadData(currentFolder);
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      toast.error(axiosError.response?.data?.message || "Failed to delete folder");
    } finally {
      setIsDeleteDialogOpen(false);
      setFolderToDelete(null);
    }
  };

  const handleDeleteImage = (id: number) => {
    setImageToDelete(id);
    setIsImageDeleteDialogOpen(true);
  };

  const confirmDeleteImage = async () => {
    if (!imageToDelete) return;
    
    try {
      await galleryApi.deleteImage(imageToDelete);
      toast.success("Image deleted");
      loadData(currentFolder);
    } catch (error) {
      toast.error("Failed to delete image");
    } finally {
      setIsImageDeleteDialogOpen(false);
      setImageToDelete(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const handleUploadImages = async () => {
    if (!currentFolder || selectedFiles.length === 0) return;

    setUploading(true);
    try {
      await galleryApi.uploadImages(currentFolder.id, selectedFiles);
      toast.success(`Successfully uploaded ${selectedFiles.length} images`);
      setIsUploadDialogOpen(false);
      setSelectedFiles([]);
      loadData(currentFolder);
    } catch (error) {
      toast.error("Failed to upload images");
    } finally {
      setUploading(false);
    }
  };


  const navigateBack = () => {
    if (folderPath.length <= 1) {
      loadData(null);
    } else {
      loadData(folderPath[folderPath.length - 2]);
    }
  };

  const filteredFolders = folders.filter(f => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredImages = images.filter(img => 
    img.filename.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isLoading = loadingFolders || loadingImages;

  return (
    <AdminLayout>
      <AdminHeader />
      <div className="p-6 space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-foreground flex items-center gap-2">
              <ImageIcon className="w-6 h-6 text-primary" />
              Media Gallery
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Organize and manage your gallery assets by groups
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="pl-9 w-[200px] md:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex border rounded-md overflow-hidden bg-muted/50 p-1">
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="sm"
                className="h-8 px-2"
                onClick={() => setViewMode("grid")}
              >
                <Grid2x2 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="sm"
                className="h-8 px-2"
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Breadcrumbs Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <Button 
            variant="ghost" 
            size="icon"
            className={cn("h-8 w-8", !currentFolder && "bg-muted")}
            onClick={() => loadData(null)}
          >
            <ImageIcon className="w-4 h-4" />
          </Button>
          
          {folderPath.map((folder, index) => (
            <div key={folder.id} className="flex items-center gap-2 flex-shrink-0">
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <Button 
                variant="ghost" 
                size="sm"
                className={cn("h-8 px-2", currentFolder?.id === folder.id && "bg-muted")}
                onClick={() => loadData(folder)}
              >
                {folder.name}
              </Button>
            </div>
          ))}
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between bg-card p-4 rounded-xl border border-border shadow-sm">
          <div className="flex items-center gap-4">
            {currentFolder && (
              <Button variant="ghost" size="sm" onClick={navigateBack} className="gap-1 h-8">
                <ChevronLeft className="w-4 h-4" />
                Back
              </Button>
            )}
            <div className="text-sm font-medium text-muted-foreground">
              {folders.length > 0 && `${folders.length} Groups`}
              {folders.length > 0 && images.length > 0 && " • "}
              {images.length > 0 && `${images.length} Images`}
              {folders.length === 0 && images.length === 0 && "Empty location"}
            </div>
          </div>
          
          <div className="flex gap-2">
            <Dialog open={isFolderDialogOpen} onOpenChange={setIsFolderDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
                  <FolderPlus className="w-4 h-4" />
                  <span className="hidden sm:inline">New Folder</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Folder</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Folder Name</Label>
                    <Input
                      id="name"
                      value={newFolder.name}
                      onChange={(e) => setNewFolder({ ...newFolder, name: e.target.value })}
                      placeholder="e.g. 2026 Events"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="desc">Description (Optional)</Label>
                    <Textarea
                      id="desc"
                      value={newFolder.description}
                      onChange={(e) => setNewFolder({ ...newFolder, description: e.target.value })}
                      placeholder="What is this folder for?"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsFolderDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleCreateFolder} className="bg-primary hover:bg-primary/90 text-primary-foreground">Create Folder</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {currentFolder && (
              <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Upload className="w-4 h-4" />
                    <span className="hidden sm:inline">Upload Photos</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Upload to {currentFolder.name}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center bg-muted/30">
                      <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
                      <p className="text-sm text-muted-foreground mb-4">
                        Select images to upload to this folder
                      </p>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        id="file-upload"
                        onChange={handleFileChange}
                      />
                      <Button
                        variant="outline"
                        onClick={() => document.getElementById("file-upload")?.click()}
                      >
                        Choose Files
                      </Button>
                      {selectedFiles.length > 0 && (
                        <p className="mt-4 text-sm font-medium text-primary">
                          {selectedFiles.length} files selected
                        </p>
                      )}
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleUploadImages} disabled={selectedFiles.length === 0 || uploading} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      {uploading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Uploading...</> : "Start Upload"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>

        {/* content Area */}
        {isLoading && folders.length === 0 && images.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading library content...</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* FOLDERS SECTION */}
            {filteredFolders.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Media Gallery</h2>
                <div className={cn(
                  "grid gap-6",
                  viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
                )}>
                  {filteredFolders.map((folder) => (
                    <div
                      key={folder.id}
                      className={cn(
                        "group relative bg-card rounded-xl border border-border overflow-hidden transition-all duration-300 card-hover",
                        viewMode === "list" && "flex items-center p-2"
                      )}
                    >
                      <div 
                        className={cn(
                          "bg-primary/5 flex items-center justify-center cursor-pointer",
                          viewMode === "grid" ? "aspect-square w-full" : "w-16 h-16 rounded-lg flex-shrink-0"
                        )}
                        onClick={() => loadData(folder)}
                      >
                        <Folder className="w-1/3 h-1/3 text-primary/40 group-hover:scale-110 transition-transform" />
                      </div>
                      
                      <div className={cn("p-4", viewMode === "list" && "flex-1 ml-2 py-0")}>
                        <div className="flex items-start justify-between">
                          <div onClick={() => loadData(folder)} className="cursor-pointer">
                            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                              {folder.name}
                            </h3>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {(() => {
                                const foldersCount = folder._count?.children ?? 0;
                                const imgsCount = folder.imageCount ?? 0;
                                if (foldersCount > 0) return `${foldersCount} folder${foldersCount > 1 ? 's' : ''}`;
                                return `${imgsCount} image${imgsCount !== 1 ? 's' : ''}`;
                              })()} • Created {new Date(folder.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => loadData(folder)}>
                                Open
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="text-destructive focus:text-destructive"
                                onClick={() => handleDeleteFolder(folder.id)}
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete Group
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* IMAGES SECTION */}
            {filteredImages.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-border">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Images</h2>
                <div className={cn(
                  "grid gap-4",
                  viewMode === "grid" ? "grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6" : "grid-cols-1"
                )}>
                  {filteredImages.map((image) => (
                    <div
                      key={image.id}
                      className={cn(
                        "group relative bg-card rounded-lg border border-border overflow-hidden card-hover",
                        viewMode === "list" && "flex items-center p-2"
                      )}
                    >
                      <div className={cn(
                        "relative aspect-square bg-muted flex items-center justify-center overflow-hidden",
                        viewMode === "list" && "w-12 h-12 rounded flex-shrink-0"
                      )}>
                        <img 
                          src={`${BASE_URL}${image.url}`} 
                          alt={image.filename}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        {viewMode === "grid" && (
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                             <Button 
                              variant="secondary" 
                              size="icon" 
                              className="h-8 w-8 rounded-full"
                              onClick={() => window.open(`${BASE_URL}${image.url}`, '_blank')}
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="icon" 
                              className="h-8 w-8 rounded-full"
                              onClick={() => handleDeleteImage(image.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                      
                      {viewMode === "list" ? (
                        <div className="flex-1 ml-4 flex items-center justify-between">
                          <div>
                            <p className="font-medium text-sm truncate max-w-[200px]">{image.filename}</p>
                            <p className="text-[10px] text-muted-foreground">
                              {(image.size / 1024 / 1024).toFixed(2)} MB • {image.width}x{image.height} • {new Date(image.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                              <a href={`${BASE_URL}${image.url}`} download target="_blank" rel="noreferrer">
                                <Download className="w-4 h-4" />
                              </a>
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDeleteImage(image.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="p-2">
                          <p className="text-[10px] font-medium truncate text-center">{image.filename}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* EMPTY STATE */}
            {filteredFolders.length === 0 && filteredImages.length === 0 && !isLoading && (
              <div className="py-20 text-center space-y-4">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto">
                  <Folder className="w-10 h-10 text-muted-foreground" />
                </div>
                <div className="max-w-xs mx-auto">
                  <h4 className="font-semibold">No assets found</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    This location is empty. Start by creating a folder or uploading images.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Folder?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the folder
              and all images inside it.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteFolder} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete Folder
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={isImageDeleteDialogOpen} onOpenChange={setIsImageDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Image?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this image? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteImage} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete Image
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}
