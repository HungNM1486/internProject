import { useState } from "react";

export default function ImageGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);
  const list = images?.length ? images : [""];

  return (
    <div className="rounded-lg border bg-white p-3">
      <div className="overflow-hidden rounded-lg border bg-gray-50">
        <img
          src={list[active]}
          alt={title}
          className="mx-auto block max-h-[460px] w-full object-contain"
          loading="eager"
        />
      </div>

      {/* thumbs bên dưới, nhỏ và viền xám giống mock */}
      <div className="mt-3 flex gap-2">
        {list.slice(0, 4).map((src, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`h-14 w-14 overflow-hidden rounded-md border ${
              i === active ? "ring-2 ring-blue-600" : "border-gray-300"
            }`}
            aria-label={`Ảnh ${i + 1}`}
          >
            <img src={src} alt={`${title}-${i + 1}`} className="h-full w-full object-cover" loading="lazy" />
          </button>
        ))}
      </div>

      {/* nút “Xem thêm Tóm tắt nội dung sách” giả lập */}
      <button className="mt-3 inline-flex w-full items-center justify-between rounded-md border px-3 py-2 text-[13px] text-gray-700 hover:bg-gray-50">
        <span className="flex items-center gap-2">
          <span className="inline-block h-4 w-4 rounded bg-blue-600" />
          Xem thêm Tóm tắt nội dung sách
        </span>
        <span>›</span>
      </button>
    </div>
  );
}
