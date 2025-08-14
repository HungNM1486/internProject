import React, {useState} from "react";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { CategoryTree } from "./CategoryTree";

const categoryTree = CategoryTree;
const CategorySidebar: React.FC = () => {
    const [openId, setOpenId] = useState<number | string | null>(categoryTree[0]?.id ?? null);

  const toggle = (id: number | string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <aside className="w-64 rounded-lg bg-white text-sm shadow border border-gray-200">
      <div className="border-b px-4 py-3 font-semibold text-gray-900 text-base">
        Khám phá theo danh mục
      </div>

      <nav className="divide-y divide-gray-100">
        {categoryTree.map((cat) => {
          const isOpen = openId === cat.id;

          return (
            <div key={cat.id}>
              <button
                className="flex w-full items-center justify-between px-4 py-3 text-[13px] font-regular text-gray-800 hover:bg-gray-100"
                onClick={() => toggle(cat.id)}
              >
                {cat.name}
                {isOpen ? (
                  <ChevronDownIcon className="h-3 w-3" />
                ) : (
                  <ChevronRightIcon className="h-3 w-3" />
                )}
              </button>

              {isOpen && Array.isArray(cat.children) && cat.children.length > 0 && (

                <ul className="px-6 pb-3 pt-1 space-y-1 text-gray-700 text-[12px]">
                  {cat.children.map((child) => (
                    <li
                      key={child.id}
                      className="cursor-pointer hover:text-blue-600 transition"
                    >
                      {child.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}

export default CategorySidebar;
