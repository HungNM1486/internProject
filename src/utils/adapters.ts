import type { Book, Category } from "@/types";
import { toNumber } from "@/utils/money";

const API_BASE = import.meta.env.VITE_API_URL ?? "";

function resolveImageUrl(u?: string | null): string | null {
  if (!u) return null;
  if (/^https?:\/\//i.test(u)) return u;
  if (u.startsWith("//")) return window.location.protocol + u;
  if (u.startsWith("/")) return API_BASE.replace(/\/$/, "") + u;
  return u;
}

function stripHtml(html?: string): string {
  if (!html) return "";
  return html.replace(/<[^>]+>/g, "").trim();
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function adaptApiBook(b: any): Book {
  // ===== TITLE / AUTHOR =====
  const title = b.title ?? b.name ?? "Chưa có tên";
  const author =
    (Array.isArray(b.authors) && b.authors[0]?.name) || b.author || "Không rõ";

  // ===== PRICE =====
  let price = toNumber(b.price);
  let original = toNumber(b.original_price ?? b.list_price);
  if (price === 0 && original > 0) price = original; // tránh -100%

  const discount =
    original > price && original > 0
      ? Math.round(((original - price) / original) * 100)
      : undefined;

  // ===== IMAGES =====
  let images: string[] = [];
  if (Array.isArray(b.images) && b.images.length) {
    images = b.images
      .map(
        (it: any) =>
          resolveImageUrl(it.medium_url || it.large_url || it.base_url) as string
      )
      .filter(Boolean);
  } else if (b.book_cover) {
    const u = resolveImageUrl(b.book_cover);
    if (u) images = [u];
  }

  // ===== CATEGORY  =====
  let category: Category | undefined = undefined;
  if (b.categories?.id && b.categories?.name) {
    const name = String(b.categories.name);
    category = {
      id: String(b.categories.id),
      name,
      slug: slugify(name),            
      description: undefined,
      parentId: undefined,
      createdAt: new Date().toISOString(),
    };
  }

  return {
    id: String(b.id ?? b.product_id ?? b._id ?? Math.random().toString(36).slice(2)),
    title,
    author,
    description: stripHtml(b.description ?? b.short_description),
    price,
    originalPrice: original || undefined,
    discount,
    categoryId: String(b.categories?.id ?? b.category_id ?? ""),
    category,                          
    images,
    stock: toNumber(b.stock ?? b.quantity ?? 0), 
    rating: toNumber(b.rating_average ?? 0),
    reviewCount: toNumber(b.review_count ?? 0),
    isbn: b.isbn ?? undefined,
    publisher: b.publisher ?? undefined,
    publishedDate: b.published_at ?? undefined,
    pageCount: toNumber(b.pages ?? 0) || undefined,
    language: b.language ?? undefined,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}
