import type { Book } from "@/types";

export function resolveImageUrl(u?: string | null): string {
  if (!u) return "";
  if (/^https?:\/\//i.test(u)) return u;
  if (u.startsWith("//")) return window.location.protocol + u;
  return u; 
}

export function pickImageUrl(img?: {
  thumbnail_url?: string;
  medium_url?: string;
  small_url?: string;
  large_url?: string;
  base_url?: string;
}): string {
  const raw =
    img?.thumbnail_url ||
    img?.medium_url ||
    img?.small_url ||
    img?.large_url ||
    img?.base_url ||
    "";
  return resolveImageUrl(raw);
}

/** Ảnh bìa chính cho BookCard */
export function getPrimaryCover(book: Book): string {
  // ưu tiên ảnh trong mảng images
  if (Array.isArray(book.images) && book.images.length > 0) {
    const u = pickImageUrl(book.images[0] as any);
    if (u) return u;
  }
  // fallback sang book_cover
  if (book.book_cover) {
    const u = resolveImageUrl(book.book_cover);
    if (u) return u;
  }
  // ảnh mặc định cuối cùng
  return "/vite.svg";
}

/** Danh sách ảnh cho gallery chi tiết */
export function getAllImageUrls(book: Book): string[] {
  const list: string[] = [];
  if (Array.isArray(book.images)) {
    for (const it of book.images as any[]) {
      const u = pickImageUrl(it);
      if (u) list.push(u);
    }
  }
  const cover = book.book_cover ? resolveImageUrl(book.book_cover) : "";
  if (cover) list.unshift(cover);
  return Array.from(new Set(list));
}
