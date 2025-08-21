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

def add_sample_data():
    print("🚀 BẮT ĐẦU THÊM DỮ LIỆU SÁCH...")
    
    # Tạo thêm authors
    authors_data = [
        {"name": "Haruki Murakami", "slug": "haruki-murakami"},
        {"name": "Paulo Coelho", "slug": "paulo-coelho"},
        {"name": "J.K. Rowling", "slug": "jk-rowling"},
        {"name": "Agatha Christie", "slug": "agatha-christie"},
        {"name": "Stephen King", "slug": "stephen-king"},
        {"name": "George Orwell", "slug": "george-orwell"},
        {"name": "Gabriel García Márquez", "slug": "gabriel-garcia-marquez"},
        {"name": "Jane Austen", "slug": "jane-austen"},
        {"name": "Mark Twain", "slug": "mark-twain"},
        {"name": "Charles Dickens", "slug": "charles-dickens"},
        {"name": "Victor Hugo", "slug": "victor-hugo"},
        {"name": "Leo Tolstoy", "slug": "leo-tolstoy"},
        {"name": "William Shakespeare", "slug": "william-shakespeare"},
        {"name": "Ernest Hemingway", "slug": "ernest-hemingway"},
        {"name": "F. Scott Fitzgerald", "slug": "f-scott-fitzgerald"},
    ]
    
    authors = []
    for author_data in authors_data:
        author, created = Author.objects.get_or_create(
            slug=author_data["slug"],
            defaults={"name": author_data["name"]}
        )
        authors.append(author)
        if created:
            print(f"✅ Tạo tác giả: {author.name}")
    
    # Tạo thêm categories
    categories_data = [
        {"name": "Khoa học viễn tưởng", "slug": "khoa-hoc-vien-tuong"},
        {"name": "Trinh thám", "slug": "trinh-tham"},
        {"name": "Kinh doanh", "slug": "kinh-doanh"},
        {"name": "Tâm lý học", "slug": "tam-ly-hoc"},
        {"name": "Lịch sử", "slug": "lich-su"},
        {"name": "Triết học", "slug": "triet-hoc"},
        {"name": "Sách thiếu nhi", "slug": "sach-thieu-nhi"},
        {"name": "Sức khỏe", "slug": "suc-khoe"},
        {"name": "Nấu ăn", "slug": "nau-an"},
        {"name": "Du lịch", "slug": "du-lich"},
    ]
    
    categories = []
    for cat_data in categories_data:
        category, created = Category.objects.get_or_create(
            slug=cat_data["slug"],
            defaults={"name": cat_data["name"]}
        )
        categories.append(category)
        if created:
            print(f"✅ Tạo danh mục: {category.name}")
    
    # Thêm category hiện có
    existing_categories = list(Category.objects.all())
    categories.extend(existing_categories)
    
    # Dữ liệu sách với giá đa dạng
    books_data = [
        # Sách giá rẻ (10k - 50k)
        {"title": "Chuyện Cũ Hà Nội", "price": 15000, "original_price": 20000, "description": "Những câu chuyện về Hà Nội xưa"},
        {"title": "Truyện Kiều", "price": 25000, "original_price": 35000, "description": "Tác phẩm kinh điển của Nguyễn Du"},
        {"title": "Số Đỏ", "price": 30000, "original_price": 40000, "description": "Tiểu thuyết của Vũ Trọng Phụng"},
        {"title": "Lão Hạc", "price": 18000, "original_price": 25000, "description": "Truyện ngắn nổi tiếng của Nam Cao"},
        {"title": "Chí Phèo", "price": 22000, "original_price": 30000, "description": "Tác phẩm bất hủ của Nam Cao"},
        
        # Sách tầm trung (50k - 150k)
        {"title": "Norwegian Wood", "price": 89000, "original_price": 120000, "description": "Tiểu thuyết lãng mạn của Haruki Murakami"},
        {"title": "The Alchemist", "price": 95000, "original_price": 130000, "description": "Cuốn sách triết lý nổi tiếng của Paulo Coelho"},
        {"title": "Harry Potter và Hòn đá Phù thủy", "price": 125000, "original_price": 160000, "description": "Khởi đầu của series Harry Potter"},
        {"title": "Murder on the Orient Express", "price": 78000, "original_price": 95000, "description": "Tiểu thuyết trinh thám kinh điển"},
        {"title": "The Shining", "price": 110000, "original_price": 145000, "description": "Tiểu thuyết kinh dị của Stephen King"},
        {"title": "1984", "price": 85000, "original_price": 110000, "description": "Tác phẩm dystopia nổi tiếng"},
        {"title": "Animal Farm", "price": 65000, "original_price": 80000, "description": "Ngụ ngôn chính trị của George Orwell"},
        {"title": "One Hundred Years of Solitude", "price": 135000, "original_price": 175000, "description": "Kiệt tác của Gabriel García Márquez"},
        
        # Sách cao cấp (150k - 300k)
        {"title": "Pride and Prejudice - Collector's Edition", "price": 189000, "original_price": 240000, "description": "Phiên bản sưu tập với bìa cứng"},
        {"title": "The Great Gatsby - Illustrated", "price": 165000, "original_price": 200000, "description": "Phiên bản có minh họa đẹp mắt"},
        {"title": "War and Peace - Complete Edition", "price": 245000, "original_price": 320000, "description": "Bản đầy đủ của tác phẩm kinh điển"},
        {"title": "Les Misérables - Hardcover", "price": 225000, "original_price": 280000, "description": "Bìa cứng cao cấp"},
        {"title": "The Complete Works of Shakespeare", "price": 289000, "original_price": 350000, "description": "Toàn tập Shakespeare"},
        
        # Sách đắt tiền (300k+)
        {"title": "The Art of War - Luxury Edition", "price": 350000, "original_price": 450000, "description": "Phiên bản sang trọng với chú thích chi tiết"},
        {"title": "Encyclopædia Britannica - Digital Access", "price": 420000, "original_price": 500000, "description": "Truy cập toàn bộ bách khoa toàn thư"},
        {"title": "Oxford English Dictionary - Premium", "price": 650000, "original_price": 800000, "description": "Từ điển tiếng Anh cao cấp nhất"},
        {"title": "The Cambridge History of Literature", "price": 890000, "original_price": 1200000, "description": "Bộ sách lịch sử văn học đầy đủ"},
        
        # Sách nấu ăn & lifestyle
        {"title": "Món Việt Mỗi Ngày", "price": 45000, "original_price": 60000, "description": "300 món ăn Việt Nam"},
        {"title": "Cà Phê Việt Nam", "price": 55000, "original_price": 70000, "description": "Văn hóa cà phê Việt"},
        {"title": "Du Lịch Việt Nam", "price": 120000, "original_price": 150000, "description": "Cẩm nang du lịch toàn quốc"},
        
        # Sách thiếu nhi
        {"title": "Conan Thám Tử Lừng Danh - Tập 1", "price": 35000, "original_price": 45000, "description": "Manga trinh thám nổi tiếng"},
        {"title": "Doraemon - Tập đặc biệt", "price": 40000, "original_price": 50000, "description": "Truyện tranh thiếu nhi kinh điển"},
        {"title": "Sách Tô Màu Cho Bé", "price": 25000, "original_price": 35000, "description": "Sách tô màu giáo dục"},
        
        # Sách kinh doanh & phát triển bản thân
        {"title": "Đắc Nhân Tâm", "price": 78000, "original_price": 95000, "description": "Sách kỹ năng giao tiếp nổi tiếng"},
        {"title": "Think and Grow Rich", "price": 92000, "original_price": 115000, "description": "Sách về tư duy làm giàu"},
        {"title": "The 7 Habits of Highly Effective People", "price": 145000, "original_price": 180000, "description": "7 thói quen hiệu quả"},
        {"title": "Rich Dad Poor Dad", "price": 115000, "original_price": 140000, "description": "Sách về tài chính cá nhân"},
    ]
    
    print(f"📚 Chuẩn bị thêm {len(books_data)} quyển sách...")
    
    for i, book_data in enumerate(books_data):
        # Random chọn author và category
        author = random.choice(authors)
        category = random.choice(categories)
        
        # Tạo slug từ title
        slug = book_data["title"].lower().replace(" ", "-").replace(".", "").replace(",", "").replace("'", "").replace("-", "-")
        slug = slug.encode('ascii', 'ignore').decode('ascii')  # Remove non-ASCII
        if not slug:
            slug = f"book-{i+1}"
        
        # Random rating và quantity_sold
        rating = round(random.uniform(3.5, 5.0), 1)
        quantity_sold = random.randint(10, 1000)
        stock_quantity = random.randint(5, 100)
        
        book, created = Book.objects.get_or_create(
            slug=slug,
            defaults={
                "title": book_data["title"],
                "description": book_data["description"],
                "list_price": Decimal(str(book_data["price"])),
                "original_price": Decimal(str(book_data["original_price"])),
                "rating_average": Decimal(str(rating)),
                "quantity_sold": quantity_sold,
                "stock_quantity": stock_quantity,
                "is_active": True,
            }
        )
        
        if created:
            # Add author và category
            book.authors.add(author)
            book.categories.add(category)
            
            # Random thêm author thứ 2 (30% chance)
            if random.random() < 0.3:
                second_author = random.choice(authors)
                if second_author != author:
                    book.authors.add(second_author)
            
            # Random thêm category thứ 2 (20% chance)
            if random.random() < 0.2:
                second_category = random.choice(categories)
                if second_category != category:
                    book.categories.add(second_category)
            
            print(f"✅ Thêm sách: {book.title} - {book.list_price}đ - {author.name}")
    
    print("\n🎊 HOÀN THÀNH! Thống kê:")
    print(f"📖 Tổng số sách: {Book.objects.count()}")
    print(f"👨‍💼 Tổng số tác giả: {Author.objects.count()}")
    print(f"🏷️ Tổng số danh mục: {Category.objects.count()}")
    
    # Thống kê theo giá
    print("\n💰 Thống kê theo giá:")
    print(f"Dưới 50k: {Book.objects.filter(list_price__lt=50000).count()} sách")
    print(f"50k-150k: {Book.objects.filter(list_price__gte=50000, list_price__lt=150000).count()} sách")
    print(f"150k-300k: {Book.objects.filter(list_price__gte=150000, list_price__lt=300000).count()} sách")
    print(f"Trên 300k: {Book.objects.filter(list_price__gte=300000).count()} sách")

if __name__ == "__main__":
    add_sample_data()
