export interface Media {
  id: string;
  file_name: string;
  url: string;
  mime_type: string;
  size: number;
  created_at: string;
}

export interface MediaListResponse {
  success: boolean;
  status: number;
  message: string;
  timestamp: string;
  data: Media[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface MediaQueryParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  keyword?: string;
}

// ── UI-friendly asset type ──────────────────────────────────────

export type AssetType = 'image' | 'video' | 'document' | 'audio';

export interface Asset {
  id: string;
  fileName: string;
  type: AssetType;
  mimeType: string;
  size: string;
  sizeBytes: number;
  dimensions?: string;
  uploadedAt: string;
  publicUrl: string;
  thumbnailUrl: string;
}

export type AssetThumbnailMap = Record<AssetType, string>;

// ── Mappers / utilities ─────────────────────────────────────────

export function deriveAssetType(mimeType: string): AssetType {
  if (mimeType.startsWith('image/')) return 'image';
  if (mimeType.startsWith('video/')) return 'video';
  if (mimeType.startsWith('audio/')) return 'audio';
  return 'document';
}

export function mapMediaToAsset(media: Media, thumbnails: AssetThumbnailMap): Asset {
  const type = deriveAssetType(media.mime_type);
  return {
    id: media.id,
    fileName: media.file_name,
    type,
    mimeType: media.mime_type,
    size: formatAssetSize(media.size),
    sizeBytes: media.size,
    uploadedAt: media.created_at,
    publicUrl: media.url,
    thumbnailUrl: type === 'image' ? media.url : thumbnails[type],
  };
}

function formatAssetSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
}
