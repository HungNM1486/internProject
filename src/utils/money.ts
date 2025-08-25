import { Book } from "@/types"

export const toNumber = (v: unknown): number => {
    if (typeof v === "number") return Number.isFinite(v) ? v : 0;
    if (typeof v === "string") {
        const n = Number(v);
        return Number.isFinite(n) ? n : 0;
    }
    return 0;
};

export const formatVND = (v: unknown) =>
    toNumber(v).toLocaleString("vi-VN", { style: "currency", currency: "VND" });

export const hasDiscount = (b: Book) => {
    const price = toNumber(b.price);
    const original = toNumber(b.originalPrice);
    const discount = typeof b.discount === "number" ? b.discount : undefined;

    return (typeof discount === "number" && discount > 0) || (original > price && original > 0);
};

export const calcSalePercent = (b: Book) => {
    const price = toNumber(b.price);
    const original = toNumber(b.originalPrice);
    if (typeof b.discount === "number") {
        return Math.max(0, Math.min(100, Math.round(b.discount)));
    }
    if (original > price && original > 0) {
        return Math.round(((original - price) / original) * 100);
    }
    return 0;
};
