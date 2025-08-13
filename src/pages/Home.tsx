import React from 'react';
import BookList from '@/components/books/BookList';

const Home: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Nhà sách Tiki</h1>
      <section>
        <BookList />
      </section>
    </div>
  );
};

export default Home;