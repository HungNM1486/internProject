import { useState } from "react";
import type { Book } from "@/types";

export function DescriptionBlock({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  const tooLong = (text?.length || 0) > 650;

  return (
    <div className="relative px-4 pb-3">
      <div className={`text-[14px] leading-6 text-gray-700 ${!open && tooLong ? "max-h-40 overflow-hidden" : ""}`}>
        {text || "Chưa có mô tả."}
      </div>
      {!open && tooLong && (
        <div className="pointer-events-none absolute inset-x-0 bottom-9 h-16 bg-gradient-to-t from-white to-transparent" />
      )}
      {tooLong && (
        <div className="mt-2 text-center">
          <button
            className="rounded-md px-3 py-1 text-[13px] font-medium text-blue-600 hover:bg-blue-50"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Thu gọn" : "Xem thêm"}
          </button>
        </div>
      )}
    </div>
  );
}

export function SpecsTable({ book }: { book: Book }) {
  
  const attributes = book.specifications?.[0]?.attributes ?? [];

  const rows = attributes.map(attr => ({
    k: attr.name,
    v: attr.value
  })).filter(row => row.v?.trim() !== "");

  return (
    <div className="overflow-hidden rounded-lg border mt-6">
      <table className="w-full text-[13px]">
        <tbody>
          {rows.length ? (
            rows.map((r, i) => (
              <tr key={i} className={i % 2 ? "bg-gray-50" : "bg-white"}>
                <td className="w-48 px-4 py-2 text-gray-500">{r.k}</td>
                <td className="px-4 py-2 text-gray-800">{r.v}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="px-4 py-3 text-sm text-gray-500">Chưa có thông tin chi tiết.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
