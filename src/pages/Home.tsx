import React, { useState } from "react";
import BookList from "@/components/books/BookList";
import CategorySidebar from "@/components/filters/CategorySidebar";

const Home: React.FC = () => {
  const [category, setCategory] = useState<string | null>(null);
  const [filters, setFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("popular");

  return (
    <div className="container mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
      {/* Sidebar danh mục */}
      <div className="w-full lg:w-1/5">
        <CategorySidebar selected={category} onSelect={setCategory} />
      </div>

      {/* Main content */}
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-4">Nhà sách Tiki</h1>

        {/* Danh sách sách */}
        <BookList />
      </div>
    </div>
  );
};

export default Home;
