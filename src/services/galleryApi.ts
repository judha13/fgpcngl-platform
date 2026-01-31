import api from '../lib/api';

export interface GalleryFolder {
  id: number;
  name: string;
  slug: string;
  description?: string;
  parentId?: number | null;
  imageCount: number;
  coverImageUrl?: string | null;
  createdAt: string;
  updatedAt: string;
  _count?: {
    images: number;
    children: number;
  };
}

export interface GalleryImage {
  id: number;
  folderId: number;
  filename: string;
  url: string;
  size: number;
  mimeType: string;
  width?: number | null;
  height?: number | null;
  createdAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const galleryApi = {
  // Folders
  getFolders: async (page = 1, limit = 20, parentId?: number) => {
    const response = await api.get<PaginatedResponse<GalleryFolder>>(`/gallery/folders`, {
      params: { page, limit, parentId },
    });
    return response.data;
  },

  getFolderById: async (id: number, page = 1, limit = 50) => {
    const response = await api.get<GalleryFolder & { images: PaginatedResponse<GalleryImage> }>(
      `/gallery/folders/${id}`,
      { params: { page, limit } }
    );
    return response.data;
  },

  createFolder: async (name: string, description?: string, parentId?: number) => {
    const response = await api.post<GalleryFolder>(`/gallery/folders`, { name, description, parentId });
    return response.data;
  },

  updateFolder: async (id: number, data: { name?: string; description?: string }) => {
    const response = await api.patch<GalleryFolder>(`/gallery/folders/${id}`, data);
    return response.data;
  },

  deleteFolder: async (id: number) => {
    const response = await api.delete(`/gallery/folders/${id}`);
    return response.data;
  },

  // Images
  uploadImages: async (folderId: number, files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });

    const response = await api.post(`/gallery/folders/${folderId}/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  getImagesByFolder: async (folderId: number, page = 1, limit = 50) => {
    const response = await api.get<PaginatedResponse<GalleryImage>>(`/gallery/folders/${folderId}/images`, {
      params: { page, limit },
    });
    return response.data;
  },

  deleteImage: async (id: number) => {
    const response = await api.delete(`/gallery/images/${id}`);
    return response.data;
  },
};
