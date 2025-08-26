import type { Book } from '@/types';

const slugify = (s: string): string => {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
};

export function adaptApiBook(raw: any): Book {
  // Xử lý giá - API có thể trả về string
  const parsePrice = (price: any): number => {
    if (typeof price === 'string') {
      return parseFloat(price) || 0;
    }
    return price || 0;
  };

  const listPrice = parsePrice(raw.list_price);
  const originalPrice = parsePrice(raw.original_price);
  const currentPrice = parsePrice(raw.current_seller?.price || raw.price);

  const price = currentPrice || listPrice;
  const original = originalPrice || listPrice || price;
  const discount = original > price ? Math.round(((original - price) / original) * 100) : undefined;

  const images = Array.isArray(raw.images) ? raw.images : [];

  // Xử lý authors - API có thể trả về array rỗng
  const authors =
    Array.isArray(raw.authors) && raw.authors.length > 0
      ? raw.authors.map((author: any) => ({
          id: author.id || 0,
          name: author.name || 'Chưa rõ tác giả',
          slug: author.slug || slugify(author.name || 'chua-ro-tac-gia'),
        }))
      : [
          {
            id: 0,
            name: 'Chưa rõ tác giả',
            slug: 'chua-ro-tac-gia',
          },
        ];

  // Xử lý categories - API có thể trả về array rỗng
  const categories =
    Array.isArray(raw.categories) && raw.categories.length > 0
      ? raw.categories.map((cat: any) => ({
          id: cat.id || 0,
          name: cat.name || 'Chưa rõ danh mục',
          is_leaf: cat.is_leaf ?? true,
          slug: cat.slug || slugify(cat.name || 'chua-ro-danh-muc'),
        }))
      : [
          {
            id: 0,
            name: 'Chưa rõ danh mục',
            is_leaf: true,
            slug: 'chua-ro-danh-muc',
          },
        ];

  // Xử lý current_seller - API có thể trả về null
  const currentSeller = raw.current_seller || {
    id: 0,
    sku: '',
    name: 'Chưa có người bán',
    link: '',
    logo: '',
    price: listPrice || 0,
    product_id: raw.id || '',
    store_id: 0,
    is_best_store: false,
    is_offline_installment_supported: null,
  };

  // Xử lý quantity_sold - API có thể trả về object hoặc null
  const quantitySold = raw.quantity_sold || {
    text: 'Chưa có thông tin bán hàng',
    value: 0,
  };

  return {
    id: String(raw.id || raw.product_id || crypto.randomUUID()),
    title: raw.title || raw.name || 'Không rõ tên',
    name: raw.title || raw.name || 'Không rõ tên',
    short_description: raw.short_description || 'Chưa có mô tả ngắn',
    description: stripHtml(raw.description || raw.short_description || 'Chưa có mô tả'),
    price,
    originalPrice: original,
    discount,
    stock: raw.stock_quantity || raw.stock || 0,
    rating: raw.rating_average || 0,
    reviewCount: raw.review_count || quantitySold?.value || 0,
    isbn: raw.isbn || '',
    publisher: raw.publisher || '',
    publishedDate: getAttr(raw, ['publication_date', 'publishedDate']),
    pageCount: parseInt(getAttr(raw, ['number_of_page', 'pages']) || '0') || undefined,
    language: raw.language || 'Tiếng Việt',
    authors,
    book_cover: raw.book_cover || null,
    categories,
    current_seller: currentSeller,
    images,
    list_price: listPrice,
    original_price: originalPrice,
    quantity_sold: quantitySold,
    rating_average: raw.rating_average || 0,
    specifications: raw.specifications || [],
    createdAt: raw.createdAt || new Date().toISOString(),
    updatedAt: raw.updatedAt || new Date().toISOString(),
  };
}

// === Helpers ===
function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, '').trim();
}

function getAttr(raw: any, keys: string[]): string | undefined {
  const attrs: any[] = raw?.specifications?.[0]?.attributes ?? [];
  if (!Array.isArray(attrs)) return undefined;

  for (const key of keys) {
    const found = attrs.find((a) => {
      const n = (a?.name || a?.code || '').toString().trim().toLowerCase();
      return n === key.toLowerCase();
    });
    if (found?.value) return found.value;
  }
  return undefined;
}
