# Bookstore Frontend

Ứng dụng frontend cho hệ thống quản lý nhà sách, được xây dựng bằng React + TypeScript + Vite.

## 🚀 Quick Start

### Yêu cầu hệ thống

- Docker và Docker Compose
- Git

### Bước 1: Clone repository

```bash
git clone <repository-url>
cd bookstore-frontend
```

### Bước 2: Chạy development server với Docker

```bash
# Chạy development server với hot reload
docker compose -f docker-compose.dev.yml up --build

# Hoặc chạy trong background
docker compose -f docker-compose.dev.yml up -d
```

### Bước 3: Truy cập ứng dụng

- **Development:** http://localhost:3002
- **Production:** http://localhost:3001

## 🛠️ Development

### Cấu trúc dự án

```
src/
├── components/     # React components
├── pages/         # Page components
├── services/      # API services
├── store/         # State management
├── types/         # TypeScript types
└── utils/         # Utility functions
```

### Các lệnh hữu ích

**Development:**

```bash
# Chạy development server
docker compose -f docker-compose.dev.yml up -d

# Xem logs
docker compose -f docker-compose.dev.yml logs -f

# Dừng development server
docker compose -f docker-compose.dev.yml down
```

**Production:**

```bash
# Build và chạy production
docker compose up --build

# Chạy production trong background
docker compose up -d
```

### Hot Reload

- ✅ Code changes sẽ tự động reload
- ✅ Volume mount giữa local và container
- ✅ Không cần restart container khi thay đổi code

## 🔧 Environment Variables

Tạo file `.env` (nếu cần):

```env
VITE_API_URL=http://localhost:3000
```

## 📦 Docker Commands

### Development

```bash
# Build và chạy development
docker compose -f docker-compose.dev.yml up --build

# Chỉ chạy (không build lại)
docker compose -f docker-compose.dev.yml up -d

# Xem logs
docker compose -f docker-compose.dev.yml logs

# Dừng
docker compose -f docker-compose.dev.yml down
```

### Production

```bash
# Build và chạy production
docker compose up --build

# Chạy production
docker compose up -d

# Dừng
docker compose down
```

## 🐛 Troubleshooting

### Lỗi port đã được sử dụng

```bash
# Kiểm tra port đang sử dụng
sudo lsof -i :3002

# Kill process nếu cần
sudo kill -9 <PID>
```

### Lỗi Docker

```bash
# Xóa container và image cũ
docker compose down
docker system prune -f

# Build lại
docker compose -f docker-compose.dev.yml up --build
```

### Lỗi Node.js version

- Đảm bảo sử dụng Node.js 20+ trong Dockerfile.dev
- Nếu có lỗi, rebuild container: `docker compose -f docker-compose.dev.yml up --build`

## 📝 Workflow

1. **Pull code mới:**

   ```bash
   git pull origin dev
   ```

2. **Chạy development:**

   ```bash
   docker compose -f docker-compose.dev.yml up -d
   ```

3. **Code và test:**
   - Edit code trong thư mục local
   - Xem thay đổi tại http://localhost:3002
   - Hot reload tự động

4. **Commit và push:**
   ```bash
   git add .
   git commit -m "feat: your changes"
   git push origin dev
   ```

## 🔗 Links

- **Frontend:** http://localhost:3002 (dev) / http://localhost:3001 (prod)
- **Backend API:** http://localhost:3000
- **Docker Hub:** (nếu có)

## 📞 Support

Nếu gặp vấn đề, hãy:

1. Kiểm tra logs: `docker compose -f docker-compose.dev.yml logs`
2. Rebuild container: `docker compose -f docker-compose.dev.yml up --build`
3. Liên hệ team lead hoặc tạo issue trên GitHub
