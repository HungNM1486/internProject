#!/usr/bin/env python
import os
import sys
import django

# Setup Django
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'bookstore.settings')
django.setup()

from books.models import Book, BookImage
import random

def add_book_images():
    print("🖼️ THÊM HÌNH ẢNH CHO TẤT CẢ SÁCH...")
    
    # Danh sách URL hình ảnh sách giả (sử dụng picsum.photos)
    book_image_urls = [
        "https://picsum.photos/300/400?random=1",
        "https://picsum.photos/300/400?random=2", 
        "https://picsum.photos/300/400?random=3",
        "https://picsum.photos/300/400?random=4",
        "https://picsum.photos/300/400?random=5",
        "https://picsum.photos/300/400?random=6",
        "https://picsum.photos/300/400?random=7",
        "https://picsum.photos/300/400?random=8",
        "https://picsum.photos/300/400?random=9",
        "https://picsum.photos/300/400?random=10",
        "https://picsum.photos/300/400?random=11",
        "https://picsum.photos/300/400?random=12",
        "https://picsum.photos/300/400?random=13",
        "https://picsum.photos/300/400?random=14",
        "https://picsum.photos/300/400?random=15",
        "https://picsum.photos/300/400?random=16",
        "https://picsum.photos/300/400?random=17",
        "https://picsum.photos/300/400?random=18",
        "https://picsum.photos/300/400?random=19",
        "https://picsum.photos/300/400?random=20",
        "https://picsum.photos/300/400?random=21",
        "https://picsum.photos/300/400?random=22",
        "https://picsum.photos/300/400?random=23",
        "https://picsum.photos/300/400?random=24",
        "https://picsum.photos/300/400?random=25",
        "https://picsum.photos/300/400?random=26",
        "https://picsum.photos/300/400?random=27",
        "https://picsum.photos/300/400?random=28",
        "https://picsum.photos/300/400?random=29",
        "https://picsum.photos/300/400?random=30",
        "https://picsum.photos/300/400?random=31",
        "https://picsum.photos/300/400?random=32",
        "https://picsum.photos/300/400?random=33",
        "https://picsum.photos/300/400?random=34",
        "https://picsum.photos/300/400?random=35",
        "https://picsum.photos/300/400?random=36",
        "https://picsum.photos/300/400?random=37",
        "https://picsum.photos/300/400?random=38",
        "https://picsum.photos/300/400?random=39",
        "https://picsum.photos/300/400?random=40",
    ]
    
    # Lấy tất cả sách
    books = Book.objects.all()
    print(f"📚 Tìm thấy {books.count()} sách")
    
    added_count = 0
    
    for i, book in enumerate(books):
        # Xóa images cũ nếu có
        BookImage.objects.filter(book=book).delete()
        
        # Random chọn 1-3 hình ảnh cho mỗi sách
        num_images = random.randint(1, 3)
        selected_urls = random.sample(book_image_urls, min(num_images, len(book_image_urls)))
        
        for j, image_url in enumerate(selected_urls):
            BookImage.objects.create(
                book=book,
                base_url=image_url,
                large_url=image_url,
                medium_url=image_url,
                small_url=image_url,
                thumbnail_url=image_url,
                is_gallery=True,
                position=j + 1,
                label=f"Ảnh bìa sách {book.title}"
            )
            added_count += 1
        
        print(f"✅ {book.title} - Thêm {num_images} ảnh")
    
    print(f"\n🎊 HOÀN THÀNH! Đã thêm {added_count} hình ảnh cho {books.count()} sách")

if __name__ == "__main__":
    add_book_images()
