import React, { useState, useEffect } from 'react';
import { Author, authorService } from '@/services/authorService';

interface AuthorFilterProps {
  selectedAuthors: number[];
  onAuthorsChange: (authorIds: number[]) => void;
  className?: string;
  showTitle?: boolean;
}

export default function AuthorFilter({ 
  selectedAuthors, 
  onAuthorsChange, 
  className = "",
  showTitle = true 
}: AuthorFilterProps) {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch authors
  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const data = await authorService.getAll();
        setAuthors(data);
      } catch (error) {
        console.error('Error fetching authors:', error);
      } finally {
        setLoading(false);
      }
    };

    void fetchAuthors();
  }, []);

  const handleAuthorToggle = (authorId: number) => {
    const isSelected = selectedAuthors.includes(authorId);
    let newSelected: number[];

    if (isSelected) {
      // Remove author
      newSelected = selectedAuthors.filter(id => id !== authorId);
    } else {
      // Add author
      newSelected = [...selectedAuthors, authorId];
    }

    onAuthorsChange(newSelected);
  };

  const handleClearAll = () => {
    onAuthorsChange([]);
  };

  const handleSelectAll = () => {
    const allIds = filteredAuthors.map(author => author.id);
    onAuthorsChange(allIds);
  };

  // Filter authors by search query
  const filteredAuthors = authors.filter(author =>
    author.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const hasSelectedAuthors = selectedAuthors.length > 0;

  if (loading) {
    return (
      <div className={`bg-white rounded-lg border border-gray-200 p-4 ${className}`}>
        {showTitle && (
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Tác giả</h3>
          </div>
        )}
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center animate-pulse">
              <div className="w-4 h-4 bg-gray-200 rounded mr-3"></div>
              <div className="h-4 bg-gray-200 rounded flex-1"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-4 ${className}`}>
      {showTitle && (
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Tác giả</h3>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg 
              className={`w-4 h-4 transition-transform ${isCollapsed ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      )}

      {!isCollapsed && (
        <div className="space-y-3">
          {/* Search Box */}
          {authors.length > 5 && (
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm tác giả..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 pl-8 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg 
                className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          )}

          {/* Filter Actions */}
          {filteredAuthors.length > 1 && (
            <div className="flex gap-2 pb-3 border-b border-gray-100">
              {hasSelectedAuthors ? (
                <button
                  onClick={handleClearAll}
                  className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                >
                  Bỏ chọn tất cả
                </button>
              ) : (
                <button
                  onClick={handleSelectAll}
                  className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                >
                  Chọn tất cả
                </button>
              )}
            </div>
          )}

          {/* Authors List */}
          <div className="max-h-60 overflow-y-auto">
            {filteredAuthors.length > 0 ? (
              filteredAuthors.map((author) => {
                const isSelected = selectedAuthors.includes(author.id);
                return (
                  <label
                    key={author.id}
                    className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded -m-2"
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleAuthorToggle(author.id)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <span className="ml-3 flex-1 text-sm text-gray-900">
                      {author.name}
                    </span>
                    {author.book_count && (
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {author.book_count}
                      </span>
                    )}
                  </label>
                );
              })
            ) : (
              <div className="text-center py-4 text-gray-500 text-sm">
                {searchQuery ? `Không tìm thấy tác giả "${searchQuery}"` : 'Không có tác giả nào'}
              </div>
            )}
          </div>

          {/* Selected Summary */}
          {hasSelectedAuthors && (
            <div className="mt-4 pt-3 border-t border-gray-100">
              <div className="text-xs text-gray-600 mb-2">
                Đã chọn {selectedAuthors.length} tác giả
              </div>
              <div className="flex flex-wrap gap-1">
                {selectedAuthors.map(id => {
                  const author = authors.find(a => a.id === id);
                  if (!author) return null;
                  
                  return (
                    <button
                      key={id}
                      onClick={() => handleAuthorToggle(id)}
                      className="inline-flex items-center gap-1 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full hover:bg-blue-200"
                    >
                      {author.name.length > 15 ? author.name.substring(0, 15) + '...' : author.name}
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* No authors available */}
          {authors.length === 0 && (
            <div className="text-center py-4 text-gray-500 text-sm">
              Không có tác giả nào
            </div>
          )}
        </div>
      )}
    </div>
  );
}
