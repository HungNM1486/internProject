import type { Book } from "@/types";

const slugify = (s: string): string => {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};

export function adaptApiBook(raw: any): Book {
  const price = raw.current_seller?.price || raw.price || 0;
  const original = raw.original_price || raw.list_price || price;
  const discount = original > price ? Math.round(((original - price) / original) * 100) : undefined;

  const images = Array.isArray(raw.images) ? raw.images : [];

  const category = raw.categories?.id && raw.categories?.name
    ? {
        id: raw.categories.id,
        name: raw.categories.name,
        is_leaf: raw.categories.is_leaf ?? true,
        slug: slugify(raw.categories.name)
      }
    : {
        id: 0,
        name: "Chưa rõ",
        is_leaf: true,
        slug: "chua-ro"
      };

  return {
    id: String(raw.product_id || raw.id || crypto.randomUUID()),
    name: raw.name || "Không rõ tên",
    short_description: raw.short_description || "",
    description: raw.description || raw.short_description || "",
    price,
    originalPrice: original,
    discount,
    stock: raw.stock ?? 0,
    rating: raw.rating_average || 0,
    reviewCount: raw.review_count || raw.quantity_sold?.value || 0,
    isbn: raw.isbn || "",
    publisher: raw.publisher || "",
    publishedDate: getAttr(raw, ["publication_date", "publishedDate"]),
    pageCount: parseInt(getAttr(raw, ["number_of_page", "pages"]) || "0") || undefined,
    language: raw.language || "Tiếng Việt",
    authors: Array.isArray(raw.authors) ? raw.authors : [],
    book_cover: raw.book_cover || null,
    categories: category,
    current_seller: raw.current_seller || {
      id: 0,
      sku: "",
      name: "",
      link: "",
      logo: "",
      price: 0,
      product_id: "",
      store_id: 0,
      is_best_store: false,
      is_offline_installment_supported: null
    },
    images,
    list_price: raw.list_price || price,
    original_price: raw.original_price || price,
    quantity_sold: raw.quantity_sold || { text: "0", value: 0 },
    rating_average: raw.rating_average || 0,
    specifications: raw.specifications || [],
    createdAt: raw.createdAt || new Date().toISOString(),
    updatedAt: raw.updatedAt || new Date().toISOString()
  };
}

// === Helpers ===
function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, "").trim();
}

function getAttr(raw: any, keys: string[]): string | undefined {
  const attrs: any[] = raw?.specifications?.[0]?.attributes ?? [];
  if (!Array.isArray(attrs)) return undefined;

  for (const key of keys) {
    const found = attrs.find((a) => {
      const n = (a?.name || a?.code || "").toString().trim().toLowerCase();
      return n === key.toLowerCase();
    });
    if (found?.value) return found.value;
  }
  return undefined;
}
