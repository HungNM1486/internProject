#!/usr/bin/env python
import os
import sys
import django

# Setup Django
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'bookstore.settings')
django.setup()

from books.models import Book, Author, Category, BookImage
from decimal import Decimal
import random

def clean_and_add_proper_data():
    print("🧹 CLEAN DỮ LIỆU CŨ...")
    
    # Xóa tất cả books cũ (giữ lại categories và authors)
    Book.objects.all().delete()
    print("✅ Đã xóa tất cả sách cũ")
    
    # Lấy authors và categories hiện có
    authors = list(Author.objects.all())
    categories = list(Category.objects.all())
    
    print(f"📊 Có {len(authors)} tác giả và {len(categories)} danh mục")
    
    # Dữ liệu sách KHÔNG TRÙNG LẶP với giá rõ ràng
    books_data = [
        # === SÁCH GIÁ RẺ (10k - 49k) ===
        {"title": "Truyện Kiều", "price": 15000, "original_price": 20000, "description": "Tác phẩm kinh điển của Nguyễn Du"},
        {"title": "Số Đỏ", "price": 22000, "original_price": 30000, "description": "Tiểu thuyết của Vũ Trọng Phụng"},
        {"title": "Lão Hạc", "price": 18000, "original_price": 25000, "description": "Truyện ngắn của Nam Cao"},
        {"title": "Chí Phèo", "price": 25000, "original_price": 32000, "description": "Tác phẩm của Nam Cao"},
        {"title": "Sách Tô Màu Trẻ Em", "price": 12000, "original_price": 18000, "description": "Sách giáo dục cho bé"},
        {"title": "Truyện Cổ Tích Việt Nam", "price": 28000, "original_price": 35000, "description": "Tuyển tập truyện cổ tích"},
        {"title": "Thơ Xuân Diệu", "price": 35000, "original_price": 45000, "description": "Tuyển tập thơ tình"},
        {"title": "Những Ngày Thơ Ấu", "price": 42000, "original_price": 50000, "description": "Hồi ký tuổi thơ"},
        {"title": "Cuộc Đời Là Những Chuyến Đi", "price": 48000, "original_price": 60000, "description": "Sách du lịch"},
        
        # === SÁCH TẦM TRUNG (50k - 149k) ===
        {"title": "Norwegian Wood", "price": 89000, "original_price": 120000, "description": "Tiểu thuyết của Haruki Murakami"},
        {"title": "The Alchemist", "price": 95000, "original_price": 130000, "description": "Nhà giả kim - Paulo Coelho"},
        {"title": "Harry Potter Tập 1", "price": 125000, "original_price": 160000, "description": "Hòn đá phù thủy"},
        {"title": "Thám Tử Sherlock Holmes", "price": 78000, "original_price": 95000, "description": "Truyện trinh thám kinh điển"},
        {"title": "1984", "price": 85000, "original_price": 110000, "description": "Tiểu thuyết dystopia"},
        {"title": "Animal Farm", "price": 65000, "original_price": 80000, "description": "Trại súc vật - George Orwell"},
        {"title": "Đắc Nhân Tâm", "price": 72000, "original_price": 90000, "description": "Nghệ thuật giao tiếp"},
        {"title": "Think and Grow Rich", "price": 98000, "original_price": 115000, "description": "Tư duy làm giàu"},
        {"title": "Rich Dad Poor Dad", "price": 105000, "original_price": 130000, "description": "Cha giàu cha nghèo"},
        {"title": "Conan Thám Tử Lừng Danh", "price": 55000, "original_price": 70000, "description": "Manga trinh thám"},
        {"title": "Doraemon Tập Đặc Biệt", "price": 62000, "original_price": 75000, "description": "Truyện tranh thiếu nhi"},
        {"title": "Cà Phê Cùng Tony", "price": 68000, "original_price": 85000, "description": "Sách tâm lý học"},
        {"title": "Món Ăn Ngon Mỗi Ngày", "price": 58000, "original_price": 72000, "description": "Sách nấu ăn"},
        {"title": "Du Lịch Việt Nam", "price": 118000, "original_price": 145000, "description": "Cẩm nang du lịch"},
        {"title": "Lịch Sử Việt Nam", "price": 132000, "original_price": 165000, "description": "Sách lịch sử"},
        
        # === SÁCH CAO CẤP (150k - 299k) ===
        {"title": "Pride and Prejudice - Collector's Edition", "price": 189000, "original_price": 240000, "description": "Phiên bản sưu tập"},
        {"title": "The Great Gatsby - Illustrated", "price": 165000, "original_price": 200000, "description": "Gatsby vĩ đại có minh họa"},
        {"title": "War and Peace - Complete", "price": 245000, "original_price": 320000, "description": "Chiến tranh và hòa bình"},
        {"title": "Les Misérables - Hardcover", "price": 225000, "original_price": 280000, "description": "Những người khốn khổ"},
        {"title": "The Complete Shakespeare", "price": 289000, "original_price": 350000, "description": "Toàn tập Shakespeare"},
        {"title": "One Hundred Years of Solitude", "price": 178000, "original_price": 220000, "description": "Trăm năm cô đơn"},
        {"title": "7 Habits of Highly Effective People", "price": 158000, "original_price": 195000, "description": "7 thói quen hiệu quả"},
        
        # === SÁCH SIÊU CAO CẤP (300k+) ===
        {"title": "The Art of War - Luxury Edition", "price": 350000, "original_price": 450000, "description": "Binh pháp Tôn Tử - phiên bản sang trọng"},
        {"title": "Encyclopedia Britannica - Premium", "price": 420000, "original_price": 500000, "description": "Bách khoa toàn thư"},
        {"title": "Oxford English Dictionary - Complete", "price": 650000, "original_price": 800000, "description": "Từ điển tiếng Anh đầy đủ"},
        {"title": "Cambridge History of Literature", "price": 890000, "original_price": 1200000, "description": "Lịch sử văn học Cambridge"},
        {"title": "Medical Encyclopedia - Professional", "price": 750000, "original_price": 950000, "description": "Bách khoa y học chuyên nghiệp"},
    ]
    
    print(f"📚 Tạo {len(books_data)} sách mới với giá không trùng lặp...")
    
    created_count = 0
    for i, book_data in enumerate(books_data):
        # Random chọn author và category
        author = random.choice(authors)
        category = random.choice(categories)
        
        # Tạo slug từ title
        import re
        slug = re.sub(r'[^a-zA-Z0-9\s-]', '', book_data["title"].lower())
        slug = re.sub(r'\s+', '-', slug.strip())
        slug = f"{slug}-{i+1}"  # Thêm số để tránh trùng slug
        
        # Random rating và quantity_sold
        rating = round(random.uniform(3.8, 5.0), 1)
        quantity_sold = random.randint(50, 800)
        stock_quantity = random.randint(10, 100)
        
        try:
            book = Book.objects.create(
                title=book_data["title"],
                slug=slug,
                description=book_data["description"],
                list_price=Decimal(str(book_data["price"])),
                original_price=Decimal(str(book_data["original_price"])),
                rating_average=Decimal(str(rating)),
                quantity_sold=quantity_sold,
                stock_quantity=stock_quantity,
                is_active=True,
            )
            
            # Add author và category
            book.authors.add(author)
            book.categories.add(category)
            
            created_count += 1
            print(f"✅ {book.title} - {book.list_price}đ")
            
        except Exception as e:
            print(f"❌ Lỗi tạo sách {book_data['title']}: {e}")
    
    print(f"\n🎊 HOÀN THÀNH! Đã tạo {created_count} sách mới")
    
    # Thống kê
    print("\n📊 THỐNG KÊ THEO GIÁ:")
    under_50k = Book.objects.filter(list_price__lt=50000).count()
    range_50_150k = Book.objects.filter(list_price__gte=50000, list_price__lt=150000).count()
    range_150_300k = Book.objects.filter(list_price__gte=150000, list_price__lt=300000).count()
    over_300k = Book.objects.filter(list_price__gte=300000).count()
    
    print(f"💰 Dưới 50k: {under_50k} sách")
    print(f"💰 50k-150k: {range_50_150k} sách")
    print(f"💰 150k-300k: {range_150_300k} sách")
    print(f"💰 Trên 300k: {over_300k} sách")
    print(f"📖 Tổng cộng: {Book.objects.count()} sách")

if __name__ == "__main__":
    clean_and_add_proper_data()
