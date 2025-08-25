import React, { useState, useEffect } from 'react';

export interface PriceRange {
  min: number | null;
  max: number | null;
}

const PRESET_RANGES: Array<{ label: string; range: PriceRange }> = [
  { label: 'Tất cả', range: { min: null, max: null } },
  { label: 'Dưới 50k', range: { min: null, max: 50000 } },
  { label: '50k - 100k', range: { min: 50000, max: 100000 } },
  { label: '100k - 200k', range: { min: 100000, max: 200000 } },
  { label: '200k - 500k', range: { min: 200000, max: 500000 } },
  { label: 'Trên 500k', range: { min: 500000, max: null } }
];

interface PriceRangeFilterProps {
  selectedRange: PriceRange;
  onRangeChange: (range: PriceRange) => void;
  className?: string;
  showTitle?: boolean;
}

export default function PriceRangeFilter({
  selectedRange,
  onRangeChange,
  className = "",
  showTitle = true
}: PriceRangeFilterProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [customMin, setCustomMin] = useState<string>('');
  const [customMax, setCustomMax] = useState<string>('');
  const [showCustom, setShowCustom] = useState(false);

  // Update custom inputs when selectedRange changes
  useEffect(() => {
    setCustomMin(selectedRange.min ? selectedRange.min.toString() : '');
    setCustomMax(selectedRange.max ? selectedRange.max.toString() : '');
    
    // Check if current range matches any preset
    const matchesPreset = PRESET_RANGES.some(preset => 
      preset.range.min === selectedRange.min && preset.range.max === selectedRange.max
    );
    setShowCustom(!matchesPreset && (selectedRange.min !== null || selectedRange.max !== null));
  }, [selectedRange]);

  const handlePresetSelect = (range: PriceRange) => {
    onRangeChange(range);
    setShowCustom(false);
  };

  const handleCustomApply = () => {
    const min = customMin ? parseInt(customMin.replace(/[^\d]/g, '')) : null;
    const max = customMax ? parseInt(customMax.replace(/[^\d]/g, '')) : null;
    
    // Validate range
    if (min !== null && max !== null && min > max) {
      alert('Giá tối thiểu không thể lớn hơn giá tối đa');
      return;
    }
    
    onRangeChange({ min, max });
  };

  const handleCustomClear = () => {
    setCustomMin('');
    setCustomMax('');
    onRangeChange({ min: null, max: null });
    setShowCustom(false);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };

  const isActive = selectedRange.min !== null || selectedRange.max !== null;

  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-4 ${className}`}>
      {showTitle && (
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Khoảng giá</h3>
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
          {/* Preset Ranges */}
          <div className="space-y-2">
            {PRESET_RANGES.map((preset, index) => {
              const isSelected = preset.range.min === selectedRange.min && preset.range.max === selectedRange.max;
              
              return (
                <label
                  key={index}
                  className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded -m-2"
                >
                  <input
                    type="radio"
                    name="priceRange"
                    checked={isSelected}
                    onChange={() => handlePresetSelect(preset.range)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="ml-3 text-sm text-gray-900">
                    {preset.label}
                  </span>
                </label>
              );
            })}
          </div>

          {/* Custom Range Toggle */}
          <div className="border-t border-gray-100 pt-3">
            <button
              onClick={() => setShowCustom(!showCustom)}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              {showCustom ? 'Ẩn tùy chỉnh' : 'Tùy chỉnh khoảng giá'}
            </button>
          </div>

          {/* Custom Range Inputs */}
          {showCustom && (
            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Từ (đ)
                  </label>
                  <input
                    type="text"
                    value={customMin}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^\d]/g, '');
                      setCustomMin(value);
                    }}
                    placeholder="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Đến (đ)
                  </label>
                  <input
                    type="text"
                    value={customMax}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^\d]/g, '');
                      setCustomMax(value);
                    }}
                    placeholder="Không giới hạn"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={handleCustomApply}
                  className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Áp dụng
                </button>
                <button
                  onClick={handleCustomClear}
                  className="px-3 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Xóa
                </button>
              </div>
            </div>
          )}

          {/* Current Selection Display */}
          {isActive && (
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
              <div className="text-sm font-medium text-blue-900 mb-1">
                Khoảng giá hiện tại:
              </div>
              <div className="text-sm text-blue-700">
                {selectedRange.min ? formatPrice(selectedRange.min) : '0đ'} 
                {' - '}
                {selectedRange.max ? formatPrice(selectedRange.max) : 'Không giới hạn'}
              </div>
              <button
                onClick={() => onRangeChange({ min: null, max: null })}
                className="text-xs text-blue-600 hover:text-blue-800 mt-2 font-medium"
              >
                Xóa bộ lọc giá
              </button>
            </div>
          )}

          {/* Price Statistics (Optional) */}
          <div className="text-xs text-gray-500 pt-2 border-t border-gray-100">
            💡 Gợi ý: Hầu hết sách trong khoảng 50k - 100k
          </div>
        </div>
      )}
    </div>
  );
}
