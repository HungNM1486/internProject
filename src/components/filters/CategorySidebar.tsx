import { useEffect, useState } from "react";
import { Category } from "@/types";
import { categoryService} from "@/services/categoryService";

type Props = {
  selected: string | null;
  onSelect: (value: string | null) => void;
};

export default function CategorySidebar({ selected, onSelect }: Props) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryService.getAll();
        setCategories(data);
      } catch (e) {
        console.error("Lỗi khi tải danh mục", e);
      }
    };

    fetchCategories();
  }, []);

  return (
    <aside className="w-full sm:w-48 pr-4 text-sm">
      <h3 className="font-semibold mb-3">Khám phá theo danh mục</h3>
      <ul className="space-y-2">
        {categories.map((cat) => (
          <li key={cat.id}>
            <button
              onClick={() => onSelect(cat.name)}
              className={`block w-full text-left ${
                selected === cat.name ? "font-bold text-blue-600" : "text-gray-700"
              }`}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
