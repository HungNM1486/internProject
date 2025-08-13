export interface CategoryNode {
  id: number;
  name: string;
  children?: CategoryNode[];
}

export const CategoryTree: CategoryNode[] = [
{
    id: 1,
    name: "English Books",
    children: [
      { id: 101, name: "Art & Photography" },
      { id: 102, name: "Biographies & Memoirs" },
      { id: 103, name: "Business & Economics" },
      { id: 104, name: "How-to - Self Help" },
      { id: 105, name: "Children's Books" },
      { id: 106, name: "Dictionary" },
      { id: 107, name: "Education - Teaching" },
      { id: 108, name: "Fiction - Literature" },
      { id: 109, name: "Magazines" },
      { id: 110, name: "Medical Books" },
      { id: 111, name: "Parenting & Relationships" },
      { id: 112, name: "Reference" },
      { id: 113, name: "Science - Technology" },
      { id: 114, name: "History, Politics & Social Sciences" },
      { id: 115, name: "Travel & Holiday" },
      { id: 116, name: "Cookbooks, Food & Wine" }
    ]
  },
  {
    id: 2,
    name: "Sách tiếng Việt",
    children: [
      { id: 201, name: "Sách văn học" },
      { id: 202, name: "Sách kinh tế" },
      { id: 203, name: "Sách thiếu nhi" },
      { id: 204, name: "Sách kỹ năng sống" },
      { id: 205, name: "Nuôi dạy con" },
      { id: 206, name: "Sách Giáo Khoa - Giáo Trình" },
      { id: 207, name: "Sách Học Ngoại Ngữ" },
      { id: 208, name: "Sách Tham Khảo" },
      { id: 209, name: "Từ Điển" },
      { id: 210, name: "Sách Kiến Thức Tổng Hợp" },
      { id: 211, name: "Sách Khoa Học - Kỹ Thuật" },
      { id: 212, name: "Sách Lịch sử" },
      { id: 213, name: "Điện Ảnh - Nhạc - Họa" },
      { id: 214, name: "Truyện Tranh, Manga, Comic" },
      { id: 215, name: "Sách Tôn Giáo - Tâm Linh" },
      { id: 216, name: "Sách Văn Hóa - Địa Lý - Du Lịch" },
      { id: 217, name: "Sách Chính Trị - Pháp Lý" },
      { id: 218, name: "Sách Nông - Lâm - Ngư Nghiệp" },
      { id: 219, name: "Sách Công Nghệ Thông Tin" },
      { id: 220, name: "Sách Y Học" },
      { id: 221, name: "Tạp Chí - Catalogue" },
      { id: 222, name: "Sách Tâm lý - Giới tính" },
      { id: 223, name: "Sách Thường Thức - Gia Đình" },
      { id: 224, name: "Thể Dục - Thể Thao" }
    ]
  },
  {
    id: 3,
    name: "Văn phòng phẩm",
    children: [
      { id: 301, name: "Dụng Cụ Văn Phòng" },
      { id: 302, name: "Bút - Viết các loại" },
      { id: 303, name: "Bút Chì Màu - Bút Lông Màu - Sáp Màu" },
      { id: 304, name: "Dụng Cụ Học Sinh" },
      { id: 305, name: "Flashcards" },
      { id: 306, name: "Sổ Tay Các Loại" },
      { id: 307, name: "Tập vở các loại" },
      { id: 308, name: "Văn Hóa Phẩm" },
      { id: 309, name: "Thiết Bị Giáo Dục Trường Học" },
      { id: 310, name: "Balo Học Sinh - Cặp học sinh" },
      { id: 311, name: "Máy Tính Điện Tử" },
      { id: 312, name: "Lịch" },
      { id: 313, name: "Bút Kỹ Thuật" },
      { id: 314, name: "Sản phẩm về giấy" },
      { id: 315, name: "Thiết bị văn phòng" },
      { id: 316, name: "Phấn - Bảng viết - Lau bảng" }
    ]
  },
  {
    id: 4,
    name: "Quà lưu niệm",
    children: [
      { id: 401, name: "Thú Nhồi Bông" },
      { id: 402, name: "Bookmark" },
      { id: 403, name: "Bưu ảnh - Postcard" },
      { id: 404, name: "Quà tặng trang sức" },
      { id: 405, name: "Album" },
      { id: 406, name: "Mô hình trang trí" },
      { id: 407, name: "Sticker - Decal trang trí" },
      { id: 408, name: "Ly - Cốc" },
      { id: 409, name: "Kẹp Ảnh Gỗ" },
      { id: 410, name: "Hộp quà" },
      { id: 411, name: "Tượng" },
      { id: 412, name: "Móc Khóa" },
      { id: 413, name: "Đồng Hồ Cát" },
      { id: 414, name: "Quả Cầu Tuyết" },
      { id: 415, name: "Hộp Nhạc" },
      { id: 416, name: "Phụ kiện - Vật liệu trang trí" },
      { id: 417, name: "Quà tặng trang trí khác" },
      { id: 418, name: "Gương mini" },
      { id: 419, name: "Khung hình" },
      { id: 420, name: "Thiệp" },
      { id: 421, name: "Túi Quà" }
    ]
  }
];