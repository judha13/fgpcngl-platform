# Gallery API Quick Reference

## Base URL
```
http://localhost:3001/gallery
```

## Authentication
All endpoints require JWT Bearer token in header:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## Folder Endpoints

### Create Folder
```http
POST /gallery/folders
Content-Type: application/json

{
  "name": "New Year 2026",
  "description": "New Year celebration photos"
}
```

### List All Folders
```http
GET /gallery/folders?page=1&limit=20
```

### Get Folder Details
```http
GET /gallery/folders/:id?page=1&limit=50
```

### Update Folder
```http
PATCH /gallery/folders/:id
Content-Type: application/json

{
  "name": "Updated Name",
  "description": "Updated description"
}
```

### Delete Folder (Cascade)
```http
DELETE /gallery/folders/:id
```

---

## Image Endpoints

### Upload Images
```http
POST /gallery/folders/:folderId/images
Content-Type: multipart/form-data

Form data:
- files: (file1.jpg)
- files: (file2.jpg)
- files: (file3.jpg)
```

### List Folder Images
```http
GET /gallery/folders/:folderId/images?page=1&limit=50
```

### Delete Image
```http
DELETE /gallery/images/:id
```

---

## Response Examples

### Folder Response
```json
{
  "id": 1,
  "name": "New Year 2026",
  "slug": "new-year-2026",
  "description": "New Year celebration photos",
  "coverImageUrl": "/uploads/gallery/new-year-2026/1234567890-image.jpg",
  "imageCount": 15,
  "createdAt": "2026-01-20T08:39:55.000Z",
  "updatedAt": "2026-01-20T08:40:12.000Z"
}
```

### Image Response
```json
{
  "id": 1,
  "folderId": 1,
  "filename": "celebration.jpg",
  "url": "/uploads/gallery/new-year-2026/1234567890-celebration.jpg",
  "size": 2048576,
  "mimeType": "image/jpeg",
  "width": 1920,
  "height": 1080,
  "uploadedAt": "2026-01-20T08:40:12.000Z"
}
```

### Paginated List Response
```json
{
  "data": [...],
  "meta": {
    "total": 150,
    "page": 1,
    "limit": 20,
    "totalPages": 8
  }
}
```

---

## Environment Variables

```env
# Required
STORAGE_TYPE=local              # or 's3'
UPLOAD_PATH=./uploads/gallery
MAX_FILE_SIZE=5242880          # 5MB
ALLOWED_MIME_TYPES=image/jpeg,image/png,image/webp,image/gif

# S3 Only (if STORAGE_TYPE=s3)
AWS_S3_BUCKET=your-bucket-name
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
```

---

## File Constraints

- **Max files per upload**: 20
- **Max file size**: 5MB
- **Allowed types**: JPEG, PNG, GIF, WebP
- **Extensions**: .jpg, .jpeg, .png, .gif, .webp

---

## Features

✅ Folder-based organization  
✅ Auto-generated URL-friendly slugs  
✅ Cascade delete (folder → images)  
✅ Pagination support  
✅ Image metadata extraction (dimensions)  
✅ Local & S3 storage support  
✅ File validation  
✅ JWT authentication  
✅ Swagger documentation  
✅ Error handling with rollback
