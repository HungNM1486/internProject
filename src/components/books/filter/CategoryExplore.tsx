// components/CategoryExplore.tsx
import { useEffect, useState } from "react";
import { Category } from "@/types";
import { categoryService } from "@/services/categoryService";

export default function CategoryExplore() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    categoryService
      .getAll()
      .then((data) => setCategories(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Đang tải danh mục...</div>;

  return (
    <div className="bg-white p-4 rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-4">Khám phá theo danh mục</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="flex flex-col items-center cursor-pointer hover:text-blue-600"
          >
            <img
              src={cat.thumbnail_url || "/placeholder.png"}
              alt={cat.name}
              className="w-20 h-20 object-cover rounded-full mb-2"
            />
            <span className="text-sm text-center">{cat.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
