export type DocumentKind =
  | "pdf"
  | "excel"
  | "word"
  | "powerpoint"
  | "image"
  | "video"
  | "invoice"
  | "attachment";

export interface DocumentRecord {
  id: string;
  kind: DocumentKind;
  title: string;
  storageKey: string;
  bucket: string;
  mimeType: string;
  size: number;
  createdBy?: string;
  orgId?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}