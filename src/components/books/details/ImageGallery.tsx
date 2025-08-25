import { useState, useEffect, useRef } from "react";

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [active, setActive] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [touchStart, setTouchStart] = useState(0);
  const imageRef = useRef<HTMLImageElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);

  const list = images?.length ? images : [""];

  // Preload images for better performance
  useEffect(() => {
    list.forEach((src) => {
      if (src) {
        const img = new Image();
        img.src = src;
      }
    });
  }, [list]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isLightboxOpen) {
        switch (e.key) {
          case 'ArrowLeft':
            e.preventDefault();
            setActive((prev) => (prev > 0 ? prev - 1 : list.length - 1));
            break;
          case 'ArrowRight':
            e.preventDefault();
            setActive((prev) => (prev < list.length - 1 ? prev + 1 : 0));
            break;
          case 'Escape':
            e.preventDefault();
            setIsLightboxOpen(false);
            setIsZoomed(false);
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, list.length]);

  // Handle mouse move for zoom
  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!isZoomed || !imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setMousePosition({ x, y });
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;

    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) { // Minimum swipe distance
      if (diff > 0 && active < list.length - 1) {
        // Swipe left - next image
        setActive(active + 1);
      } else if (diff < 0 && active > 0) {
        // Swipe right - previous image
        setActive(active - 1);
      }
    }
    setTouchStart(0);
  };

  const openLightbox = () => {
    setIsLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setIsZoomed(false);
    document.body.style.overflow = 'unset';
  };

  const nextImage = () => {
    setActive((prev) => (prev < list.length - 1 ? prev + 1 : 0));
  };

  const prevImage = () => {
    setActive((prev) => (prev > 0 ? prev - 1 : list.length - 1));
  };

  return (
    <>
      <div className="rounded-lg border bg-white p-3">
        {/* Main Image with hover zoom hint */}
        <div 
          className="relative overflow-hidden rounded-lg border bg-gray-50 cursor-zoom-in group"
          onClick={openLightbox}
        >
          <img
            src={list[active]}
            alt={title}
            className="mx-auto block max-h-[460px] w-full object-contain transition-transform duration-300 group-hover:scale-105"
            loading="eager"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          />
          
          {/* Zoom hint overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white bg-opacity-90 rounded-full p-2">
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </div>
          </div>

          {/* Navigation arrows for main image */}
          {list.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Thumbnails with improved UX */}
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {list.slice(0, 6).map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`flex-shrink-0 h-14 w-14 overflow-hidden rounded-md border transition-all duration-200 ${
                i === active 
                  ? "ring-2 ring-blue-600 border-blue-200" 
                  : "border-gray-300 hover:border-gray-400 hover:shadow-sm"
              }`}
              aria-label={`Ảnh ${i + 1}`}
            >
              <img 
                src={src} 
                alt={`${title}-${i + 1}`} 
                className="h-full w-full object-cover" 
                loading="lazy" 
              />
            </button>
          ))}
          
          {/* Show more indicator */}
          {list.length > 6 && (
            <button
              onClick={openLightbox}
              className="flex-shrink-0 h-14 w-14 bg-gray-100 border border-gray-300 rounded-md flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
            >
              <span className="text-xs font-medium">+{list.length - 6}</span>
            </button>
          )}
        </div>

        {/* Summary button */}
        <button className="mt-3 inline-flex w-full items-center justify-between rounded-md border px-3 py-2 text-[13px] text-gray-700 hover:bg-gray-50 transition-colors">
          <span className="flex items-center gap-2">
            <span className="inline-block h-4 w-4 rounded bg-blue-600" />
            Xem thêm Tóm tắt nội dung sách
          </span>
          <span>›</span>
        </button>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div 
          ref={lightboxRef}
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 w-10 h-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center z-10 transition-colors"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Image counter */}
          <div className="absolute top-4 left-4 bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm">
            {active + 1} / {list.length}
          </div>

          {/* Main lightbox image */}
          <div className="relative max-w-4xl max-h-[90vh] mx-4">
            <img
              ref={imageRef}
              src={list[active]}
              alt={`${title} - Ảnh ${active + 1}`}
              className={`max-w-full max-h-full object-contain cursor-zoom-in transition-transform duration-300 ${
                isZoomed ? 'cursor-zoom-out scale-150' : ''
              }`}
              style={
                isZoomed
                  ? {
                      transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                    }
                  : {}
              }
              onClick={(e) => {
                e.stopPropagation();
                setIsZoomed(!isZoomed);
              }}
              onMouseMove={handleMouseMove}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            />
          </div>

          {/* Navigation in lightbox */}
          {list.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-colors"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-colors"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Thumbnail strip in lightbox */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-white bg-opacity-10 p-2 rounded-lg max-w-md overflow-x-auto">
            {list.map((src, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setActive(i);
                }}
                className={`flex-shrink-0 w-12 h-12 rounded border-2 overflow-hidden transition-all ${
                  i === active ? 'border-white' : 'border-transparent opacity-60 hover:opacity-80'
                }`}
              >
                <img src={src} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Help text */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 text-white text-sm bg-white bg-opacity-10 px-3 py-1 rounded">
            Click để zoom • ESC để đóng • ← → để chuyển ảnh
          </div>
        </div>
      )}
    </>
  );
}