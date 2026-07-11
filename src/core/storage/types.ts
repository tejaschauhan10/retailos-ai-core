export type StorageProviderId =
  | "supabase"
  | "s3"
  | "r2"
  | "gcs"
  | "azure_blob";

export interface StoredObject {
  key: string;
  url: string;
  size: number;
  contentType?: string;
  checksum?: string;
  metadata?: Record<string, string>;
}

export interface UploadOptions {
  bucket: string;
  key: string;
  contentType?: string;
  metadata?: Record<string, string>;
  upsert?: boolean;
  signal?: AbortSignal;
}

export interface StorageProvider {
  id: StorageProviderId;
  upload(file: Blob | ArrayBuffer, options: UploadOptions): Promise<StoredObject>;
  download(bucket: string, key: string): Promise<Blob>;
  remove(bucket: string, key: string): Promise<void>;
  createSignedUrl(bucket: string, key: string, expiresIn: number): Promise<string>;
}