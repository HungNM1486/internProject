export function resolveImageUrl(u?: string | null): string {
  if (!u) return "";
  if (/^https?:\/\//i.test(u)) return u;
  if (u.startsWith("//")) return window.location.protocol + u;
  return u; 
}

export type RawImage = {
  base_url?: string;
  large_url?: string;
  medium_url?: string;
  small_url?: string;
  thumbnail_url?: string;
  is_gallery?: boolean;
  label?: string | null;
  position?: number | null;
};

/** Lấy URL từ 1 item ảnh (string | RawImage) */
export function extractUrl(img?: string | RawImage | null): string {
  if (!img) return "";
  if (typeof img === "string") return img;
  return (
    img.medium_url ||
    img.large_url ||
    img.base_url ||
    img.small_url ||
    img.thumbnail_url ||
    ""
  );
}
/** Ảnh bìa chính của sách (ưu tiên images[0], fallback book_cover) */
export function getPrimaryCover(book: any): string {
  if (!book) return "";
  const fromArray = Array.isArray(book.images) ? extractUrl(book.images[0]) : "";
  const fromCover = extractUrl(book.book_cover);
  return fromArray || fromCover || "";
}

/** Chuyển list ảnh về string[] để dùng cho gallery */
export function imagesToUrls(book: any): string[] {
  if (!book) return [];
  const urls = Array.isArray(book.images)
    ? (book.images.map(extractUrl).filter(Boolean) as string[])
    : [];
  if (urls.length) return urls;
  const fallback = extractUrl(book.book_cover);
  return fallback ? [fallback] : [];
}