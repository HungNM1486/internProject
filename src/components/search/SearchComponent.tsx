import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { bookService } from '@/services/bookService';
import { adaptApiBook } from '@/utils/adapters';
import { Book } from '@/types';

interface SearchComponentProps {
  placeholder?: string;
  className?: string;
  onSearchSubmit?: (query: string) => void;
}

export default function SearchComponent({ 
  placeholder = "Tìm kiếm sách, tác giả...", 
  className = "",
  onSearchSubmit 
}: SearchComponentProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Book[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Debounced search for suggestions
  useEffect(() => {
    if (query.trim().length < 2) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    const timeoutId = setTimeout(async () => {
      try {
        setLoading(true);
        const response = await bookService.searchBooks(query);
        const books = (response.data || []).map(adaptApiBook).slice(0, 6); // Limit to 6 suggestions
        setSuggestions(books);
        setIsOpen(true);
        setSelectedIndex(-1);
      } catch (error) {
        console.error('Search suggestions error:', error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [query]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : prev));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          // Navigate to book detail
          navigate(`/books/${suggestions[selectedIndex].id}`);
          setIsOpen(false);
          setQuery('');
        } else {
          handleSubmit();
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const handleSubmit = () => {
    if (query.trim()) {
      if (onSearchSubmit) {
        onSearchSubmit(query.trim());
      } else {
        // Navigate to search results page
        navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      }
      setIsOpen(false);
      setQuery('');
    }
  };

  const handleSuggestionClick = (book: Book) => {
    navigate(`/books/${book.id}`);
    setIsOpen(false);
    setQuery('');
  };

  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;
    
    const regex = new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? 
        <span key={index} className="bg-yellow-200 font-semibold">{part}</span> : 
        part
    );
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      {/* Search Input */}
      <div className="flex items-center h-10 border border-gray-300 rounded-lg px-3 bg-white">
        <svg className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none text-sm min-w-0 h-10"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (query.trim().length >= 2 && suggestions.length > 0) {
              setIsOpen(true);
            }
          }}
        />
        
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setSuggestions([]);
              setIsOpen(false);
            }}
            className="text-gray-400 hover:text-gray-600 mr-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
        
        <div className="w-px h-6 bg-gray-300 mx-3 flex-shrink-0"></div>
        
        <button 
          onClick={handleSubmit}
          className="text-blue-600 font-normal px-4 py-1 text-sm hover:bg-blue-50 rounded flex-shrink-0"
        >
          Tìm kiếm
        </button>
      </div>

      {/* Search Suggestions Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {loading && (
            <div className="p-4 text-center text-gray-500">
              <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <span className="ml-2">Đang tìm kiếm...</span>
            </div>
          )}
          
          {!loading && suggestions.length === 0 && query.trim().length >= 2 && (
            <div className="p-4 text-center text-gray-500">
              Không tìm thấy kết quả cho "{query}"
            </div>
          )}
          
          {!loading && suggestions.length > 0 && (
            <>
              {/* Quick search option */}
              <div 
                className={`p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${selectedIndex === -1 ? 'bg-blue-50' : ''}`}
                onClick={handleSubmit}
              >
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span className="text-blue-600 font-medium">Tìm kiếm "{query}"</span>
                </div>
              </div>

              {/* Book suggestions */}
              {suggestions.map((book, index) => (
                <div
                  key={book.id}
                  className={`p-3 cursor-pointer hover:bg-gray-50 border-b border-gray-50 last:border-b-0 ${
                    selectedIndex === index ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => handleSuggestionClick(book)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-16 bg-gray-100 rounded flex-shrink-0 overflow-hidden">
                      {book.images && book.images.length > 0 ? (
                        <img 
                          src={book.images[0]} 
                          alt={book.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          📚
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 truncate">
                        {highlightText(book.name, query)}
                      </div>
                      {book.authors && book.authors.length > 0 && (
                        <div className="text-sm text-gray-500 truncate">
                          {book.authors.map(a => a.name).join(', ')}
                        </div>
                      )}
                      <div className="text-sm font-medium text-red-600">
                        {book.price?.toLocaleString()}đ
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}
