import React from "react";
import BookList from "@/components/books/BookList";
import CategorySidebar from "@/components/layout/CategorySidebar";
import  CategoryExplore  from "@/components/books/filter/CategoryExplore";
import ProductFeaturesBar  from "@/components/books/filter/ProductFeaturesBar";
const Books: React.FC = () => {
  return (
    <div className="mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6 bg-white">
      {/* Sidebar danh mục */}
      <div className="w-full lg:w-1/5">
        <CategorySidebar />
      </div>

      {/* Main content */}
      <div className="flex-1">
        <div className="bg-white p-4  rounded shadow mb-6" >
          <h1 className="text-2xl font-bold mb-0">Nhà sách Tiki</h1>
        </div>
        <div className="space-y-4">
          <CategoryExplore />
          <ProductFeaturesBar />
          <BookList />
        </div>
        
        
        
      </div>
    </div>
  );
};

export default Books;