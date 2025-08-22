import React from 'react';

interface PublisherFilterProps {
  selectedPublishers: number[];
  onPublishersChange: (publisherIds: number[]) => void;
  className?: string;
  showTitle?: boolean;
}

export default function PublisherFilter({ 
  selectedPublishers, 
  onPublishersChange, 
  className = "",
  showTitle = true 
}: PublisherFilterProps) {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-4 ${className}`}>
      {showTitle && (
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Nhà xuất bản</h3>
        </div>
      )}

      <div className="space-y-3">
        {/* Coming Soon Message */}
        <div className="text-center py-6">
          <div className="text-4xl mb-3">🏢</div>
          <div className="text-sm text-gray-500 mb-2">
            Tính năng lọc theo nhà xuất bản
          </div>
          <div className="text-xs text-gray-400">
            Sẽ có sớm...
          </div>
        </div>

        {/* Placeholder for future functionality */}
        <div className="opacity-50 pointer-events-none">
          <div className="space-y-2">
            {['NXB Trẻ', 'NXB Kim Đồng', 'NXB Văn học'].map((name, index) => (
              <label
                key={index}
                className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded -m-2"
              >
                <input
                  type="checkbox"
                  disabled
                  className="w-4 h-4 text-gray-300 bg-gray-100 border-gray-300 rounded"
                />
                <span className="ml-3 flex-1 text-sm text-gray-400">
                  {name}
                </span>
                <span className="text-xs text-gray-300 bg-gray-50 px-2 py-1 rounded-full">
                  0
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Note */}
        <div className="text-xs text-gray-400 p-2 bg-gray-50 rounded">
          💡 Backend chưa hỗ trợ thông tin nhà xuất bản
        </div>
      </div>
    </div>
  );
}
