import { apiClient } from "./api";
import { Category } from "@/types";

export const categoryService = {
  async getAll(): Promise<Category[]> {
    const res = await apiClient.get("/categories");
<<<<<<< HEAD
    return res.data;
=======
    // Fix: Extract results array from paginated response
    return res.data.results || res.data;
>>>>>>> 40115e6 (cập nhật code mới)
  },
};
