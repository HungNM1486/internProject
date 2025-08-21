import { useState, useEffect } from "react";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Category } from "@/types";
import { categoryService } from "@/services/categoryService";

export default function Sidebar() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [openId, setOpenId] = useState<number | null>(null);

  useEffect(() => {
    categoryService.getAll().then((data) => setCategories(data));
  }, []);

  const toggle = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  // Type guard: chỉ lấy category có children là mảng
  const hasChildren = (cat: Category): cat is Category & { children: Category[] } =>
    Array.isArray(cat.children) && cat.children.length > 0;

<<<<<<< HEAD
   return (
    <aside className="w-64 rounded-lg bg-white shadow border border-gray-200 text-[13px]">
      <div className="border-b border-gray-200 px-4 py-3 font-semibold text-gray-900 text-sm">
        Khám phá theo danh mục
      </div>

      <nav className="py-0">
        <ul className="divide-y divide-gray-200">
          {categories.map((cat, index) => {
            const isOpen = openId === cat.id;

            return (
              <li key={cat.id} className="relative">
                <button
                  onClick={() => toggle(cat.id)}
                  className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-regular text-gray-800 hover:bg-gray-50 transition-colors"
                >
                  <span>{cat.name}</span>
                  {hasChildren(cat) && (
                    <span className="flex-shrink-0 ml-2">
                      {isOpen ? (
                        <ChevronDownIcon className="h-4 w-4 text-gray-500" />
                      ) : (
                        <ChevronRightIcon className="h-4 w-4 text-gray-500" />
=======
  return (
    <aside className="w-64 rounded-lg bg-white shadow border border-gray-200 text-[13px]">
      <div className="border-b px-4 py-3 font-semibold text-gray-900 text-sm">
        Khám phá theo danh mục
      </div>

      <nav className="p-2">
        <ul className="space-y-1">
          {categories.map((cat) => {
            const isOpen = openId === cat.id;

            return (
              <li key={cat.id}>
                <button
                  onClick={() => toggle(cat.id)}
                  className="flex w-full items-center justify-between px-3 py-2 border-b text-xs font-medium text-gray-800 hover:bg-gray-100"
                >
                  <span>{cat.name}</span>
                  {hasChildren(cat) && (
                    <span>
                      {isOpen ? (
                        <ChevronDownIcon className="h-3 w-3 text-gray-500" />
                      ) : (
                        <ChevronRightIcon className="h-3 w-3 text-gray-500" />
>>>>>>> 40115e6 (cập nhật code mới)
                      )}
                    </span>
                  )}
                </button>

                {isOpen && hasChildren(cat) && (
<<<<<<< HEAD
                  <div className="bg-gray-50">
                    <ul className="py-2">
                      {cat.children.map((child, childIndex) => (
                        <li key={child.id}>
                          <a
                            href={`/${child.url_key}`}
                            className="block px-6 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-white transition-colors"
                          >
                            {child.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
=======
                  <ul className="mt-1 ml-3 space-y-1 border-gray-200 pl-3">
                    {cat.children.map((child) => (
                      <li key={child.id}>
                        <a
                          href={`/${child.url_key}`}
                          className="block py-1 pl-2 text-xs text-gray-600 hover:text-blue-600"
                        >
                          {child.name}
                        </a>
                      </li>
                    ))}
                  </ul>
>>>>>>> 40115e6 (cập nhật code mới)
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 40115e6 (cập nhật code mới)
