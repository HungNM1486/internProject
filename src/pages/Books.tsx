import React from "react";
import BookList from "@/components/books/BookList";
import CategorySidebar from "@/components/layout/CategorySidebar";

const Books: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
      {/* Sidebar danh mục */}
      <div className="w-full lg:w-1/5">
        <CategorySidebar />
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

export default Books;